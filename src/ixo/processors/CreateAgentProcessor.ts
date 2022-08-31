import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";
import Cache from "../../Cache";
import xss from "../../Xss";
import { BlockchainMode } from "../common/shared";
import updateAgentStatusProcessor from "./UpdateAgentStatusProcessor";

export class CreateAgentProcessor extends AbstractHandler {
    handleAsyncCreateAgentResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger() + " updating the create agent capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit create agent to Elysian");
                const obj = {
                    ...cached.data,
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                };
                const sanitizedData = xss.sanitize(obj);
                await prisma.agent.create({
                    data: {
                        agentDid: sanitizedData.agentDid,
                        projectDid: cached.projectDid,
                        email: sanitizedData.email,
                        name: sanitizedData.name,
                        role: sanitizedData.role,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                const project = await prisma.project.findFirst({
                    where: {
                        projectDid: obj.projectDid,
                    },
                });
                if (project) {
                    const data = {
                        projectDid: cached.projectDid,
                        status: "1",
                        agentDid: obj.agentDid,
                        role: obj.role,
                    };
                    const signature = await updateAgentStatusProcessor.selfSignMessage(data, cached.projectDid);
                    const statusRequest = {
                        payload: {
                            template: {
                                name: "agent-status",
                            },
                            data: data,
                        },
                        signature: {
                            type: "ed25519-sha-256",
                            created: new Date().toISOString(),
                            creator: cached.projectDid,
                            signatureValue: signature,
                        },
                    };
                    await updateAgentStatusProcessor.process(statusRequest);
                };
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached create agent transaction for ${jsonResponseMsg.txHash}`);
                        this.handleAsyncCreateAgentResponse(jsonResponseMsg, retry);
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger() + ` cached create agent not found for transaction ${jsonResponseMsg.txHash}`);
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
                    did: request.data.agentDid,
                    role: request.data.role,
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            };
            const sanitizedData = xss.sanitize(data);
            const msg = { type: "project/CreateAgent", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
        });
    };

    checkLatestKycCredential = (didDoc: any): boolean => {
        let isKYCValidated: boolean = false;
        if (process.env.VALIDISSUERS != undefined) {
            const validIssuers: string[] = (process.env.VALIDISSUERS.split(' '));
            if (didDoc.credentials) {
                didDoc.credentials.forEach((element: any) => {
                    if (validIssuers.some(issuers => issuers === element.issuer)) {
                        isKYCValidated = element.claim.KYCValidated;
                    }
                });
            }
        }
        return isKYCValidated;
    };

    preVerifyDidSignature = (didDoc: any, request: Request, capability: string): boolean => {
        if (request.data.role != "SA") {
            return this.checkLatestKycCredential(didDoc);
        }
        return true;
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new Create Agent transaction");
        return this.createTransaction(args, "CreateAgent", async (request: any): Promise<boolean> => {
            const agents = await prisma.agent.findMany({
                where: {
                    projectDid: request.data.projectDid,
                    agentDid: request.data.agentDid,
                },
            });
            if (agents) {
                if (agents.some(elem => (elem.role === request.data.role) ||
                    (elem.role === "EA" && request.data.role === "SA") ||
                    (elem.role === "SA" && request.data.role === "EA")))
                    return false;
            } else {
                return false;
            };
            const validStatus = ["CREATED", "PENDING", "FUNDED", "STARTED"];
            const projectStatuses = await prisma.projectStatus.findMany({
                where: {
                    projectDid: request.data.projectDid
                },
                take: -1,
            });
            if (projectStatuses) {
                if (projectStatuses.length > 0 && validStatus.some(elem => elem === projectStatuses[0].status)) {
                    return true;
                }
                return false;
            } else {
                return false;
            };
        });
    };
};

export default new CreateAgentProcessor();