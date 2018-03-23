import { Request } from "../handlers/Request";
import { create } from "domain";
import { Config, IConfigModel, ConfigSchema } from '../model/Config';
import { IConfig } from '../model/IConfig';
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
import {CryptoUtils} from '../crypto/Utils';


declare var Promise: any;

export class InitHandler {

    initPds = (args: any) => {
        var request = new Request(args);
        
        return new Promise((resolve: Function, reject: Function) => {            
            var cryptoUtils = new CryptoUtils();
            if(!request.hasAuthMethod()) {                
                var wallet = cryptoUtils.generateWalletAndKeys();
                var authMethod = [{
                    type: "ECDSA",
                    public_key: wallet.publickKey,
                    secret_key: wallet.privateKey 
                }]
                request.authMethod = authMethod;
              }

            Config.create(request);
            capabilities.createCapability(request.did, request.requestType);
            transactionLog.createTransaction(request.payload, 
                request.authMethod[0].type, 
                cryptoUtils.signECDSA(request.payload, request.authMethod[0].secret_key),
                request.authMethod[0].public_key);

            resolve({
                    signatureType: request.authMethod[0].type,
                    publicKey: request.authMethod[0].public_key
                    })    
        });
    }

}