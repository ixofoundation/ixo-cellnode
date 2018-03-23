import { Request } from "../handlers/Request";
import { Config, IConfigModel, ConfigSchema } from '../model/Config';
import transactionLog from '../service/TransactionLogService'

declare var Promise: any;

export class QueryHandler {

    // queryPds = (args: any) => {
    //     var request = new Request(args);
    //     console.log("find all transactions")
    //     return new Promise((resolve: Function, reject: Function) => { 
    //         //console.log("find all transactions")
    //         resolve(transactionLog.findTransaction())    
    //     });
    // }

    queryPds = (args: any) => {
        var request = new Request(args);
        console.log("query PDS")
        return this.find({});
      }

      find = (criteria: any) => {
        return Config.find(criteria)
        .sort('-created')
        .exec();
    }
}