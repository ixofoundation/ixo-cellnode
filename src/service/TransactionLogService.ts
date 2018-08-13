import { EventEmitter } from 'events';
import { ITransactionModel, Transaction } from '../model/project/Transaction';

declare var Promise: any;

export class TransactionLogService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createTransaction(data: String, signatureType: String, signature: String, projectDid: String, emit = true): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Transaction.create(
        {
          "data": data,
          "signatureType": signatureType,
          "signatureValue": signature,
          "projectDid": projectDid
                            
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

  findPreviousTransaction(): Promise<ITransactionModel[]> {
    return new Promise(function (resolve: Function, reject: Function) {
      resolve (Transaction.find().limit(1).sort({$natural:-1}));
    });
  }

  findTransaction(): any {
    return Transaction.find();
  }
}

export default new TransactionLogService();