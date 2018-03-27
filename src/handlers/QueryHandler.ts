import { Request } from "../handlers/Request";
import { Config, IConfigModel, ConfigSchema } from '../model/Config';
import transactionLog from '../service/TransactionLogService';
import config from '../service/ConfigurationService'
import capabilities from '../service/CapabilitiesService'

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
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(config.findConfig())    
        });
    }

    queryCapabilities = (args: any) => {
        console.log("find all capabilities")
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(capabilities.findCapabilities())    
        });
    }
}