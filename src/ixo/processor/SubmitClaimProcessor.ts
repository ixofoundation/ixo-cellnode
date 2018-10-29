import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Claim } from '../model/ClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';

export class SubmitClaimProcessor extends AbstractHandler {

  handleAsyncSubmitClaimResponse = (jsonResponseMsg: any) => {
    Cache.get(jsonResponseMsg.data.hash)
      .then((cached) => {
        console.log(dateTimeLogger() + ' updating the submit claim capabilities');
        this.updateCapabilities(cached.request);
        console.log(dateTimeLogger() + ' commit submit claim to Elysian');
        var obj = {
          ...cached.request.data,
          txHash: cached.txHash,
          _creator: cached.request.signature.creator,
          _created: cached.request.signature.created
        };
        Claim.create({ ...obj, projectDid: cached.request.projectDid });
        console.log(dateTimeLogger() + ' submit claim transaction completed successfully');
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