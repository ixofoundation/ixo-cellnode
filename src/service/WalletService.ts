import { EventEmitter } from 'events';
import { IWalletModel, Wallet } from '../model/project/Wallet';
import { IWallet } from '../model/project/IWallet';
import { DocumentQuery } from 'mongoose';

declare var Promise: any;

export class WalletService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createWallet(did: String, signKey: String, verifyKey: String, emit = true): Promise<IWalletModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Wallet.create(
        {
          "did": did,
          "signKey": signKey,
          "verifyKey": verifyKey
                            
        }, function (error: Error, newTransaction: IWalletModel) {
          if (error) {
            console.log("Error is " + error);
            reject(error);
          } else {
            resolve(newTransaction);
          }
        });
    });
  }

  getLatestWallet(): Promise<IWalletModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      resolve (Wallet.findOne().sort({$natural:-1}));
    });
  }

  getWallet(projectDid: string): Promise<IWalletModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      resolve (Wallet.findOne({
        did: projectDid
      }));
    });
  }
}

export default new WalletService();