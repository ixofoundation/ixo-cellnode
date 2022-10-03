import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";
import Cache from "../../Cache";
import xss from "../../Xss";

export class UpdateAgentStatusProcessor extends AbstractHandler {
    handleAsyncUpdateAgentStatusResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger() + " updating the agent status update capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit agent status update to Elysian");
                const obj = {
                    ...cached.data,
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                    version: cached.version >= 0 ? cached.version + 1 : 0,
                };
                const sanitizedData = xss.sanitize(obj);
                await prisma.agentStatus.create({
                    data: {
                        agentDid: sanitizedData.agentDid,
                        projectDid: sanitizedData.projectDid,
                        status: sanitizedData.status,
                        role: sanitizedData.role,
                        version: sanitizedData.version,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                console.log(dateTimeLogger() + " update agent status transaction completed successfully");
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached create agent transaction for ${jsonResponseMsg.txHash}`);
                        this.handleAsyncUpdateAgentStatusResponse(jsonResponseMsg, retry);
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger() + ` cached agent status update not found for transaction ${jsonResponseMsg.txHash}`);
                };
            };
        } catch (error) {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger() + ` exception for cached transaction for ${jsonResponseMsg.txHash} not found`);
        };
    };

    updateCapabilities = (request: Request) => {
        if (request.data.role === "SA" && request.data.status === "1") this.addCapabilities(request.projectDid, [request.data.agentDid], "SubmitClaim");
        if (request.data.role === "EA" && request.data.status === "1") this.addCapabilities(request.projectDid, [request.data.agentDid], "EvaluateClaim");
        if (request.data.status === "1") this.addCapabilities(request.projectDid, [request.data.agentDid], "ListClaims");
        if (request.data.status === "1") this.addCapabilities(request.projectDid, [request.data.agentDid], "ListClaimsByTemplateId");
        if (request.data.role === "SA" && request.data.status === "2") this.removeCapabilities(request.projectDid, request.data.agentDid, "SubmitClaim");
        if (request.data.role === "EA" && request.data.status === "2") this.removeCapabilities(request.projectDid, request.data.agentDid, "EvaluateClaim");
        if (request.data.status === "2") this.removeCapabilities(request.projectDid, request.data.agentDid, "ListClaims");
        if (request.data.status === "2") this.removeCapabilities(request.projectDid, request.data.agentDid, "ListClaimsByTemplateId");
    };

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            const data = {
                data: {
                    did: request.data.agentDid,
                    status: request.data.status,
                    role: request.data.role
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            };
            const sanitizedData = xss.sanitize(data);
            const msg = { type: "project/UpdateAgent", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid));
        });
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new Update Agent Status transaction");
        return this.createTransaction(args, "UpdateAgentStatus", async (request: any): Promise<boolean> => {
            const newVersion = request.version + 1;
            return new Promise((resolve: Function, reject: Function) => {
                prisma.agentStatus.findFirst({
                where: {
                    agentDid: request.data.agentDid,
                    projectDid: request.data.projectDid,
                    version: newVersion,
                    },
                })
                .then((result) => {
                    if (result) {
                        reject("invalid record or record already exists")
                    }
                })
                .then(() => {
                    const validStatus = ["CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED"];
                    try {
                        prisma.projectStatus.findMany({
                            where: {
                                projectDid: request.data.projectDid
                            },
                            take: -1,
                        })
                        .then((results) => {
                            if (results.length > 0 && validStatus.some(elem => elem === results[0].status)) {
                                resolve(results[0]);
                            }
                            reject("Invalid Project Status. Valid statuses are " + validStatus.toString())
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        });
    };
};

export default new UpdateAgentStatusProcessor();