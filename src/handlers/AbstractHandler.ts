import * as TransactionService from "../services/TransactionService";
import * as CapabilityService from "../services/CapabilityService";
import { newCapabilitiesDoc } from "../prisma/interface_models/Capability";
import * as WalletService from "../services/WalletService";

import { RequestValidator } from "../templates/RequestValidator";
import { validateJson } from "../templates/JsonValidator";
import { ValidatorResult } from "jsonschema";
import { ValidationError } from "../error/ValidationError";
import { TransactionError } from "../error/TransactionError";

import { Request } from "./Request";
import TemplateUtils from "../templates/TemplateUtils";
import SovrinUtils from "../crypto/SovrinUtils";
import axios, { AxiosResponse } from "axios";
import Cache from "../Cache";

import { dateTimeLogger } from "../logger/Logger";
import { BlockchainMode } from "../ixo/common/shared";
import { setIWallet } from "../prisma/interface_models/Wallet";

// import { publish } from "../MessageQ";

import base58 from 'bs58';
import { sign, broadcast } from "../proto";

const BLOCKSYNC_URI_REST = (process.env.BLOCKSYNC_URI_REST || '');

export abstract class AbstractHandler {
    public createTransaction(args: any, method: string, verifyData?: Function, projectDid?: string) {
        const request = new Request(args);
        return new Promise((resolve: Function, reject: Function) => {
            if (!request.projectDid) request.projectDid = (projectDid || "");
            CapabilityService.findCapabilitiesForProject(request.projectDid)
                .then((result) => {
                    const capabilities = newCapabilitiesDoc(result);
                    const capabilityMap = capabilities.capabilities.filter(element => element.capability == method)[0];
                    console.log(dateTimeLogger("have capability " + capabilityMap.capability));
                    TemplateUtils.getTemplateFromCache(capabilityMap.template, request.template)
                        .then((schema: any) => {
                            console.log(dateTimeLogger('validate the template'));
                            const validator: ValidatorResult = validateJson(schema, args);
                            if (validator.valid) {
                                console.log(dateTimeLogger('validate the capability'));
                                const capValid: RequestValidator = request.verifyCapability(capabilityMap.allow);
                                if (capValid.valid) {
                                    console.log(dateTimeLogger('verify the signature'));
                                    request.verifySignature(this.preVerifyDidSignature.bind(this), capabilityMap.validateKYC, capabilityMap.capability)
                                        .then((sigValid: RequestValidator) => {
                                            if (sigValid.valid) {
                                                console.log(dateTimeLogger('signature verified'));
                                                if (verifyData) {
                                                    verifyData(request)
                                                        .then(() => {
                                                            //submit information to blockchain. Poller to add to cache once it gets hash from chain
                                                            this.createTransactionLog(request, capabilityMap)
                                                                .then((transaction: any) => {
                                                                    resolve(this.publishAndRespond(transaction.hash, request));
                                                                });
                                                        })
                                                        .catch((error: string) => {
                                                            console.log(dateTimeLogger('error creating transaction log ' + request.projectDid, true));
                                                            reject(new TransactionError(error));
                                                        })
                                                } else {
                                                    //submit information to blockchain. Poller to add to cache once it gets hash from chain
                                                    this.createTransactionLog(request, capabilityMap)
                                                        .then((transaction: any) => {
                                                            resolve(this.publishAndRespond(transaction.hash, request));
                                                        })
                                                        .catch((error: string) => {
                                                            console.log(dateTimeLogger('error creating transaction log ' + request.projectDid, true));
                                                            reject(new TransactionError(error));
                                                        });
                                                }
                                            } else {
                                                reject(new ValidationError(sigValid.errors[0]));
                                            }
                                        })
                                        .catch((error: string) => {
                                            console.log(dateTimeLogger('error verifying signature ' + request.projectDid, true));
                                            reject(new TransactionError(error));
                                        });
                                } else {
                                    console.log(dateTimeLogger('error processing capability ' + request.projectDid, true));
                                    reject(new ValidationError(capValid.errors[0]));
                                }
                            } else {
                                console.log(dateTimeLogger(' template validation failed', true));
                                reject(new ValidationError(validator.errors[0].message));
                            }
                        })
                        .catch((reason) => {
                            console.log(dateTimeLogger(' template registry failed' + reason, true));
                            reject(new TransactionError('Cannot connect to template registry'));
                        });
                })
                .catch(() => {
                    console.log(dateTimeLogger(' capabilities not found for project ' + request.projectDid, true));
                    reject(new TransactionError('Capabilities not found for project'));
                });
        });
    };

    public queryTransaction(args: any, method: string, query: Function) {
        const request = new Request(args);
        return new Promise((resolve: Function, reject: Function) => {
            CapabilityService.findCapabilitiesForProject(request.projectDid)
                .then((result) => {
                    const capabilities = newCapabilitiesDoc(result);
                    const capabilityMap = capabilities.capabilities.filter(element => element.capability == method)[0];
                    TemplateUtils.getTemplateFromCache(capabilityMap.template, request.template)
                        .then((schema: any) => {
                            console.log(dateTimeLogger('validate the template'));
                            const validator: ValidatorResult = validateJson(schema, args);
                            if (validator.valid) {
                                console.log(dateTimeLogger('validate the capability'));
                                const capValid: RequestValidator = request.verifyCapability(capabilityMap.allow);
                                if (capValid.valid) {
                                    console.log(dateTimeLogger(' verify the signature'));
                                    request.verifySignature(this.preVerifyDidSignature.bind(this), capabilityMap.validateKYC, capabilityMap.capability)
                                        .then((sigValid: RequestValidator) => {
                                            if (sigValid.valid) {
                                                console.log(dateTimeLogger('query Elysian'));
                                                resolve(query(request));
                                            } else {
                                                reject(new ValidationError(sigValid.errors[0]));
                                            }
                                            console.log(dateTimeLogger(' transaction completed successfully'));
                                        })
                                } else {
                                    reject(new ValidationError(capValid.errors[0]));
                                }
                            } else {
                                reject(new ValidationError(validator.errors[0].message));
                            }
                        })
                        .catch((reason) => {
                            console.log(dateTimeLogger('template registry failed' + reason, true));
                            reject(new TransactionError('Cannot connect to template registry'));
                        });
                })
                .catch(() => {
                    console.log(dateTimeLogger('capabilities not found for project ' + request.projectDid, true));
                    reject(new TransactionError('Capabilities not found for project'));
                });
        })

    };

