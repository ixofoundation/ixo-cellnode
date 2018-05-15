import { Document, Schema, Model, model } from "mongoose";
import { IWallet } from "./IWallet";

export interface IWalletModel extends IWallet, Document { }

export var WalletSchema: Schema = new Schema({

    did: String,
    signKey: String,
    verifykey: String

}, { strict: false });

WalletSchema.pre("save", function (next) {
    next();
});

export const Wallet: Model<IWalletModel> = model<IWalletModel>("Wallet", WalletSchema);