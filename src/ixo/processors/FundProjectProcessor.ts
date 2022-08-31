import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { BlockchainMode, workflow } from "../common/shared";
import { dateTimeLogger } from "../../logger/Logger";
import xss from "../../Xss";

export class FundProjectProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
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
            }
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
        console.log(dateTimeLogger() + "start new Fund Project transaction");
        const request = new Request(args);
        return this.createTransaction(args, "FundProject", async (request: any): Promise<boolean> => {
            if (workflow.indexOf(request.data.status) === 0) {
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
                };
            } else {
                return true;
            }
        });
    };
};

export default new FundProjectProcessor();