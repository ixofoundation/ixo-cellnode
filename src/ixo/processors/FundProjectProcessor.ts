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

    process = (args: any) => {
        console.log(dateTimeLogger("start new Fund Project transaction"));
        const request = new Request(args);
        return this.createTransaction(args, "FundProject", (request: any): Promise<boolean> => {
            return new Promise((resolve: Function, reject: Function) => {
                if (workflow.indexOf(request.data.status) === 0) {
                this.getLatestProjectStatus(request.projectDid)
                    .then((current) => {
                        if (current.length > 0) {
                            if (workflow.indexOf(request.data.status) - 1 <= workflow.indexOf(current[0].status)) {
                                resolve(true);
                            } else {
                                console.log(dateTimeLogger("Invalid status workflow " + request.data.status, true));
                                reject("Invalid status workflow");
                            };
                        } else {
                            console.log(dateTimeLogger("no status exists for project " + request.projectDid, true));
                            reject('No status exists for project ' + request.projectDid);
                        };
                    }) 
            } else {
                resolve(true);
            }
            })  
        });
    };
};

export default new FundProjectProcessor();