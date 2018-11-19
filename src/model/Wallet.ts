import { Document, Schema, Model, model } from "mongoose";
import { IWallet } from "./IWallet";
import { createCipher, createDecipher } from 'crypto';

export interface IWalletModel extends IWallet, Document { }

const ASYM_CYPHER = (process.env.ASYM_CYPHER || 'aes-256-cbc');
const ASYM_KEY = (process.env.ASYM_KEY || 'trustlab.tech');

function encrypt(text: string) {
    var cipher = createCipher(ASYM_CYPHER, ASYM_KEY);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text: string) {
    if (text === null || typeof text === 'undefined') { return text; };
    var decipher = createDecipher(ASYM_CYPHER, ASYM_KEY);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

export var WalletSchema: Schema = new Schema({

    did: String,
    signKey: {
        type: String,
        get: decrypt, 
        set: encrypt
    },
    verifyKey: String

}, { strict: false });

WalletSchema.pre("save", function (next) {
    next();
});

export const Wallet: Model<IWalletModel> = model<IWalletModel>("Wallet", WalletSchema);