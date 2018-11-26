import { AbstractHandler } from '../../handlers/AbstractHandler';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { Status, workflow, BlockchainURI } from '../common/shared';
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';
import xss from "../../Xss";

const ETHEREUM_API = (process.env.ETHEREUM_API || '');
const blockheight = 6;

export class UpdateProjectStatusProcessor extends AbstractHandler {

    updateCapabilities = (request: Request) => { }

    handleRollbackProjectStatus = (jsonResponseMsg: any, retries?: number) => {
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                if (cached != undefined) {
                    return this.getLatestProjectStatus(cached.projectDid)
                        .then((currentStatus: IProjectStatusModel[]) => {
                            // check if previous status exists
                            if (currentStatus.length > 0 && currentStatus[0].status === Status.pending) {
                                console.log(dateTimeLogger() + ' blockchain failed update project status, rollback to ' + Status.created);
                                var data: any = {
                                    projectDid: cached.projectDid,
                                    status: Status.created
                                }
                                this.selfSignMessage(data, cached.projectDid)
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
                                                creator: cached.projectDid,
                                                signatureValue: signature
                                            }
                                        }
                                        this.process(projectStatusRequest);
                                    });
                            }
                        })
                }
            })
            .catch(() => {
                console.log(dateTimeLogger() + ' exception caught for handleRollbackProjectStatus');
            });
    }

    handleAsyncProjectStatusResponse = (jsonResponseMsg: any, retries?: number) => {
        //successfull status response
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                if (cached != undefined) {
                    console.log(dateTimeLogger() + ' updating the project status capabilities');
                    this.updateCapabilities(cached);
                    console.log(dateTimeLogger() + ' commit project status to Elysian');
                    var obj = {
                        ...cached.data,
                        txHash: jsonResponseMsg.txHash,
                        _creator: cached.signature.creator,
                        _created: cached.signature.created
                    };
                    var sanitizedData = xss.sanitize(obj);
                    ProjectStatus.create({ ...sanitizedData, projectDid: cached.projectDid });
                    ProjectStatus.emit('postCommit', obj, cached.projectDid);
                    console.log(dateTimeLogger() + ' Update project status transaction completed successfully');
                } else {
                    var retry: number = retries || 0;
                    if (retry <= 3) {
                        retry++
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

    }

    handleAsyncEthResponse = (jsonResponseMsg: any) => {
        //check ethereum if block height mined and then send project funded status
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                var projectDid = cached.projectDid;
                axios({
                    method: 'post',
                    url: ETHEREUM_API,
                    data: { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }
                })
                    .then((response) => {
                        if (parseInt(response.data.result, 16) - parseInt(jsonResponseMsg.data.blockNumber, 16) > blockheight) {
                            var data: any = {
                                projectDid: projectDid,
                                status: Status.funded,
                                txnID: jsonResponseMsg.data.hash
                            }
                            this.selfSignMessage(data, projectDid)
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
                                    this.process(projectStatusRequest);
                                });
                        } else {
                            let message = {
                                data: {
                                    msgType: "eth",
                                    data: jsonResponseMsg.txHash
                                },
                                request: { projectDid: projectDid },
                                txHash: jsonResponseMsg.txHash
                            }
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
    }

    msgToPublish = (txHash: any, request: Request) => {
        var blockChainPayload: any;
        return new Promise((resolve: Function, reject: Function) => {
            let data = {
                data: {
                    status: request.data.status,
                    ethFundingTxnID: request.data.txnID
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            }
            var sanitizedData = xss.sanitize(data);
            blockChainPayload = {
                payload: [{ type: "project/UpdateProjectStatus", value: sanitizedData }]
            }
            resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/UpdateProjectStatus', BlockchainURI.commit));
        });
    }

    getLatestProjectStatus = (projectDid: string): Promise<IProjectStatusModel[]> => {
        return new Promise((resolve: Function) => {
            resolve(ProjectStatus.find({ projectDid: projectDid }).limit(1).sort({ $natural: -1 }))
        })
    }

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
                } else { resolve(true) }
            });
        })
    }
}

export default new UpdateProjectStatusProcessor();