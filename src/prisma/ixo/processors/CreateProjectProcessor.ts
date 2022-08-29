import { prisma } from "../../prisma_client";
import * as InitHandler from "../../handlers/InitHandler";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import updateProjectStatusProcessor from "../processors/UpdateProjectStatusProcessor";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../../logger/Logger";
import * as walletService from "../../services/WalletService";
import Cache from "../../../Cache";
import { BlockchainMode, Status } from "../common/shared";
import xss from "../../../Xss";

export class CreateProjectProcessor extends AbstractHandler {
    handleAsyncCreateProjectResponse = async (jsonResponseMsg: any, retries?: any) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger() + " updating the create project capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit create project to Elysian");
                const projectData = {
                    ...cached.data,
                };
                const obj = {
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                };
                const sanitizedProjectData = xss.sanitize(projectData);
                const sanitizedData = xss.sanitize(obj);
                await prisma.project.create({
                    data: {
                        projectDid: cached.projectDid,
                        projectData: sanitizedProjectData,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                await prisma.projectDoc.create({
                    data: {
                        projectDid: cached.projectDid,
                        projectDoc: sanitizedProjectData,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                const data: any = {
                    projectDid: cached.projectDid,
                    status: Status.created,
                };
                const signature = await updateProjectStatusProcessor.selfSignMessage(data, cached.projectDid);
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
                        creator: cached.projectDid,
                        signatureValue: signature,
                    },
                };
                await updateProjectStatusProcessor.process(projectStatusRequest);
                console.log(dateTimeLogger() + " create project transaction completed successfully");
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached create project transaction for ${jsonResponseMsg.txHash} `);
                        this.handleAsyncCreateProjectResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger() + ` cached create project not found for transaction ${jsonResponseMsg.txHash} `);
                }
            };
        } catch (error) {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger() + " exception for cached transaction for %s not found", jsonResponseMsg.txHash);
        };
    };

    updateCapabilities = (request: Request) => {
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], "FundProject");
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], "UpdateProjectStatus");
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], "UpdateProjectDoc");
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], "UpdateAgentStatus");
        this.addCapabilities(request.projectDid, ["did:sov:*", "did:ixo:*"], "CreateAgent");
        this.addCapabilities(request.projectDid, [request.signature.creator], "ListAgents");
        this.addCapabilities(request.projectDid, [request.signature.creator], "ListClaims");
        this.addCapabilities(request.projectDid, [request.signature.creator], "ListClaimsByTemplateId");
    };

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            walletService.getWallet(request.projectDid)
                .then((wallet) => {
                    if (wallet) {
                        const data = {
                            data: {
                                ...request.data,
                                createdOn: request.signature.created,
                                createdBy: request.signature.creator,
                                nodeDid: process.env.NODEDID
                            },
                            txHash: txHash,
                            senderDid: request.signature.creator,
                            projectDid: request.projectDid,
                            pubKey: wallet.verifyKey
                        };
                        const sanitizedData = xss.sanitize(data);
                        const msg = { type: "project/CreateProject", value: sanitizedData };
                        resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
                    };
                });
        });
    };

    checkLatestKycCredential = (didDoc: any): boolean => {
        let isKYCValidated: boolean = false;
        if (process.env.VALIDISSUERS != undefined) {
            let validIssuers: string[] = (process.env.VALIDISSUERS.split(" "));
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
        return this.checkLatestKycCredential(didDoc);
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new Create Project transaction");
        const did = await this.generateProjectWallet();
        if (did) { const response = await InitHandler.initialise(did) }
        return this.createTransaction(args, "CreatePoject", undefined, did);
    }
};

export default new CreateProjectProcessor();