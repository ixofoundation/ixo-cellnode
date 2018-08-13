import { EventEmitter } from 'events';
import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import { DocumentQuery } from 'mongoose';

declare var Promise: any;

export class TransactionLogService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createTransaction(data: String, signatureType: String, signature: String, projectDid: String, capability: string, emit = true): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Transaction.create(
        {
          "data": data,
          "signatureType": signatureType,
          "signatureValue": signature,
          "projectDid": projectDid,
          "capability": capability
                            
        }, function (error: Error, newTransaction: ITransactionModel) {
          if (error) {
            console.log("Error is " + error);
            reject(error);
          } else {
            resolve(newTransaction);
          }
        });
    });
  }

  findLatestTransaction(projectDid: String): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      resolve (Transaction.findOne({projectDid: projectDid}).sort({$natural:-1}));
    });
  }

  findTransaction(): any {
    return Transaction.find();
  }
}

export default new TransactionLogService();