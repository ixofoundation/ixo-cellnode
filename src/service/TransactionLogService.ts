import { EventEmitter } from 'events';
import { ITransactionModel, Transaction } from '../model/Transaction';
import { ITransaction } from '../model/ITransaction';
import { DocumentQuery } from 'mongoose';

declare var Promise: any;

export class TransactionLogService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createTransaction(data: String, signatureType: String, signature: String, publicKey: String, emit = true): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Transaction.create(
        {
          "data": data,
          "signatureType": signatureType,
          "signature": signature,
          "publicKey": publicKey
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

  findTransaction(): any {
    console.log("query transaction log")
    return Transaction.find();
  }

  // find = (criteria: any) => {
  //   return Transaction.find(criteria)
  //   .sort('-created')
  //   .exec();
  // }

}

export default new TransactionLogService();