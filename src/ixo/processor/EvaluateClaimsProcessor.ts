import { AbstractHandler } from '../../handlers/AbstractHandler';
import { EvaluateClaim } from '../model/EvaluateClaimModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { UpdateProjectStatusProcessor } from "./UpdateProjectStatusProcessor";
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { dateTimeLogger } from '../../logger/Logger';
import { Status, BlockchainURI } from '../../ixo/common/shared';
import Cache from '../../Cache';
import xss from "../../Xss";

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');

export class EvaluateClaimsProcessor extends AbstractHandler {

  handleAsyncEvaluateClaimResponse = (jsonResponseMsg: any, retries?: number) => {
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          console.log(dateTimeLogger() + ' updating the evaluate claim capabilities');
          this.updateCapabilities(cached);
          console.log(dateTimeLogger() + ' commit evaluate claim to Elysian');
          var obj = {
            ...cached.data,
            txHash: jsonResponseMsg.txHash,
            _creator: cached.signature.creator,
            _created: cached.signature.created,
            version: cached.version >= 0 ? cached.version + 1 : 0
          };
          var sanitizedData = xss.sanitize(obj);
          EvaluateClaim.create({ ...sanitizedData, projectDid: cached.projectDid });
          console.log(dateTimeLogger() + ' evaluate claim transaction completed successfully');
        } else {
          var retry: number = retries || 0;
          if (retry <= 3) {
            retry++
            setTimeout(() => {
              console.log(dateTimeLogger() + ' retry cached evaluate claim transaction for %s ', jsonResponseMsg.txHash);
              this.handleAsyncEvaluateClaimResponse(jsonResponseMsg, retry)
            }, 2000)
          } else {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
            //force the data into the DB
            console.log(dateTimeLogger() + ' cached evaluate claim not found for transaction %s ', jsonResponseMsg.txHash);
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
          claimID: request.data.claimId,
          status: request.data.status
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      var sanitizedData = xss.sanitize(data);
      blockChainPayload = {
        payload: [{ type: "project/CreateEvaluation", value: sanitizedData }]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, "project/CreateEvaluation", BlockchainURI.commit));
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
                  reject('Check for funds no project found for projectDid ' + projectDid);
                }
              })
              .catch((err) => {
                console.log(dateTimeLogger() + ' error processing check for funds ' + err)
                reject('error processing check for funds');
              });
          }
          else {
            console.log(dateTimeLogger() + ' no valid response check for funds from blockchain ' + response.statusText);
            reject('No valid response check for funds from blockchain');
          }
        })
        .catch((reason) => {
          console.log(dateTimeLogger() + ' check for funds could not connect to blockchain ' + reason);
          reject('Could not connect to blockchain');
        });
    });
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new evaluate claimtransaction ');
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
                    reject("invalid record or record already exists");
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
                        reject("Invalid Project Status. Valid statuses are " + validStatus.toString());
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