    preVerifyDidSignature = (didResponse: AxiosResponse, data: Request, capability: string): boolean => {
        return true;
    };

    async addCapabilities(projectDid: string, did: string[], requestType: string) {
        await CapabilityService.addCapabilities(projectDid, did, requestType);
    };

    async removeCapabilities(projectDid: string, did: string, requestType: string) {
        await CapabilityService.removeCapabilities(projectDid, did, requestType);
    };

    async generateProjectWallet() {
        const sovrinUtils = new SovrinUtils();
        const mnemonic = sovrinUtils.generateBip39Mnemonic();
        const sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
        const did = "did:ixo:" + sovrinWallet.did;
        const IWallet = setIWallet(did, sovrinWallet.secret.signKey, sovrinWallet.verifyKey);
        const res = await WalletService.createWallet(IWallet.did, IWallet.signKey, IWallet.verifyKey);
        if (res) {
            Cache.set(res.did, { publicKey: res.verifyKey });
            console.log(dateTimeLogger("project wallet created"))
            return res.did
        }
        return "";
    };

    async messageForBlockchain(msgToSign: any, projectDid: string, blockchainMode?: string) {
        const wallet = await WalletService.getWallet(projectDid);
        if (wallet) {
            Cache.set(wallet.did, { publicKey: wallet.verifyKey });
            const msgJson = JSON.stringify(msgToSign);
            const msgUppercaseHex = Buffer.from(msgJson).toString("hex").toUpperCase();
            const res = await axios.post(BLOCKSYNC_URI_REST + "sign_data/", { msg: msgUppercaseHex, pub_key: wallet.verifyKey });
            if (res.status == 200 && res.data.sign_bytes) {
                const signData = res.data;
                const sovrinUtils = new SovrinUtils();
                let signedMsg = {
                    msg: [msgToSign],
                    fee: signData.fee,
                    signatures: [{
                        // signature: sovrinUtils.signDocumentNoEncoding(wallet.signKey, wallet.verifyKey, wallet.did, signData.sign_bytes),
                        signature: sign(wallet.did, [msgToSign], signData.fee),
                        pub_key: {
                            type: "tendermint/PubKeyEd25519",
                            value: base58.decode(wallet.verifyKey).toString('base64'),
                        },
                    }],
                };
                const message = {
                    msgType: (msgToSign.type || "blockchain"),
                    projectDid: wallet.did,
                    data: JSON.stringify({ tx: signedMsg, mode: blockchainMode || BlockchainMode.sync }),
                };
                return message;
            } else {
                console.log(dateTimeLogger("error when requesting sign data from blockchain " + res.statusText, true));
                return ("Error when requesting sign data from blockchain");
            };
        } else {
            console.log(dateTimeLogger("get wallet failed", true));
            return;
        };
    };

    async selfSignMessage(msgToSign: any, projectDid: string) {
        const wallet = await WalletService.getWallet(projectDid);
        if (wallet) {
            Cache.set(wallet.did, { publicKey: wallet.verifyKey });
            const sovrinUtils = new SovrinUtils();
            // return sovrinUtils.signDocumentNoEncoding(wallet.signKey, wallet.verifyKey, wallet.did, msgToSign);
            return sign(wallet.did, msgToSign)
        } else {
            return new TransactionError("Exception signing request with did " + projectDid);
        };
    };

    async publishMessageToQueue(message: any) {
        // console.log(dateTimeLogger() + " message to be published " + message.data.msgType);
        // return publish(message);
        const tx = {
            msgType: message.msgType,
            projectDid: message.projectDid,
            data: JSON.parse(message.data.tx)
        };
        const txBytes = new Uint8Array(Buffer.from(JSON.stringify(tx)));
        const mode = JSON.parse(message.data.mode)
        return broadcast({txBytes, mode});
    };

    msgToPublish = (hash: any, request: Request): any => {
    };

    private publishAndRespond(hash: string, request: Request) {
        const msg = this.msgToPublish(hash, request);
        // console.log(dateTimeLogger() + " message to be published " + msg.msgType);
        // const cacheMsg = {
        //     data: msg,
        //     request: request,
        //     txHash: hash
        // };
        // publish(cacheMsg);
        // return hash;
        const tx = {
            msgType: msg.msgType,
            projectDid: msg.projectDid,
            data: JSON.parse(msg.data.tx)
        };
        const txBytes = new Uint8Array(Buffer.from(JSON.stringify(tx)));
        const mode = JSON.parse(msg.data.mode);
        return broadcast({txBytes, mode});
    };

    private async createTransactionLog(request: Request, capabilityMap: any) {
        const res = await TransactionService.createTransaction(request.body, request.signature.type, request.signature.signatureValue, request.projectDid, capabilityMap.capability);
        if (res) {
            console.log(dateTimeLogger(" write transaction to log" + res.hash));
            return res;
        }
        return;
    };
};