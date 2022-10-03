import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";

export class ListAgentsProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (obj: any, request: Request) => {
    };

    process = (args: any) => {
        console.log(dateTimeLogger() + " start new List Agents transaction");
        return this.queryTransaction(args, "ListAgents", (filter: any): Promise<any[]> => {
            return new Promise((resolve: Function, reject: Function) => {
                try {
                    prisma.agent.findMany({
                        select: {
                            name: true,
                            agentDid: true,
                            projectDid: true,
                            role: true,
                            email: true,
                            AgentStatus: {
                                select: {
                                    status: true,
                                },
                                take: -1,
                            },
                        },
                    })
                    .then((result) => resolve(result))
                } catch (error) {
                    reject(error)
                }
            })
        });
    };
};

export default new ListAgentsProcessor();