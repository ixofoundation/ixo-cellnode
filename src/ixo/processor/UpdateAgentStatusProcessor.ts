import { AbstractHandler } from '../../handlers/AbstractHandler';
import { AgentStatus, IAgentStatusModel } from '../model/AgentStatusModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';

export class UpdateAgentStatusProcessor extends AbstractHandler {

    updateCapabilities = (request: Request) => {
        if (request.data.role === 'SA' && request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
        if (request.data.role === 'EA' && request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
        if (request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
        if (request.data.role === 'SA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
        if (request.data.role === 'EA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
        if (request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
    }

    msgToPublish = (obj: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            var blockChainPayload: any;
            var txHash = obj.txHash;
            delete obj.version;
            delete obj.txHash;
            delete obj._creator;
            delete obj._created;

            let data = {
                data: {
                    did: obj.agentDid,
                    status: obj.status,
                    role: obj.role
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            }
            blockChainPayload = {
                payload: [{type: "project/UpdateAgent", value: data}]
            }
            resolve(this.messageForBlockchain(blockChainPayload, request.projectDid));
        });
    }

    process = (args: any) => {
        console.log(dateTimeLogger()+ ' start new Update Agent Status transaction ');
        return this.createTransaction(args, 'UpdateAgentStatus', AgentStatus, (request: any): Promise<boolean> => {
          let newVersion = request.version + 1;
          return new Promise((resolve: Function, reject: Function) => {
            // check that we are not updating an old record
            AgentStatus.findOne(
              {
                projectDid: request.data.projectDid,
                agentDid: request.data.agentDid,
                version: newVersion
              },
              (error: Error, result: IAgentStatusModel) => {
                if (error) {
                  reject(error);
                } else {
                  if (result) {
                    reject("`invalid record or record already exists`");
                  }
                }
              }).limit(1);
    
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
        })
      }
}

export default new UpdateAgentStatusProcessor();