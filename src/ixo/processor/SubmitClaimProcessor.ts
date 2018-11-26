import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Claim } from '../model/ClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';
import { BlockchainURI } from '../common/shared';
import xss from "../../Xss";

export class SubmitClaimProcessor extends AbstractHandler {

  handleAsyncSubmitClaimResponse = (jsonResponseMsg: any, retries?: number) => {
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          console.log(dateTimeLogger() + ' updating the submit claim capabilities');
          this.updateCapabilities(cached);
          console.log(dateTimeLogger() + ' commit submit claim to Elysian');
          var obj = {
            ...cached.data,
            txHash: jsonResponseMsg.txHash,
            _creator: cached.signature.creator,
            _created: cached.signature.created
          };
          var sanitizedData = xss.sanitize(obj);
          Claim.create({ ...sanitizedData, projectDid: cached.projectDid });
          console.log(dateTimeLogger() + ' submit claim transaction completed successfully');
        } else {
          var retry: number = retries || 0;
          if (retry <= 3) {
            retry++
            setTimeout(() => {
              console.log(dateTimeLogger() + ' retry cached submit claim transaction for %s ', jsonResponseMsg.txHash);
              this.handleAsyncSubmitClaimResponse(jsonResponseMsg, retry)
            }, 2000)
          } else {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
            //force the data into the DB
            console.log(dateTimeLogger() + ' cached submit claim not found for transaction %s ', jsonResponseMsg.txHash);
          }
        }
      })
      .catch(() => {
        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
        //force the data into the DB
        console.log(dateTimeLogger() + ' exception for cached transaction for %s not found ', jsonResponseMsg.txHash);
      });
  }

  updateCapabilities = (request: Request) => { }

  msgToPublish = (txHash: any, request: Request) => {
    return new Promise((resolve: Function, reject: Function) => {
      var blockChainPayload: any;
      let data = {
        data: {
          claimID: txHash
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      var sanitizedData = xss.sanitize(data);
      blockChainPayload = {
        payload: [{ type: "project/CreateClaim", value: sanitizedData }]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, "project/CreateClaim", BlockchainURI.commit));
    });
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new Submit Claim transaction ');
    return this.createTransaction(args, 'SubmitClaim', Claim, (request: any): Promise<boolean> => {
      return new Promise((resolve: Function, reject: Function) => {
        // check to see that the project status is in a state that allows us to Submit Claims 
        const validStatus = ["STARTED"];
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
  }

}

export default new SubmitClaimProcessor();