import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";

export class ListClaimsProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (obj: any, request: Request) => {
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new List Claims transaction ");
        return this.queryTransaction(args, "ListClaims", async (filter: any): Promise<any> => {
            const agent = await prisma.agent.findMany({
                where: {
                    projectDid: filter.projectDid,
                    creator: filter.signature.creator,
                },
            });
            if (agent === undefined) {
                return "Agent not found";
            } else {
                if (agent[0].role === "SA") {
                    const claimEvalArr: any[] = [];
                    const claims = await prisma.claim.findMany({
                        where: {
                            projectDid: filter.projectDid,
                            creator: filter.signature.creator,
                        },
                    });
                    claims.forEach(async claim => {
                        const evaluations = await prisma.evaluateClaim.findMany({
                            where: {
                                claimId: claim.txHash,
                            },
                            orderBy: {
                                version: "desc",
                            },
                        });
                        const claimEval = {
                            claim,
                            evaluations,
                        };
                        claimEvalArr.push(claimEval);
                        return claimEvalArr;
                    });
                } else {
                    const claimEvalArr: any[] = [];
                    const claims = await prisma.claim.findMany({
                        where: filter.data,
                    });
                    claims.forEach(async claim => {
                        const evaluations = await prisma.evaluateClaim.findMany({
                            where: {
                                claimId: claim.txHash,
                            },
                            orderBy: {
                                version: "desc",
                            },
                        });
                        const claimEval = {
                            claim,
                            evaluations,
                        };
                        claimEvalArr.push(claimEval);
                        return claimEvalArr;
                    });
                };
            };
        });
    };
};

export default new ListClaimsProcessor();