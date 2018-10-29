import InitHandler from '../../handlers/InitHandler';
import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import walletService from '../../service/WalletService';
import Cache from '../../Cache';

export class CreateProjectProcessor extends AbstractHandler {

    handleAsyncCreateProjectResponse = (jsonResponseMsg: any) => {
        Cache.get(jsonResponseMsg.data.hash)
            .then((cached) => {
                console.log(dateTimeLogger() + ' updating the create project capabilities');
                this.updateCapabilities(cached.request);
                console.log(dateTimeLogger() + ' commit create project to Elysian');
                var obj = {
                    ...cached.request.data,
                    txHash: cached.txHash,
                    _creator: cached.request.signature.creator,
                    _created: cached.request.signature.created
                };
                Project.create({ ...obj, projectDid: cached.request.projectDid });
                Project.emit('postCommit', obj, cached.request.projectDid);
                console.log(dateTimeLogger() + ' create project transaction completed successfully');
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
            delete request.data.autoApprove;
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
                    blockChainPayload = {
                        payload: [{ type: "project/CreateProject", value: data }]
                    }
                    resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/CreateProject', true));
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