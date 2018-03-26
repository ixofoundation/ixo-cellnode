import { Request } from "../handlers/Request";
import { create } from "domain";
import { Config, IConfigModel, ConfigSchema } from '../model/Config';
import { IConfig } from '../model/IConfig';
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
import {CryptoUtils} from '../crypto/Utils';
import config from "../service/ConfigurationService";


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

            config.createConfig(request);
            capabilities.createCapability(request.did, request.requestType);
            console.log("SIGN THE PAYLOAD " + request.payload +  " WITH " + request.authMethod[0].secret_key);
            var signedpayload = cryptoUtils.signECDSA(request.payload, request.authMethod[0].secret_key);
            console.log("SIGNED PAYLOAD " + signedpayload);

            transactionLog.createTransaction(request.payload, 
                request.authMethod[0].type, 
                signedpayload,
                request.authMethod[0].public_key);

            request.signature.type = request.authMethod[0].type;
            request.signature.signature = signedpayload;
            request.signature.publicKey = request.authMethod[0].public_key;
            console.log("IS THIS A VALID REQUEST " + request.verifySignature());

            resolve({
                    signatureType: request.authMethod[0].type,
                    publicKey: request.authMethod[0].public_key
                    })    
        });
    }

}