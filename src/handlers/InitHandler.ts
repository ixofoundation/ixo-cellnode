import { Request } from "../handlers/Request";
import { create } from "domain";
import transactionLog from '../service/TransactionLogService'
import capabilities from "../service/CapabilitiesService";
import { SovrinUtils } from '../crypto/SovrinUtils';
import { ICapabilitiesModel } from "../model/project/Capabilities";
import { TransactionError } from "../error/TransactionError";
import { ITransactionModel } from "../model/project/Transaction";


declare var Promise: any;


export class InitHandler {

    initialise(did: string) {
        return new Promise((resolve: Function, reject: Function) => {
            var fileSystem = require('fs');
            var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
            resolve(capabilities.createCapability(did, data.configuration));
        })
    }
}

export default new InitHandler();