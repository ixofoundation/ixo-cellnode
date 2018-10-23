import { AbstractHandler } from '../../handlers/AbstractHandler';
import { EvaluateClaim } from '../model/EvaluateClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { UpdateProjectStatusProcessor } from "./UpdateProjectStatusProcessor";
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { dateTimeLogger } from '../../logger/Logger';
import { Status } from '../../ixo/common/shared';

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
        payload: [{ type: "project/CreateEvaluation", value: data }]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid));
    });
  };

  // check the Project Balance to verify that funds are available to pay evaluator
  checkForFunds = (projectDid: string): Promise<boolean> => {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(dateTimeLogger() + ' confirm funds exists');
      axios.get(BLOCKCHAIN_URI_REST + 'project/getProjectAccounts/' + projectDid)
        .then((response) => {
          if (response.status == 200 && (response.data instanceof Array)) {
            let filter: any = response.data.filter((element: any) => element.did == projectDid);
            Project.findOne({
              projectDid: projectDid
            })
              .then((project) => {
                if (project) {
                  resolve(filter[0].balance - project.evaluatorPayPerClaim >= 0);
                } else {
                  console.log(dateTimeLogger() + ' check for funds no project found for projectDid ' + projectDid);
                  reject(Error('Check for funds no project found for projectDid ' + projectDid));
                }
              })
              .catch((err) => {
                console.log(dateTimeLogger() + ' error processing check for funds ' + err)
                reject(Error('error processing check for funds'));
              });
          }
          else {
            console.log(dateTimeLogger() + ' no valid response check for funds from blockchain ' + response.statusText);
            reject(Error('No valid response check for funds from blockchain'));
          }
        })
        .catch((reason) => {
          console.log(dateTimeLogger() + ' check for funds could not connect to blockchain ' + reason);
          reject(Error('Could not connect to blockchain'));
        });
    });
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new transaction ' + JSON.stringify(args));
    var projectDid = new Request(args).projectDid;
    return this.checkForFunds(projectDid)
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
                })
                .then((result: any) => {
                  if (result) {
                    reject(Error("invalid record or record already exists"));
                  }
                })
                .then(() => {
                  //check if project in correct status for evaluation
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
                        reject(Error("Invalid Project Status. Valid statuses are " + validStatus.toString()));
                      }
                    }).limit(1).sort({ $natural: -1 })
                })
            });
          });
        }
        // funds have been depleted so we need to stop the project
        return new Promise((resolve: Function, reject: Function) => {
          console.log(dateTimeLogger() + ' insufficient funds available');
          var updateProjectStatusProcessor = new UpdateProjectStatusProcessor();
          var data: any = {
            projectDid: projectDid,
            status: Status.stopped
          }
          updateProjectStatusProcessor.selfSignMessage(data, projectDid)
            .then((signature: any) => {
              var projectStatusRequest: any = {
                payload: {
                  template: {
                    name: "project_status"
                  },
                  data: data
                },
                signature: {
                  type: "ed25519-sha-256",
                  created: new Date().toISOString(),
                  creator: projectDid,
                  signatureValue: signature
                }
              }
              updateProjectStatusProcessor.process(projectStatusRequest);
            });
          reject(Error('Insufficient funds available, project stopped'));
        });
      })
      .catch((reason: any) => {
        return new Promise((resolve: Function, reject: Function) => {
          reject(reason);
        });
      });
  }
}

export default new EvaluateClaimsProcessor();