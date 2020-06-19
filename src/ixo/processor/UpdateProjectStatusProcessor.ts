import {AbstractHandler} from '../../handlers/AbstractHandler';
import {IProjectStatusModel, ProjectStatus} from '../model/ProjectStatusModel';
import {Request} from "../../handlers/Request";
import axios from 'axios';
import {BlockchainURI, Status, workflow} from '../common/shared';
import {dateTimeLogger} from '../../logger/Logger';
import Cache from '../../Cache';
import xss from "../../Xss";

const ETHEREUM_API = (process.env.ETHEREUM_API || '');
const blockheight = 6;

export class UpdateProjectStatusProcessor extends AbstractHandler {

  updateCapabilities = (request: Request) => {
  };

  handleAsyncProjectStatusResponse = (jsonResponseMsg: any, retries?: number) => {
    //successfull status response
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          console.log(dateTimeLogger() + ' updating the project status capabilities');
          this.updateCapabilities(cached);
          console.log(dateTimeLogger() + ' commit project status to Elysian');
          const obj = {
            ...cached.data,
            txHash: jsonResponseMsg.txHash,
            _creator: cached.signature.creator,
            _created: cached.signature.created
          };
          const sanitizedData = xss.sanitize(obj);
          ProjectStatus.create({...sanitizedData, projectDid: cached.projectDid});
          ProjectStatus.emit('postCommit', obj, cached.projectDid);
          console.log(dateTimeLogger() + ' Update project status transaction completed successfully');
        } else {
          let retry: number = retries || 0;
          if (retry <= 3) {
            retry++;
            setTimeout(() => {
              console.log(dateTimeLogger() + ' retry cached update project transaction for %s ', jsonResponseMsg.txHash);
              this.handleAsyncProjectStatusResponse(jsonResponseMsg, retry)
            }, 2000)
          } else {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger() + ' cached update project not found for transaction %s ', jsonResponseMsg.txHash);
          }
        }
      })
      .catch(() => {
        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
        //force the data into the DB
        console.log(dateTimeLogger() + ' exception caught for handleAsyncProjectStatusResponse');
      });

  };

  handleAsyncEthResponse = (jsonResponseMsg: any) => {
    //check ethereum if block height mined and then send project funded status
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        const projectDid = cached.projectDid;
        axios({
          method: 'post',
          url: ETHEREUM_API,
          data: {jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1}
        })
          .then((response) => {
            if (parseInt(response.data.result, 16) - parseInt(jsonResponseMsg.data.blockNumber, 16) > blockheight) {
              const data: any = {
                projectDid: projectDid,
                status: Status.funded,
                txnID: jsonResponseMsg.data.hash
              };
              this.selfSignMessage(data, projectDid)
                .then((signature: any) => {
                  const projectStatusRequest: any = {
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
                  };
                  this.process(projectStatusRequest);
                });
            } else {
              let message = {
                data: {
                  msgType: "eth",
                  data: jsonResponseMsg.txHash
                },
                request: {projectDid: projectDid},
                txHash: jsonResponseMsg.txHash
              };
              setTimeout(() => {
                console.log(dateTimeLogger() + ' resubmit fund check to Ethereum for TxnID ' + jsonResponseMsg.txHash);
                this.publishMessageToQueue(message);
              }, 30000)

            }
          })
      })
      .catch(() => {
        console.log(dateTimeLogger() + ' exception caught for handleAsyncEthResponse');
      });
  };

  msgToPublish = (txHash: any, request: Request) => {
    return new Promise((resolve: Function, reject: Function) => {
      const data = {
        data: {
          status: request.data.status,
          ethFundingTxnID: request.data.txnID
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      };
      const sanitizedData = xss.sanitize(data);
      const blockChainPayload = {
        payload: [{type: "project/UpdateProjectStatus", value: sanitizedData}]
      };
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/UpdateProjectStatus', BlockchainURI.commit));
    });
  };

  getLatestProjectStatus = (projectDid: string): Promise<IProjectStatusModel[]> => {
    return new Promise((resolve: Function) => {
      resolve(ProjectStatus.find({projectDid: projectDid}).limit(1).sort({$natural: -1}))
    })
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new Update Project Status transaction ');
    let request = new Request(args);
    return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus, (request: any): Promise<boolean> => {
      return new Promise((resolve: Function, reject: Function) => {
        if (workflow.indexOf(request.data.status) !== 0) {
          this.getLatestProjectStatus(request.projectDid)
            .then((current: IProjectStatusModel[]) => {
              // check that the status can only roll forward by 1 or backwards
              if (current.length > 0) {
                if (workflow.indexOf(request.data.status) - 1 <= workflow.indexOf(current[0].status)) {
                  resolve(true);
                } else {
                  console.log(dateTimeLogger() + ' Invalid status workflow ' + request.data.status);
                  reject("Invalid status workflow");
                }
              } else {
                console.log(dateTimeLogger() + ' no status exists for project ' + request.projectDid);
                reject('No status exists for project ' + request.projectDid);
              }
            })
        } else {
          resolve(true)
        }
      });
    })
  }
}

export default new UpdateProjectStatusProcessor();
