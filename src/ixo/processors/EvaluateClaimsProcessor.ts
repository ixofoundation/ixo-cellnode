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
                console.log(dateTimeLogger() + " updating the evaluate claim capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit evaluate claim to Elysian");
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
                console.log(dateTimeLogger() + "evaluate claim transaction completed successfully");
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached evaluate claim transaction for ${jsonResponseMsg.txHash}`);
                        this.handleAsyncEvaluateClaimResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger() + ` cached evaluate claim not found for transaction ${jsonResponseMsg.txHash}`);
                };
            };
        } catch (error) {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger() + ` exception for cached transaction for ${jsonResponseMsg.txHash} not found`);
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
    private checkForFunds = true;

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new evaluate claim transaction");
        const projectDid = new Request(args).projectDid;
        const resp = this.checkForFunds;
        if (resp) {
            return this.createTransaction(args, "EvaluateClaim", async (request: any): Promise<boolean> => {
                const newVersion = request.version + 1;
                const evaluateClaim = await prisma.evaluateClaim.findFirst({
                    where: {
                        projectDid: request.data.projectDid,
                        claimId: request.data.claimId,
                        version: newVersion,
                    },
                });
                if (evaluateClaim) {
                    return false;
                } else {
                    const validStatus = ["STARTED"];
                    const projectStatuses = await prisma.projectStatus.findMany({
                        where: {
                            projectDid: request.data.projectDid,
                        },
                        take: -1,
                    });
                    if (projectStatuses.length > 0 && validStatus.some(elem => elem === projectStatuses[0].status)) {
                        return true;
                    } else {
                        return false;
                    };
                };
            });
        } else {
            console.log(dateTimeLogger() + " insufficient funds available");
            const updateProjectStatusProcessor = new UpdateProjectStatusProcessor();
            const data: any = {
                projectDid: projectDid,
                status: Status.stopped,
            };
            const signature = await updateProjectStatusProcessor.selfSignMessage(data, projectDid);
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
            return Error("Insufficient funds available, project stopped");
        };
    };
};

export default new EvaluateClaimsProcessor();