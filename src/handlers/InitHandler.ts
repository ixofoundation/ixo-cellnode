import { Request } from "../handlers/Request";
import { create } from "domain";
import { Config, IConfigModel, ConfigSchema } from '../model/project/Config';
import { IConfig } from '../model/project/IConfig';
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
//import {CryptoUtils} from '../crypto/Utils';
import {SovrinUtils} from '../crypto/SovrinUtils';
import config from "../service/ConfigurationService";


declare var Promise: any;

export class InitHandler {

    initPds = (args: any) => {
        var request = new Request(args);
        
        return new Promise((resolve: Function, reject: Function) => {            
            var sovrinUtils = new SovrinUtils();
            //need to check if this is required as you should have your security keys because you have a did
            // if(!request.hasAuthMethod()) {                
            //     var wallet = cryptoUtils.generateWalletAndKeys();
            //     var authMethod = [{
            //         type: "ECDSA",
            //         public_key: wallet.publickKey,
            //         secret_key: wallet.privateKey 
            //     }]
            //     request.authMethod = authMethod;
            //   }
            var mnemonic = sovrinUtils.generateBip39Mnemonic();
            var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
            request.did = String("did:sovrin:" + sovrinWallet.did);
            //pds initial configuration...use this to determine what  
            config.createConfig(request);
            //pds capabilities...need to expand and understand how this is going to be used
            console.log("CAPABILITIESW IS  " + JSON.stringify(request.capabilities));
            capabilities.createCapability(request.requestType, request.capabilities);
            
            //need to validate the request...
            var signedpayload = sovrinUtils.signDocument(sovrinWallet, request.payload);
            //var signedpayload = cryptoUtils.signECDSA(request.payload, request.authMethod[0].secret_key);
            // request.signature.type = request.authMethod[0].type;
            // request.signature.signature = signedpayload;
            // request.signature.publicKey = request.authMethod[0].public_key;
            request.signature = signedpayload;
            //request.verifySignature();

            //log the transactoin to the transaction log
            transactionLog.createTransaction(request.payload, 
                request.signature.type, 
                request.signature.signatureValue,
                sovrinWallet.encryptionPublicKey);            
            //respond
            resolve({
                    did: request.did,
                    signatureType: request.signature.type,
                    seed: mnemonic
                    })    
        });
    }

}