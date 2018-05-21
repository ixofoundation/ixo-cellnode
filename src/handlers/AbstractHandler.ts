import { Document, Schema, Model, model } from "mongoose";
import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import { ICapabilitiesModel } from '../model/project/Capabilities';

import transactionService from '../service/TransactionLogService';
import capabilitiesService from '../service/CapabilitiesService';
import walletService from '../service/WalletService';

import { RequestValidator } from '../templates/RequestValidator';
import { validateJson } from '../templates/JsonValidator';
import { ValidatorResult } from 'jsonschema';
import { ValidationError } from '../error/ValidationError';
import { TransactionError } from '../error/TransactionError';

import { Request } from "../handlers/Request";
import TemplateUtils from '../templates/TemplateUtils';
import { SovrinUtils } from '../crypto/SovrinUtils';
import { json } from 'body-parser';
import mq from '../MessageQ';
import { IWalletModel } from "../model/project/Wallet";


export abstract class AbstractHandler {

  public createTransaction(args: any, capability: string, model: Model<any>, checkIfExist?: Function) {
    
    var inst = this;
    var request = new Request(args);
    return new Promise((resolve: Function, reject: Function) => {
      capabilitiesService.findCapabilities()
        .then((result: ICapabilitiesModel) => {
          var capabilityMap: any;
          result.capabilities.forEach(element => {
            if (element.capability == capability) {
              capabilityMap = {
                capability: element.capability,
                template: element.template,
                allow: element.allow
              }
            }
          })
          return capabilityMap;
        })
        .then((capabilityMap: any) => {
          console.log(new Date().getUTCMilliseconds() + ' have capability ' + capabilityMap.capability);
          TemplateUtils.getTemplate(capabilityMap.template, request.template)
            .then((schema: any) => {
              console.log(new Date().getUTCMilliseconds() + ' template to validate ' + JSON.stringify(schema));
              var validator: ValidatorResult;
              validator = validateJson(schema, args);
              if (validator.valid) {
                console.log(new Date().getUTCMilliseconds() + ' validate the capability');
                var capValid: RequestValidator;
                capValid = request.verifyCapability(capabilityMap.allow);
                if (capValid.valid) {
                  console.log(new Date().getUTCMilliseconds() + ' verify the signature');
                  request.verifySignature()
                    .then((sigValid: RequestValidator) => {
                      if (sigValid.valid) {
                        console.log(new Date().getUTCMilliseconds() + ' signature verified');
                        if (checkIfExist) {
                          checkIfExist(request)
                            .then((found: boolean) => {
                              if (found) {
                                reject(new TransactionError('Record out of date, please refresh data'));
                              } else {
                                console.log(new Date().getUTCMilliseconds() + ' write transaction to log')
                                transactionService.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                                  .then((transaction: ITransactionModel) => {
                                    var obj = {
                                      ...request.data,
                                      tx: transaction.hash,
                                      version: request.version + 1
                                    };
                                    console.log(new Date().getUTCMilliseconds() + ' updating the capabilities');
                                    this.updateCapabilities(request.signature.creator, capabilityMap.capability);
                                    console.log(new Date().getUTCMilliseconds() + ' commit to Elysian');
                                    resolve(model.create(obj));
                                    console.log(new Date().getUTCMilliseconds() + ' publish to blockchain');
                                    this.msgToPublish(obj, capabilityMap.capability)
                                      .then((msg: any) => {
                                        mq.publish(msg);
                                      });
                                      console.log(new Date().getUTCMilliseconds() + ' transaction completed successfully');
                                  });
                              }
                            })
                        } else {
                          console.log(new Date().getUTCMilliseconds() + ' write transaction to log');
                          transactionService.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                            .then((transaction: ITransactionModel) => {
                              var obj = {
                                ...request.data,
                                tx: transaction.hash
                              };
                              console.log(new Date().getUTCMilliseconds() + ' updating the capabilities');
                              inst.updateCapabilities(request.signature.creator, capabilityMap.capability);
                              console.log(new Date().getUTCMilliseconds() + ' commit to Elysian');
                              resolve(model.create(obj));
                              console.log(new Date().getUTCMilliseconds() + ' publish to blockchain');
                              this.msgToPublish(obj, capabilityMap.capability)
                                .then((msg: any) => {
                                  mq.publish(msg);
                                });
                                console.log(new Date().getUTCMilliseconds() + ' transaction completed successfully');
                            });
                        }
                      } else {
                        reject(new ValidationError(sigValid.errors[0]));
                      }
                    })
                  mq.subscribe();
                } else {
                  reject(new ValidationError(capValid.errors[0]));
                }
              } else {
                reject(new ValidationError(validator.errors[0].message));
              };
            });
        });
    });
  }


  public queryTransaction(args: any, capability: string, query: Function) {
    var inst = this;
    var request = new Request(args);
    return new Promise((resolve: Function, reject: Function) => {
      capabilitiesService.findCapabilities()
        .then((result: ICapabilitiesModel) => {
          var capabilityMap: any;
          result.capabilities.forEach(element => {
            if (element.capability == capability) {
              capabilityMap = {
                capability: element.capability,
                template: element.template,
                allow: element.allow
              }
            }
          })
          return capabilityMap;
        })
        .then((capabilityMap: any) => {
          console.log('have capability ' + capabilityMap.capability);
          TemplateUtils.getTemplate(capabilityMap.template, request.template)
            .then((schema: any) => {
              var validator: ValidatorResult;
              validator = validateJson(schema, args);
              if (validator.valid) {
                console.log('validate the capability');
                var capValid: RequestValidator;
                capValid = request.verifyCapability(capabilityMap.allow);
                if (capValid.valid) {
                  console.log('verify the signature');
                  request.verifySignature()
                    .then((sigValid: RequestValidator) => {
                      if (sigValid.valid) {
                        console.log('query Elysian');
                        resolve(query(request.data));
                      } else {
                        reject(new ValidationError(sigValid.errors[0]));
                      }
                    })
                } else {
                  reject(new ValidationError(capValid.errors[0]));
                }
              } else {
                reject(new ValidationError(validator.errors[0].message));
              };
            });
        });
    });
  }


  saveCapabilities(did: string, requestType: string) {
    capabilitiesService.addCapabilities(did, requestType);
  }

  generateProjectWallet(): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      var fileSystem = require('fs');
      var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));

      var sovrinUtils = new SovrinUtils();
      var mnemonic = sovrinUtils.generateBip39Mnemonic();
      var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
      var did = String("did:ixo:" + sovrinWallet.did);
      console.log(new Date().getUTCMilliseconds() + ' project wallet created');
      walletService.createWallet(sovrinWallet.did, sovrinWallet.secret.signKey, sovrinWallet.verifyKey);
    });
  }

  abstract updateCapabilities(obj: any, methodCall: string): void;

  abstract msgToPublish(obj: any, methodCall: string): any;

  signMessageForBlockchain(msgToSign: any, methodName: string) {
    return new Promise((resolve: Function, reject: Function) => {
      walletService.getWallet()
        .then((wallet: IWalletModel) => {
          var sovrinUtils = new SovrinUtils();
          var signedMsg = {
            method: methodName,
            data: msgToSign,
            signature: sovrinUtils.signDocument(wallet.signKey, wallet.verifyKey, wallet.did, msgToSign)
          }
          resolve(signedMsg);
        });
    });
  }
}