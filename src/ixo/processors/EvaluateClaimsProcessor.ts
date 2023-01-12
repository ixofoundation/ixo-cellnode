import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { UpdateProjectStatusProcessor } from "./UpdateProjectStatusProcessor";
import { Request } from "../../handlers/Request";
import axios from "axios";
import { dateTimeLogger } from "../../logger/Logger";
import { BlockchainMode, Status } from "../common/shared";
import Cache from "../../Cache";
import xss from "../../Xss";

const BLOCKSYNC_URI_REST = (process.env.BLOCKSYNC_URI_REST || "");

export class EvaluateClaimsProcessor extends AbstractHandler {
    handleAsyncEvaluateClaimResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger("updating the evaluate claim capabilities"));
                this.updateCapabilities(cached);
                console.log(dateTimeLogger("commit evaluate claim to Elysian"));
                const obj = {
                    ...cached.data,
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                    version: cached.version >= 0 ? cached.version + 1 : 0,
                };
                const sanitizedData = xss.sanitize(obj);
                await prisma.evaluateClaim.create({
                    data: {
                        claimId: sanitizedData.claimId,
                        projectDid: cached.projectDid,
                        status: sanitizedData.status,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                        version: sanitizedData.version,
                    },
                });
                console.log(dateTimeLogger("evaluate claim transaction completed successfully"));
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger(`retry cached evaluate claim transaction for ${jsonResponseMsg.txHash}`));
                        this.handleAsyncEvaluateClaimResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger(`cached evaluate claim not found for transaction ${jsonResponseMsg.txHash}`, true));
                };
            };
        } catch (error) {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger(`exception for cached transaction for ${jsonResponseMsg.txHash} not found`, true));
        };
    };

    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            const data = {
                data: {
                    claimID: request.data.claimId,
                    status: request.data.status
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            };
            const sanitizedData = xss.sanitize(data);
            const msg = { type: "project/CreateEvaluation", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
        });
    };

    //checkForFunds
    checkForFunds = (projectDid: string): Promise<boolean> => {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(true);
            return;
        })
    }

    process = async (args: any) => {
        console.log(dateTimeLogger("start new evaluate claim transaction"));
        const projectDid = new Request(args).projectDid;
        return this.checkForFunds(projectDid)
            .then((resp: boolean) => {
                if (resp) {
                    return this.createTransaction(args, "EvaluateClaim", (request: any): Promise<boolean> => {
                        let newVersion = request.version + 1;
                        return new Promise((resolve: Function, reject: Function) => {
                            prisma.evaluateClaim.findFirst({
                                where: {
                                    projectDid: request.data.projectDid,
                                    claimId: request.data.claimId,
                                    version: newVersion,
                                }
                            })
                            .then((result) => {
                                if (result) {
                                    reject("invalid record or record already exists")
                                }
                            })
                            .then(() => {
                                const validStatus = ["STARTED"];
                                try {
                                    prisma.projectStatus.findMany({
                                    where: { projectDid: request.data.projectDid },
                                    take: -1,
                                    })
                                    .then((results) => {
                                        if (results.length > 0 && validStatus.some(elem => elem === results[0].status)) {
                                            resolve(results[0]);
                                        }
                                        reject("Invalid Project Status. Valid statuses are " + validStatus.toString());
                                    })
                                } catch (error) {
                                    reject(error);
                                }
                            })
                        })
                    })
                }
                return new Promise((resolve: Function, reject: Function) => {
                    console.log(dateTimeLogger('insufficient funds available', true));
                    const updateProjectStatusProcessor = new UpdateProjectStatusProcessor();
                    const data: any = {
                        projectDid: projectDid,
                        status: Status.stopped
                    };
                    updateProjectStatusProcessor.selfSignMessage(data, projectDid)
                        .then((signature) => {
                            const projectStatusRequest: any = {
                                payload: {
                                    template: {
                                        name: "project_status"
                                    },
                                    data: data,
                                },
                                signature: {
                                    type: "ed25519-sha-256",
                                    created: new Date().toISOString(),
                                    creator: projectDid,
                                    signatureValue: signature
                                },
                            };
                            updateProjectStatusProcessor.process(projectStatusRequest);
                        })
                    reject(Error("Insufficient funds available, project stopped"));
                })
            })
            .catch((reason) => {
                return new Promise((resolve: Function, reject: Function) => {
                    reject(reason);
                })
            })
    };
};

export default new EvaluateClaimsProcessor();