import transactionLog from '../service/TransactionLogService';
import config from '../service/ConfigurationService';
import capabilities from '../service/CapabilitiesService';
import { Request } from "../handlers/Request";

declare var Promise: any;

export class QueryHandler {

    queryTransactions = (args: any) => {
        console.log("find all transactions")
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(transactionLog.findTransaction())    
        });
    }

    queryConfigs = (args: any) => {
        console.log("find all configurations")
        var request = new Request(args);
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(config.findConfigForDid(request.did))    
        });
    }

    queryCapabilities = (args: any) => {
        console.log("find all capabilities")
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(capabilities.findCapabilities())    
        });
    }
}