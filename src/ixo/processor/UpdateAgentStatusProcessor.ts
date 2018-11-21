import { AbstractHandler } from '../../handlers/AbstractHandler';
import { AgentStatus } from '../model/AgentStatusModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';
import xss from "../../Xss";

export class UpdateAgentStatusProcessor extends AbstractHandler {

  handleAsyncUpdateAgentStatusResponse = (jsonResponseMsg: any, retries?: number) => {

    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          console.log(dateTimeLogger() + ' updating the agent status update capabilities');
          this.updateCapabilities(cached);
          console.log(dateTimeLogger() + ' commit agent status update to Elysian');
          var obj = {
            ...cached.data,
            txHash: jsonResponseMsg.txHash,
            _creator: cached.signature.creator,
            _created: cached.signature.created,
            version: cached.version >= 0 ? cached.version + 1 : 0
          };
          var sanitizedData = xss.sanitize(obj);
          AgentStatus.create({ ...sanitizedData, projectDid: cached.projectDid });
          AgentStatus.emit('postCommit', obj, cached.projectDid);
          console.log(dateTimeLogger() + ' update agent status transaction completed successfully');
        } else {
          var retry: number = retries || 0;
          if (retry <= 3) {
            retry++
            setTimeout(() => {
              console.log(dateTimeLogger() + ' retry cached agent status update transaction for %s ', jsonResponseMsg.txHash);
              this.handleAsyncUpdateAgentStatusResponse(jsonResponseMsg, retry)
            }, 2000)
          } else {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
            //force the data into the DB
            console.log(dateTimeLogger() + ' cached agent status update not found for transaction %s ', jsonResponseMsg.txHash);
          }
        }
      })
      .catch(() => {
        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
        //force the data into the DB
        console.log(dateTimeLogger() + ' exception for cached transaction for %s not found ', jsonResponseMsg.txHash);
      });
  }

  updateCapabilities = (request: Request) => {
    if (request.data.role === 'SA' && request.data.status === '1') this.addCapabilities(request.projectDid, [request.data.agentDid], 'SubmitClaim');
    if (request.data.role === 'EA' && request.data.status === '1') this.addCapabilities(request.projectDid, [request.data.agentDid], 'EvaluateClaim');
    if (request.data.status === '1') this.addCapabilities(request.projectDid, [request.data.agentDid], 'ListClaims');
    if (request.data.role === 'SA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
    if (request.data.role === 'EA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
    if (request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
  }

  msgToPublish = (txHash: any, request: Request) => {
    return new Promise((resolve: Function, reject: Function) => {
      var blockChainPayload: any;
      let data = {
        data: {
          did: request.data.agentDid,
          status: request.data.status,
          role: request.data.role
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      var sanitizedData = xss.sanitize(data);
      blockChainPayload = {
        payload: [{ type: "project/UpdateAgent", value: sanitizedData }]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, "project/UpdateAgent"));
    });
  }

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new Update Agent Status transaction ');
    return this.createTransaction(args, 'UpdateAgentStatus', AgentStatus, (request: any): Promise<boolean> => {
      let newVersion = request.version + 1;
      return new Promise((resolve: Function, reject: Function) => {
        // check that we are not updating an old record
        AgentStatus.findOne(
          {
            projectDid: request.data.projectDid,
            agentDid: request.data.agentDid,
            version: newVersion
          })
          .then((result: any) => {
            if (result) {
              reject("invalid record or record already exists");
            }
          })
          .then(() => {
            // check to see that the project status is in a state that allows us to Update Agents Status 
            const validStatus = ["CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED"];
            ProjectStatus.find(
              {
                projectDid: request.data.projectDid
              },
              (error: Error, results: IProjectStatusModel[]) => {
                if (error) {
                  reject(error);
                } else {
                  if (results.length > 0 && validStatus.some(elem => elem === results[0].status)) {
                    resolve(results[0]);
                  }
                  reject("Invalid Project Status. Valid statuses are " + validStatus.toString());
                }
              }).limit(1).sort({ $natural: -1 })
          });
      });
    })
  }
}

export default new UpdateAgentStatusProcessor();