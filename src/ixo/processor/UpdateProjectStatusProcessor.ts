import { AbstractHandler } from '../../handlers/AbstractHandler';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import axios from 'axios';
import { Status } from '../common/shared';
import { dateTimeLogger } from '../../logger/Logger';

const workflow = ["CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED", "PAIDOUT"];
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
                //payload: [25, new Buffer(JSON.stringify(data)).toString('hex').toUpperCase()]
                payload: [{type: "project/UpdateProject", value: data}]
            }
            resolve(this.signMessageForBlockchain(blockChainPayload, request.projectDid));
        });
    }

    handleAsyncResponse = (jsonMsg: any) => {
        axios({
            method: 'post',
            url: ETHEREUM_API,
            data: { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }
        })
            .then((response) => {
                if (parseInt(response.data.result, 16) - parseInt(jsonMsg.data.blockNumber, 16) > blockheight) {
                    var data: any = {
                        projectDid: jsonMsg.projectDid,
                        status: Status.funded
                    }
                    this.selfSignMessage(data, jsonMsg.projectDid)
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
                                    creator: jsonMsg.projectDid,
                                    signatureValue: signature
                                }
                            }
                            this.process(projectStatusRequest);
                        });
                } else {
                    let message = {
                        msgType: "eth",
                        data: jsonMsg.txnID, //"0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
                        projectDid: jsonMsg.projectDid
                    }
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ' resubmit fund check to Ethereum for TxnID ' + jsonMsg.txnID);
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
        console.log(dateTimeLogger() + ' start new transaction ' + JSON.stringify(args));
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