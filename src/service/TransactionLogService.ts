import { EventEmitter } from 'events';
import { ITransactionModel, Transaction } from '../model/Transaction';

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

  findPreviousTransaction(): Promise<ITransactionModel[]> {
    return new Promise(function (resolve: Function, reject: Function) {
      resolve(Transaction.find().limit(1).sort({ $natural: -1 }));
    });
  }

  findTransaction(): any {
    return Transaction.find();
  }


  updateTransactionLogForHash(txHash: String, blockHash: string, blockHeight: string, blockResponseCode: number): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Transaction.updateOne(
        { hash: txHash },
        { $set: { blockHash: blockHash, blockHeight: blockHeight, blockResponseCode: blockResponseCode } },
        function (error: Error, result: ITransactionModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }

  updateTransactionLogForError(txHash: String, blockError: string): Promise<ITransactionModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Transaction.updateOne(
        { hash: txHash },
        { $set: { blockError: blockError } },
        function (error: Error, result: ITransactionModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }
}

export default new TransactionLogService();