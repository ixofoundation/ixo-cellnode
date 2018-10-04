import { AbstractHandler } from '../../handlers/AbstractHandler';
import { EvaluateClaim, IEvaluateClaimModel } from '../model/EvaluateClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { dateTimeLogger } from '../../logger/Logger';

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');

export class EvaluateClaimsProcessor extends AbstractHandler {

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
          claimID: obj.claimId,
          status: obj.status
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      blockChainPayload = {
        payload: [{type: "project/CreateEvaluation", value: data}]
      }
      resolve(this.signMessageForBlockchain(blockChainPayload, request.projectDid));
    });
  };

  // check the Project Balance to verify that funds are available to pay evaluator
  checkForFunds = (projectDid: string): Promise<boolean> => {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(dateTimeLogger() + ' confirm funds exists');
      axios.get(BLOCKCHAIN_URI_REST + 'project/getProjectAccounts/' + projectDid)
        .then((response) => {
          if (response.status == 200 && (response.data instanceof Array)) {
            response.data.forEach((element: any) => {
              if (element.did == projectDid) {
                Project.findOne({
                  projectDid: projectDid
                })
                  .then((project) => {
                    if (project) {
                      resolve(element.balance - project.evaluatorPayPerClaim >= 0);
                    } else {
                      console.log(dateTimeLogger() + ' check for funds no project found for projectDid ' + projectDid);
                      resolve(false);
                    }
                  })
                  .catch((err) => {
                    console.log(dateTimeLogger() + ' error processing check for funds ' + err)
                    resolve(false);
                  });
              }
            })
          }
          else {
            console.log(dateTimeLogger() + ' no valid response check for funds from blockchain ' + response.statusText);
            resolve(false);
          }
        })
        .catch((reason) => {
          console.log(dateTimeLogger() + ' check for funds could not connect to blockchain ' + reason);
          resolve(false);
        });
    });
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new transaction ' + JSON.stringify(args));
    return this.checkForFunds(new Request(args).projectDid)
      .then((resp: boolean) => {
        if (resp) {
          return this.createTransaction(args, 'EvaluateClaim', EvaluateClaim, (request: any): Promise<boolean> => {
            let newVersion = request.version + 1;
            return new Promise((resolve: Function, reject: Function) => {
              // check that we are not updating an old record
              EvaluateClaim.findOne(
                {
                  projectDid: request.data.projectDid,
                  claimId: request.data.claimId,
                  version: newVersion
                },
                function (error: Error, result: IEvaluateClaimModel) {
                  if (error) {
                    reject(error);
                  } else {
                    if (result) {
                      resolve(true);
                    }
                  }
                }).limit(1);

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
        console.log(dateTimeLogger() + ' insufficient funds available');
        return 'Insufficient funds available';
      });
  }
}

export default new EvaluateClaimsProcessor();