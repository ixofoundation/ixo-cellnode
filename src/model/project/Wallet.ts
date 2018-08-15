import { Document, Schema, Model, model } from "mongoose";
import { IWallet } from "./IWallet";
import { createCipher, createDecipher } from 'crypto';

export interface IWalletModel extends IWallet, Document { }

var crypto = require('crypto');

function encrypt(text: string) {
    var cipher = createCipher('aes-256-cbc', "trustlab.tech");
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text: string) {
    if (text === null || typeof text === 'undefined') { return text; };
    var decipher = createDecipher('aes-256-cbc', "trustlab.tech");
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

export const Wallet: Model<IWalletModel> = model<IWalletModel>("Wallet", WalletSchema);

WalletSchema.pre("save", function (next) {
    next();
});