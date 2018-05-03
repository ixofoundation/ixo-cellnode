import { Document, Schema, Model, model} from "mongoose";
import {TransactionError} from '../../error/TransactionError';
import { ITransaction } from "./ITransaction";
import transactionLog from '../../service/TransactionLogService'

import CryptoUtils from '../../crypto/Utils'

var cryptoUtils = new CryptoUtils();

export interface ITransactionModel extends ITransaction, Document {
  validateTransaction(): boolean;
}

export var TransactionSchema: Schema = new Schema({
  data: String,
  hash: {
    type: String,
    index: true,
    unique: true // Unique index. 
  },
  nonce: String,
  type: String,
  signatureType: String,
  signature: String,
  publicKey: String,
  timestamp: Date
 });

TransactionSchema.pre("save", function(this: ITransaction, next) {
 //TODO get prev transaction hash and add to new hash
  this.nonce = cryptoUtils.createNonce();
  this.hash = cryptoUtils.hash(this.nonce.toString() + this.type + this.data);
  this.timestamp = new Date()
  next();
});


export const Transaction: Model<ITransactionModel> = model<ITransactionModel>("Transaction", TransactionSchema);
