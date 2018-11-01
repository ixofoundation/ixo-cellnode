import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Claim } from '../model/ClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';
import { BlockchainURI } from '../common/shared';

export class SubmitClaimProcessor extends AbstractHandler {

  handleBlockChainValidation = (jsonResponseMsg: any) => {
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        console.log(dateTimeLogger() + ' updating the submit claim capabilities');
        this.updateCapabilities(cached);
        console.log(dateTimeLogger() + ' commit submit claim to Elysian');
        var obj = {
          ...cached.data,
          txHash: jsonResponseMsg.txHash,
          _creator: cached.signature.creator,
          _created: cached.signature.created
        };
        Claim.create({ ...obj, projectDid: cached.projectDid });
        console.log(dateTimeLogger() + ' submit claim transaction completed successfully');
      });
  }

  handleAsyncSubmitClaimResponse = (jsonResponseMsg: any, retries?: number) => {
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          if (jsonResponseMsg.data.deliver_tx.code == undefined || 0) {
            // blockchain accepted the transaction but we want to confirm that there was consensus before committing transaction
            console.log(dateTimeLogger() + ' publish blockchain validation request for updte project status');
            let message = {
              msgType: 'validate/CreateClaim',
              projectDid: cached.projectDid,
              uri: BlockchainURI.validate,
              data: jsonResponseMsg.data.hash
            }
            this.publishMessageToQueue(message);
          } else {
            console.log(dateTimeLogger() + ' blockchain failed commit submit claim ' + jsonResponseMsg.data.deliver_tx.code);
          }

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
      blockChainPayload = {
        payload: [{ type: "project/CreateClaim", value: data }]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, "project/CreateClaim"));
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