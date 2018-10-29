import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Agent, IAgentModel } from '../model/AgentModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';

export class CreateAgentProcessor extends AbstractHandler {

    handleAsyncCreateAgentResponse = (jsonResponseMsg: any) => {
        Cache.get(jsonResponseMsg.data.hash)
            .then((cached) => {
                console.log(dateTimeLogger() + ' updating the create agent capabilities');
                this.updateCapabilities(cached.request);
                console.log(dateTimeLogger() + ' commit create agent to Elysian');
                var obj = {
                    ...cached.request.data,
                    txHash: cached.txHash,
                    _creator: cached.request.signature.creator,
                    _created: cached.request.signature.created
                };
                Agent.create({ ...obj, projectDid: cached.request.projectDid });
                Agent.emit('postCommit', obj, cached.request.projectDid);
                console.log(dateTimeLogger() + ' create agent transaction completed successfully');
            });
    }

    updateCapabilities = (request: Request) => {
        this.addCapabilities(request.projectDid, 'did:sov:*', 'CreateAgent');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListAgents');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListClaims');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateProjectStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateProjectStatus');
    }

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            var blockChainPayload: any;
            let data = {
                data: {
                    did: request.data.agentDid,
                    role: request.data.role,
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            }
            blockChainPayload = {
                payload: [{ type: "project/CreateAgent", value: data }]
            }
            resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, "project/CreateAgent"));
        });
    }

    checkLatestKycCredential = (didDoc: any): boolean => {
        let isKYCValidated: boolean = false;
        if (process.env.VALIDISSUERS != undefined) {
            let validIssuers: string[] = (process.env.VALIDISSUERS.split(' '));
            if (didDoc.credentials) {
                didDoc.credentials.forEach((element: any) => {
                    if (validIssuers.some(issuers => issuers === element.issuer)) {
                        isKYCValidated = element.claim.KYCValidated;
                    }
                });
            }
        }
        return isKYCValidated;
    }

    preVerifyDidSignature = (didDoc: any, request: Request, capability: string): boolean => {
        if (request.data.role != 'SA') {
            return this.checkLatestKycCredential(didDoc);
        }
        return true;
    }

    process = (args: any) => {
        console.log(dateTimeLogger() + ' start new Create Agent transaction ');
        return this.createTransaction(args, 'CreateAgent', Agent, (request: any): Promise<boolean> => {
            return new Promise((resolve: Function, reject: Function) => {
                // check that and Agent cannot be EA and SA on same project
                Agent.find(
                    {
                        projectDid: request.data.projectDid,
                        agentDid: request.data.agentDid
                    })
                    .then((results: IAgentModel[]) => {
                        if (results.some(elem => (elem.role === request.data.role) ||
                            (elem.role === 'EA' && request.data.role === 'SA') ||
                            (elem.role === 'SA' && request.data.role === 'EA')))
                            reject("Agent already exists on this project in another role");
                    })
                    .then(() => {
                        // check to see that the project status is in a state that allows us to Create Agents  
                        const validStatus = ["CREATED", "PENDING", "FUNDED", "STARTED"];
                        ProjectStatus.find(
                            {
                                projectDid: request.data.projectDid
                            },
                            (error: Error, results: IProjectStatusModel[]) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    if (results.length > 0 && validStatus.some(elem => elem === results[0].status)) {
                                        resolve(results[0]);
                                    }
                                    reject("Invalid Project Status. Valid statuses are " + validStatus.toString());
                                }
                            }).limit(1).sort({ $natural: -1 })
                    });
            });
        });
    }
}

export default new CreateAgentProcessor();