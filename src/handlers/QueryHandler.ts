import transactionLog from '../service/TransactionLogService';
import capabilities from '../service/CapabilitiesService';
import { Request } from "../handlers/Request";
import { ITransactionModel, Transaction } from '../model/project/Transaction';

declare var Promise: any;

export class QueryHandler {

    queryTransactions = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(transactionLog.findTransaction())    
        });
    }

    queryCapabilities = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => { 
            resolve(capabilities.findCapabilities())    
        });
    }
}