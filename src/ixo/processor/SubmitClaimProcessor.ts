import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Claim } from '../model/ClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';

export class SubmitClaimProcessor extends AbstractHandler {

  updateCapabilities = (request: Request) => { }

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
          claimID: txHash
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      blockChainPayload = {
        payload: [{type: "project/CreateClaim", value: data}]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid));
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