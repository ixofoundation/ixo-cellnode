import InitHandler from '../../handlers/InitHandler';
import { AbstractHandler } from '../../handlers/AbstractHandler';
import { Project } from '../model/ProjectModel';
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from '../../logger/Logger';
import walletService from '../../service/WalletService';

export class CreateProjectProcessor extends AbstractHandler {

    updateCapabilities = (request: Request) => {
        this.addCapabilities(request.projectDid, 'did:sov:*', 'CreateAgent');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListAgents');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListClaims');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateProjectStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateProjectStatus');
    }

    msgToPublish = (obj: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            var blockChainPayload: any;
            var txHash = obj.txHash;
            delete obj.version;
            delete obj.txHash;
            delete obj._creator;
            delete obj._created;

            delete obj.autoApprove;
            walletService.getWallet(request.projectDid)
                .then((wallet) => {
                    let data = {
                        data: {
                            ...obj,
                            createdOn: request.signature.created,
                            createdBy: request.signature.creator
                        },
                        txHash: txHash,
                        senderDid: request.signature.creator,
                        projectDid: request.projectDid,
                        pubKey: wallet.verifyKey
                    }
                    blockChainPayload = {
                        //payload: [16, new Buffer(JSON.stringify(data)).toString('hex').toUpperCase()]
                        payload: [{ type: "project/CreateProject", value: data }]
                    }
                    resolve(this.signMessageForBlockchain(blockChainPayload, request.projectDid));
                })
        });
    }

    checkKycCredentials = (didDoc: any): boolean => {
        let isKYCValidated: boolean = false;
        if (process.env.VALIDISSUERS != undefined) {
            let validIssuers: string[] = (process.env.VALIDISSUERS.split(' '));
            if (didDoc.credentials) {
                didDoc.credentials.forEach((element: any) => {
                    if (element.claim.KYCValidated && validIssuers.some(issuers => {issuers === element.issuer})) {
                        isKYCValidated = true;
                    }
                });
            }
        }
        return isKYCValidated;
    }

    preVerifyDidSignature = (didDoc: any, request: Request, capability: string): boolean => {
        return this.checkKycCredentials(didDoc);
    }

    process = (args: any) => {
        console.log(dateTimeLogger() + ' start new transaction ' + JSON.stringify(args));
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