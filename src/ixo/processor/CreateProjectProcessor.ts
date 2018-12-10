import InitHandler from '../../handlers/InitHandler';
import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import walletService from '../../service/WalletService';
import Cache from '../../Cache';
import { BlockchainURI } from '../common/shared';
import xss from "../../Xss";

export class CreateProjectProcessor extends AbstractHandler {

    handleAsyncCreateProjectResponse = (jsonResponseMsg: any, retries?: number) => {
        Cache.get(jsonResponseMsg.txHash)
            .then((cached) => {
                if (cached != undefined) {
                    console.log(dateTimeLogger() + ' updating the create project capabilities');
                    this.updateCapabilities(cached);
                    console.log(dateTimeLogger() + ' commit create project to Elysian');
                    var obj = {
                        ...cached.data,
                        txHash: jsonResponseMsg.txHash,
                        _creator: cached.signature.creator,
                        _created: cached.signature.created
                    };
                    var sanitizedData = xss.sanitize(obj);
                    Project.create({ ...sanitizedData, projectDid: cached.projectDid });
                    Project.emit('postCommit', obj, cached.projectDid);
                    console.log(dateTimeLogger() + ' create project transaction completed successfully');
                } else {
                    var retry: number = retries || 0;
                    if (retry <= 3) {
                        retry++
                        setTimeout(() => {
                            console.log(dateTimeLogger() + ' retry cached create project transaction for %s ', jsonResponseMsg.txHash);
                            this.handleAsyncCreateProjectResponse(jsonResponseMsg, retry)
                        }, 2000)
                    } else {
                        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
                        //force the data into the DB
                        console.log(dateTimeLogger() + ' cached create project not found for transaction %s ', jsonResponseMsg.txHash);
                    }
                }
            })
            .catch(() => {
                //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to 
                //force the data into the DB
                console.log(dateTimeLogger() + ' exception for cached transaction for %s not found ', jsonResponseMsg.txHash);
            });
    }

    updateCapabilities = (request: Request) => {
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], 'UpdateProjectStatus');
        this.addCapabilities(request.projectDid, [request.projectDid, request.signature.creator], 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, ['did:sov:*'], 'CreateAgent');
        this.addCapabilities(request.projectDid, [request.signature.creator], 'ListAgents');
        this.addCapabilities(request.projectDid, [request.signature.creator], 'ListClaims');
    }

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            var blockChainPayload: any;
            walletService.getWallet(request.projectDid)
                .then((wallet) => {
                    let data = {
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
                    }
                    var sanitizedData = xss.sanitize(data);
                    blockChainPayload = {
                        payload: [{ type: "project/CreateProject", value: sanitizedData }]
                    }
                    resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/CreateProject', BlockchainURI.commit));
                })
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
        return this.checkLatestKycCredential(didDoc);
    }

    process = (args: any) => {
        console.log(dateTimeLogger() + ' start new Create Project transaction ');
        return this.generateProjectWallet()
            .then((did: any) => {
                return InitHandler.initialise(did)
                    .then((response: any) => {
                        return this.createTransaction(args, 'CreateProject', Project, undefined, did);
                    });
            });
    }

}

export default new CreateProjectProcessor();