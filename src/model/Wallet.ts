import {Document, Model, model, Schema} from "mongoose";
import {IWallet} from "./IWallet";
import {createCipheriv, createDecipheriv, randomBytes} from 'crypto';

const IV_LENGTH = 16;

export interface IWalletModel extends IWallet, Document {
}

const ASYM_CYPHER = (process.env.ASYM_CYPHER || 'aes-256-cbc');
const ASYM_KEY = (process.env.ASYM_KEY || 'trustlab.tech');

function encrypt(text: string) {
  // Source: https://www.debugcn.com/en/article/38676742.html
  let iv = randomBytes(IV_LENGTH);
  let cipher = createCipheriv(ASYM_CYPHER, Buffer.from(ASYM_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string) {
  // Source: https://www.debugcn.com/en/article/38676742.html
  let textParts = text.split(':');
  let iv = Buffer.from(textParts[0], 'hex');
  let encryptedText = Buffer.from(textParts.slice(1).join(':'), 'hex');
  let decipher = createDecipheriv(ASYM_CYPHER, Buffer.from(ASYM_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
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
