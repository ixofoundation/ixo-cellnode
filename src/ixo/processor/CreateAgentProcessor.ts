import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Agent, IAgentModel } from '../model/AgentModel';
import { ProjectStatus, IProjectStatusModel } from '../model/ProjectStatusModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import Cache from '../../Cache';
import xss from "../../Xss";

export class CreateAgentProcessor extends AbstractHandler {

    handleAsyncCreateAgentResponse = (jsonResponseMsg: any, retries?: number) => {
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                if (cached != undefined) {
                    console.log(dateTimeLogger() + ' updating the create agent capabilities');
                    this.updateCapabilities(cached);
                    console.log(dateTimeLogger() + ' commit create agent to Elysian');
                    var obj = {
                        ...cached.data,
                        txHash: jsonResponseMsg.txHash,
                        _creator: cached.signature.creator,
                        _created: cached.signature.created
                    };
                    var sanitizedData = xss.sanitize(obj);
                    Agent.create({ ...sanitizedData, projectDid: cached.projectDid });
                    Agent.emit('postCommit', obj, cached.projectDid);
                    console.log(dateTimeLogger() + ' create agent transaction completed successfully');
                } else {
                    var retry: number = retries || 0;
                    if (retry <= 3) {
                        retry++
                        setTimeout(() => {
                            console.log(dateTimeLogger() + ' retry cached create agent transaction for %s ', jsonResponseMsg.txHash);
                            this.handleAsyncCreateAgentResponse(jsonResponseMsg, retry)
                        }, 2000)
                    } else {
                        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
                        //force the data into the DB
                        console.log(dateTimeLogger() + ' cached create agent not found for transaction %s ', jsonResponseMsg.txHash);
                    }
                }
            })
            .catch(() => {
                //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
                //force the data into the DB
                console.log(dateTimeLogger() + ' exception for cached transaction for %s not found ', jsonResponseMsg.txHash);
            });
    }

    updateCapabilities = (request: Request) => { }

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

            var sanitizedData = xss.sanitize(data);
            blockChainPayload = {
                payload: [{ type: "project/CreateAgent", value: sanitizedData }]
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