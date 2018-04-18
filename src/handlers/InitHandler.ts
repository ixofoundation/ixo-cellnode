import { Request } from "../handlers/Request";
import { create } from "domain";
import { Config, IConfigModel, ConfigSchema } from '../model/project/Config';
import { IConfig } from '../model/project/IConfig';
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
import {SovrinUtils} from '../crypto/SovrinUtils';
import config from "../service/ConfigurationService";


declare var Promise: any;

export class InitHandler {

    initPds = (args: any) => {
        var request = new Request(args);
        return new Promise((resolve: Function, reject: Function) => {
            var sovrinUtils = new SovrinUtils();
            var mnemonic = sovrinUtils.generateBip39Mnemonic();
            var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
            request.did = String("did:sov:" + sovrinWallet.did);

            config.createConfig(request);
            capabilities.createCapability(request.capabilities);
            var signedpayload = sovrinUtils.signDocument(sovrinWallet, request.payload);
            request.signature = signedpayload;

            transactionLog.createTransaction(request.payload, 
                request.signature.type, 
                request.signature.signatureValue,
                sovrinWallet.encryptionPublicKey);    
                        
            resolve({
                    did: request.did,
                    signatureType: request.signature.type,
                    seed: mnemonic
                    })    
        })
    }
}