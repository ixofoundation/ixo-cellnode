import { AbstractHandler } from '../../handlers/AbstractHandler';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { Status, workflow } from '../common/shared';
import { dateTimeLogger } from '../../logger/Logger';


const ETHEREUM_API = (process.env.ETHEREUM_API || '');
const blockheight = 6;

export class UpdateProjectStatusProcessor extends AbstractHandler {

    updateCapabilities = (request: Request) => { }

    msgToPublish = (obj: any, request: Request) => {
        var blockChainPayload: any;
        var txHash = obj.txHash;
        delete obj.version;
        delete obj.txHash;
        delete obj._creator;
        delete obj._created;
        return new Promise((resolve: Function, reject: Function) => {
            let data = {
                data: {
                    status: obj.status,
                    ethFundingTxnID: obj.txnID
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
        if (jsonResponseMsg.code > 0) {
            return this.getLatestProjectStatus(jsonResponseMsg.projectDid)
                .then((currentStatus: IProjectStatusModel[]) => {
                    var data: any = {
                        projectDid: jsonResponseMsg.projectDid,
                        status: workflow[workflow.indexOf(currentStatus[0].status) - 1] || Status.created
                    }
                    this.selfSignMessage(data, jsonResponseMsg.projectDid)
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
                                    creator: jsonResponseMsg.projectDid,
                                    signatureValue: signature
                                }
                            }
                            this.process(projectStatusRequest);
                        });

                })
        }
    }

    handleAsyncCreateProjectResponse = (jsonResponseMsg: any) => {
        //update project status to created once project ledgered
        var data: any = {
            projectDid: jsonResponseMsg.projectDid,
            status: Status.created
        }
        this.selfSignMessage(data, jsonResponseMsg.projectDid)
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
                        creator: jsonResponseMsg.projectDid,
                        signatureValue: signature
                    }
                }
                this.process(projectStatusRequest);
            });
    }

    handleAsyncEthResponse = (jsonResponseMsg: any) => {
        //check ethereum if block height mined and then send project funded status
        axios({
            method: 'post',
            url: ETHEREUM_API,
            data: { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }
        })
            .then((response) => {
                if (parseInt(response.data.result, 16) - parseInt(jsonResponseMsg.data.blockNumber, 16) > blockheight) {
                    var data: any = {
                        projectDid: jsonResponseMsg.projectDid,
                        status: Status.funded
                    }
                    this.selfSignMessage(data, jsonResponseMsg.projectDid)
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
                                    creator: jsonResponseMsg.projectDid,
                                    signatureValue: signature
                                }
                            }
                            this.process(projectStatusRequest);
                        });
                } else {
                    let message = {
                        msgType: "eth",
                        data: jsonResponseMsg.txnID, //"0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
                        projectDid: jsonResponseMsg.projectDid
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
                    if (workflow[workflow.indexOf(request.data.status) - 1] === current[0].status) {
                        return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus);
                    }
                    console.log(dateTimeLogger() + ' Invalid status workflow ' + request.data.status);
                    return "Invalid status workflow";
                })
        }
    }

}

export default new UpdateProjectStatusProcessor();