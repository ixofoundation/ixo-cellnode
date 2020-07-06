import {Document, Model, model, Schema} from "mongoose";
import {IWallet} from "./IWallet";
import {createCipher, createDecipher} from 'crypto';

export interface IWalletModel extends IWallet, Document {
}

const ASYM_CYPHER = (process.env.ASYM_CYPHER || 'aes-256-cbc');
const ASYM_KEY = (process.env.ASYM_KEY || 'trustlab.tech');

function encrypt(text: string) {
  const cipher = createCipher(ASYM_CYPHER, ASYM_KEY);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(text: string) {
  if (text === null || typeof text === 'undefined') {
    return text;
  }

  const decipher = createDecipher(ASYM_CYPHER, ASYM_KEY);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

export var WalletSchema: Schema = new Schema({

  did: String,
  signKey: {
    type: String,
    get: decrypt,
    set: encrypt
  },
  verifyKey: String

}, {strict: false});

WalletSchema.pre("save", function (next) {
  next();
});

export const Wallet: Model<IWalletModel> = model<IWalletModel>("Wallet", WalletSchema);
