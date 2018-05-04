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
                if (!result) {
                    var fileSystem = require('fs');
                    var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
                    capabilities.createCapability(data.configuration);
                } else {
                    console.log('capabilities found ' + JSON.stringify(result));
                }
            });            
        })
    }
}

export default new InitHandler();