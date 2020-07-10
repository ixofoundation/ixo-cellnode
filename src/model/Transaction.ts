import {Document, Model, model, Schema} from "mongoose";
import {ITransaction} from "./ITransaction";
import transactionLog from '../service/TransactionLogService'

import CryptoUtils from '../crypto/Utils'

const cryptoUtils = new CryptoUtils();

export interface ITransactionModel extends ITransaction, Document {
}


export var TransactionSchema: Schema = new Schema({
  projectDid: String,
  data: String,
  hash: {
    type: String,
    index: true,
    unique: true // Unique index.
  },
  nonce: String,
  // type: String,
  signatureType: String,
  signatureValue: String,
  // publicKey: String,
  timestamp: Date,
  capability: String,
  blockHeight: String,
  blockHash: String,
  blockResponseCode: Number,
  blockError: String
});

TransactionSchema.pre('save', function (next) {
  const inst = this as ITransactionModel;
  transactionLog.findPreviousTransaction()
    .then((prevTxn: ITransactionModel[]) => {
      const prevHash = (prevTxn[0] ? prevTxn[0].hash : '');
      inst.nonce = cryptoUtils.createNonce();
      inst.hash = cryptoUtils.hash(prevHash + inst.nonce.toString() + inst.data);
      inst.timestamp = new Date();
      next();
    });
});

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>("Transaction", TransactionSchema);
