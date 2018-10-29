import { AbstractHandler } from '../../handlers/AbstractHandler';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { Status, workflow } from '../common/shared';
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';


const ETHEREUM_API = (process.env.ETHEREUM_API || '');
const blockheight = 6;

export class UpdateProjectStatusProcessor extends AbstractHandler {

    updateCapabilities = (request: Request) => { }

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

            blockChainPayload = {
                payload: [{ type: "project/UpdateProjectStatus", value: data }]
            }
            resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/UpdateProjectStatus', true));
        });
    }

    handleAsyncProjectStatusResponse = (jsonResponseMsg: any) => {
        //check that status update successfully else we roll back to previous status
        //if funding failed, rollback to created
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                if (jsonResponseMsg.data.deliver_tx.code > 0) {
                    return this.getLatestProjectStatus(cached.projectDid)
                        .then((currentStatus: IProjectStatusModel[]) => {
                            var rollbackStatus = currentStatus[0].status == Status.funded ? Status.created : workflow[workflow.indexOf(currentStatus[0].status) - 1] || Status.created
                            var data: any = {
                                projectDid: cached.projectDid,
                                status: rollbackStatus
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
                        })
                } else {
                    console.log(dateTimeLogger() + ' updating the project status capabilities');
                    this.updateCapabilities(cached);
                    console.log(dateTimeLogger() + ' commit project status to Elysian');
                    var obj = {
                        ...cached.data,
                        txHash: jsonResponseMsg.txHash,
                        _creator: cached.signature.creator,
                        _created: cached.signature.created
                    };
                    ProjectStatus.create({ ...obj, projectDid: cached.projectDid });
                    ProjectStatus.emit('postCommit', obj, cached.projectDid);
                    console.log(dateTimeLogger() + ' Update project status transaction completed successfully');
                }
            });

    }

    handleAsyncEthResponse = (jsonResponseMsg: any) => {
        //check ethereum if block height mined and then send project funded status
        var projectDid = jsonResponseMsg.request.projectDid;
        axios({
            method: 'post',
            url: ETHEREUM_API,
            data: { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }
        })
            .then((response) => {
                if (parseInt(response.data.result, 16) - parseInt(jsonResponseMsg.data.blockNumber, 16) > blockheight) {
                    var data: any = {
                        projectDid: projectDid,
                        status: Status.funded
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
                            data: jsonResponseMsg.txnID // "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
                        },
                        request: { projectDid: projectDid }
                    }

                    setTimeout(() => {
                        console.log(dateTimeLogger() + ' resubmit fund check to Ethereum for TxnID ' + jsonResponseMsg.txnID);
                        this.publishMessageToQueue(message);
                    }, 30000)

                }
            })
    }


    getLatestProjectStatus = (projectDid: string): Promise<IProjectStatusModel[]> => {
        return new Promise((resolve: Function) => {
            resolve(ProjectStatus.find({ projectDid: projectDid }).limit(1).sort({ $natural: -1 }))
        })
    }

    process = (args: any) => {
        console.log(dateTimeLogger() + ' start new Update Project Status transaction ');
        let request = new Request(args);
        if (workflow.indexOf(request.data.status) === 0) {
            return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus);
        } else {
            return this.getLatestProjectStatus(request.projectDid)
                .then((current: IProjectStatusModel[]) => {
                    // check that the status can only roll forward by 1 or backwards
                    if (workflow.indexOf(request.data.status) - 1 <= workflow.indexOf(current[0].status)) {
                        return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus);
                    }
                    console.log(dateTimeLogger() + ' Invalid status workflow ' + request.data.status);
                    return "Invalid status workflow";
                })
        }
    }

}

export default new UpdateProjectStatusProcessor();