import { prisma } from "../../prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import axios from "axios";
import { BlockchainMode, Status, workflow } from "../common/shared";
import { dateTimeLogger } from "../../../logger/Logger";
import Cache from "../../../Cache";
import xss from "../../../Xss";

const ETHEREUM_API = (process.env.ETHEREUM_API || "");
const blockheight = 6;

export class UpdateProjectStatusProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    handleAsyncProjectStatusResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger() + " updating the project status capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit project status to Elysian");
                const obj = {
                    ...cached.data,
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                };
                const sanitizedData = xss.sanitize(obj);
                await prisma.projectStatus.create({
                    data: {
                        projectDid: cached.projectDid,
                        status: sanitizedData.status,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                let message = {
                    data: {
                        msgType: "eth",
                        data: obj.txnID,
                    },
                    request: { projectDid: cached.projectDid },
                    txHash: obj.txnID,
                };
                this.publishMessageToQueue(message);
                console.log(dateTimeLogger() + " Update project status transaction completed successfully");
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached update projecttransaction for ${jsonResponseMsg.txHash}`);
                        this.handleAsyncProjectStatusResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger() + ` cached update project not found for transaction ${jsonResponseMsg.txHash}`);
                };
            };
        } catch (error) {
            console.log(dateTimeLogger() + " exception caught for handleAsyncProjectStatusResponse");
        };
    };

    handleAsyncEthResponse = async (jsonResponseMsg: any) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            const projectDid = cached.projectDid;
            const response = await axios.post(ETHEREUM_API, { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 });
            if (parseInt(response.data.result, 16) - parseInt(jsonResponseMsg.data.blockNumber, 16) > blockheight) {
                const data: any = {
                    projectDid: projectDid,
                    status: Status.funded,
                    txnID: jsonResponseMsg.data.hash,
                };
                const signature = await this.selfSignMessage(data, projectDid);
                const projectStatusRequest: any = {
                    payload: {
                        template: {
                            name: "project_status",
                        },
                        data: data,
                    },
                    signature: {
                        type: "ed25519-sha-256",
                        created: new Date().toISOString(),
                        creator: projectDid,
                        signatureValue: signature,
                    },
                };
                this.process(projectStatusRequest);
            } else {
                let message = {
                    data: {
                        msgType: "eth",
                        data: jsonResponseMsg.txHash
                    },
                    request: { projectDid: projectDid },
                    txHash: jsonResponseMsg.txHash
                };
                setTimeout(() => {
                    console.log(dateTimeLogger() + " resubmit fund check to Ethereum for TxnID " + jsonResponseMsg.txHash);
                    this.publishMessageToQueue(message);
                }, 30000)
            };
        } catch (error) {
            console.log(dateTimeLogger() + " exception caught for handleAsyncEthResponse");
        };
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
            const msg = { type: "project/UpdateProjectStatus", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
        });
    };

    getLatestProjectStatus = async (projectDid: string) => {
        return prisma.projectStatus.findMany({
            where: {
                projectDid: projectDid,
            },
            take: -1,
        });
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new Update Project Status transaction");
        const request = new Request(args);
        return this.createTransaction(args, "UpdateProjectStatus", async (request: any): Promise<boolean> => {
            if (workflow.indexOf(request.data.status) !== 0) {
                const projectStatus = await this.getLatestProjectStatus(request.projectDid);
                if (projectStatus.length > 0) {
                    if (workflow.indexOf(request.data.status) - 1 <= workflow.indexOf(projectStatus[0].status)) {
                        return true;
                    } else {
                        console.log(dateTimeLogger() + " Invalid status workflow " + request.data.status);
                        return false;
                    };
                } else {
                    console.log(dateTimeLogger() + " no status exists for project " + request.projectDid);
                    return false;
                }
            } else {
                return true;
            };
        });
    };
};

export default new UpdateProjectStatusProcessor();