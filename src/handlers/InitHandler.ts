import { Request } from "../handlers/Request";
import { create } from "domain";
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
import {SovrinUtils} from '../crypto/SovrinUtils';
import { ICapabilitiesModel } from "../model/project/Capabilities";
import { TransactionError } from "../error/TransactionError";
import { ITransactionModel } from "../model/project/Transaction";


declare var Promise: any;


export class InitHandler {

    initialise() {
        return new Promise((resolve: Function, reject: Function) => {
            capabilities.findCapabilities()
            .then((result: ICapabilitiesModel) => {
                console.log('INITAIL CAPABILITIES FOUND ' + JSON.stringify(result));
                if (!result) {
                    var fileSystem = require('fs');
                    var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
                    
                    var sovrinUtils = new SovrinUtils();
                    var mnemonic = sovrinUtils.generateBip39Mnemonic();
                    var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
                    var did = String("did:ixo:" + sovrinWallet.did);
        
                    capabilities.createCapability(data.configuration).then((capability: ICapabilitiesModel) => {
                        capabilities.addCapabilities('did:sov:*', 'CreateProject')
                        .then((capability: ICapabilitiesModel) => {
                            resolve({
                                did: did,
                                seed: mnemonic
                            })
                        });             
                    })
                }
            });            
        })
    }
}

export default new InitHandler();