import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { BlockchainMode } from "../common/shared";
import { dateTimeLogger } from "../../logger/Logger";
import Cache from "../../Cache";
import xss from "../../Xss";

export class UpdateProjectDocProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    handleAsyncProjectDocResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger() + " updating the project doc capabilities");
                this.updateCapabilities(cached);
                console.log(dateTimeLogger() + " commit project doc to Elysian");
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
                await prisma.projectDoc.create({
                    data: {
                        projectDid: cached.projectDid,
                        projectDoc: sanitizedProjectData,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                const prevProject = await prisma.project.findFirst({
                    where: {
                        projectDid: cached.projectDid,
                    },
                });
                if (prevProject) {
                    await prisma.project.update({
                        where: {
                            projectDid: prevProject.projectDid,
                        },
                        data: {
                            projectData: cached.data.data,
                            txHash: prevProject.txHash,
                            creator: prevProject.creator,
                            created: prevProject.created,
                        },
                    });
                    console.log(dateTimeLogger() + " Update project doc transaction completed successfully");
                } else {
                    console.log(dateTimeLogger() + " project not found when updating projects DB");
                };
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger() + ` retry cached update project transaction for ${jsonResponseMsg.txHash}`);
                        this.handleAsyncProjectDocResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    console.log(dateTimeLogger() + ` cached update project not found for transaction ${jsonResponseMsg.txHash}`);
                }
            };
        } catch (error) {
            console.log(dateTimeLogger() + " exception caught for handleAsyncProjectDocResponse");
        };
    };

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            const data = {
                data: request.data.data,
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            };
            const sanitizedData = xss.sanitize(data);
            const msg = { type: "project/UpdateProjectDoc", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
        });
    };

    process = (args: any) => {
        console.log(dateTimeLogger() + " start new Update Project Doc transaction");
        // TODO: add check to make sure project status is one of ["NULL", "CREATED", "PENDING", "FUNDED"]
        //       but in any case this is enforced by the blockchain, so we might want to just rely on that.
        return this.createTransaction(args, "UpdateProjectDoc", undefined);
    };
};

export default new UpdateProjectDocProcessor();