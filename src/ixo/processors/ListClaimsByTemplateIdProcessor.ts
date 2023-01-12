import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";

export class ListClaimsByTemplateId extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (obj: any, request: Request) => {
    };

    process = (args: any) => {
        console.log(dateTimeLogger("start new List Claims by template ID transaction"));
        return this.queryTransaction(args, "ListClaimsByTemplateId", (filter: any): Promise<any[]> => {
            return new Promise((resolve: Function, reject: Function) => {
                prisma.agent.findMany({
                    where: {
                        projectDid: filter.projectDid,
                        creator: filter.signature.creator,
                    },
                })
                .then((agents) => {
                    if (agents[0].role === "SA") {
                        const claimEvalArr: any[] = [];
                        try {
                            prisma.claim.findMany({
                            where: {
                                projectDid: filter.projectDid, 
                                claimTemplateId: filter.data.claimTemplateId,
                                creator: filter.signature.creator
                            },
                            })
                            .then((claims) => {        
                                claims.forEach(claim => {
                                    prisma.evaluateClaim.findMany({
                                        where: {
                                            claimId: claim.txHash,
                                        },
                                        orderBy: {
                                            version: "desc",
                                        },
                                    })
                                    .then((evaluations) => {
                                        const claimEval = {
                                            claim,
                                            evaluations,
                                        };
                                        claimEvalArr.push(claimEval);
                                    })
                                });
                            })
                            resolve(claimEvalArr)
                        } catch (error) {
                            reject(error)
                        } 
                    } else {
                        const claimEvalArr: any[] = [];
                        try {
                            prisma.claim.findMany({
                            where: filter.data,
                            })
                            .then((claims) => {
                                claims.forEach(claim => {
                                    prisma.evaluateClaim.findMany({
                                        where: {
                                            claimId: claim.txHash,
                                        },
                                        orderBy: {
                                            version: "desc",
                                        },
                                    })
                                    .then((evaluations) => {
                                        const claimEval = {
                                            claim,
                                            evaluations,
                                        };
                                        claimEvalArr.push(claimEval);
                                    })
                                });
                            })
                            resolve(claimEvalArr)
                        } catch (error) {
                            reject(error)
                        }
                    }
                })
            }) 
        });
    };
};

export default new ListClaimsByTemplateId();