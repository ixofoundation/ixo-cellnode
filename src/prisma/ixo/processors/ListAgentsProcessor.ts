import { prisma } from "../../prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../../logger/Logger";

export class ListAgentsProcessor extends AbstractHandler {
    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (obj: any, request: Request) => {
    };

    process = async (args: any) => {
        console.log(dateTimeLogger() + " start new List Agents transaction");
        return this.queryTransaction(args, "ListAgents", async (filter: any): Promise<any> => {
            const agentsArr: any[] = [];
            const agents = await prisma.agent.findMany({
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
                    },
                },
            });
            if (agents) {
                agents.forEach(agent => {
                    const currentStatus = agent.AgentStatus[agent.AgentStatus.length - 1].status;
                    const newAgent = {
                        name: agent.name,
                        agentDid: agent.agentDid,
                        projectDid: agent.projectDid,
                        role: agent.role,
                        email: agent.email,
                        currentStatus: currentStatus,
                    };
                    agentsArr.push(newAgent);
                });
                return agentsArr;
            }
        });
    };
};

export default new ListAgentsProcessor();