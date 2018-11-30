import { Model, connection } from "mongoose";
import { ITransactionModel } from '../model/Transaction';
import { ICapabilitiesModel } from '../model/Capabilities';

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
import mq from '../MessageQ';
import { IWalletModel } from "../model/Wallet";
import { AxiosResponse } from "axios";
import Cache from '../Cache';

import { dateTimeLogger } from '../logger/Logger';
import { BlockchainURI } from "../ixo/common/shared";
import { json } from "body-parser";

export abstract class AbstractHandler {

  public createTransaction(args: any, method: string, model: Model<any>, verifyData?: Function, projectDid?: string) {

    var request = new Request(args);

    return new Promise((resolve: Function, reject: Function) => {
      if (connection.readyState != 1) {
        throw new TransactionError('Elysian not available');
      }
      if (!request.projectDid) request.projectDid = (projectDid || "");
      capabilitiesService.findCapabilitiesForProject(request.projectDid)
        .then((result: ICapabilitiesModel) => {
          var capabilityMap: any;
          capabilityMap = result.capabilities.filter(element => element.capability == method)[0];
          console.log(dateTimeLogger() + ' have capability ' + capabilityMap.capability);
          TemplateUtils.getTemplateFromCache(capabilityMap.template, request.template)
            .then((schema: any) => {
              console.log(dateTimeLogger() + ' validate the template');
              var validator: ValidatorResult;
              validator = validateJson(schema, args);
              if (validator.valid) {
                console.log(dateTimeLogger() + ' validate the capability');
                var capValid: RequestValidator;
                capValid = request.verifyCapability(capabilityMap.allow);
                if (capValid.valid) {
                  console.log(dateTimeLogger() + ' verify the signature');
                  request.verifySignature(this.preVerifyDidSignature.bind(this), capabilityMap.validateKYC, capabilityMap.capability)
                    .then((sigValid: RequestValidator) => {
                      if (sigValid.valid) {
                        console.log(dateTimeLogger() + ' signature verified');
                        if (mq.connection != null) {
                          if (verifyData) {
                            verifyData(request)
                              .then(() => {
                                //submit information to blockchain. Poller to add to cache once it gets hash from chain
                                this.createTransactionLog(request, capabilityMap)
                                  .then((transaction: any) => {
                                    resolve(this.publishAndRespond(transaction.hash, request));
                                  });
                              })
                              .catch((error: string) => {
                                console.log(dateTimeLogger() + ' error creating transaction log ' + request.projectDid);
                                reject(new TransactionError(error));
                              })
                          } else {
                            //submit information to blockchain. Poller to add to cache once it gets hash from chain
                            this.createTransactionLog(request, capabilityMap)
                              .then((transaction: any) => {
                                resolve(this.publishAndRespond(transaction.hash, request));
                              })
                              .catch((error: string) => {
                                console.log(dateTimeLogger() + ' error creating transaction log ' + request.projectDid);
                                reject(new TransactionError(error));
                              });
                          }
                        } else {
                          console.log(dateTimeLogger() + ' mq currently unavailable');
                          reject(new TransactionError('mq currently unavailable'));
                        }
                      } else {
                        reject(new ValidationError(sigValid.errors[0]));
                      }
                    })
                    .catch((error: string) => {
                      console.log(dateTimeLogger() + ' error verifying signature ' + request.projectDid);
                      reject(new TransactionError(error));
                    });
                } else {
                  console.log(dateTimeLogger() + ' error processing capability ' + request.projectDid);
                  reject(new ValidationError(capValid.errors[0]));
                }
              } else {
                console.log(dateTimeLogger() + ' template validation failed');
                reject(new ValidationError(validator.errors[0].message));
              };
            })
            .catch((reason) => {
              console.log(dateTimeLogger() + ' template registry failed' + reason);
              reject(new TransactionError('Cannot connect to template registry'));
            });
        })
        .catch(() => {
          console.log(dateTimeLogger() + ' capabilities not found for project' + request.projectDid);
          reject(new TransactionError('Capabilities not found for project'));
        });
    });
  }

  public queryTransaction(args: any, method: string, query: Function) {
    var request = new Request(args);
    return new Promise((resolve: Function, reject: Function) => {
      capabilitiesService.findCapabilitiesForProject(request.projectDid)
        .then((result: ICapabilitiesModel) => {
          var capabilityMap: any;
          capabilityMap = result.capabilities.filter(element => element.capability == method)[0];
          console.log(dateTimeLogger() + ' have capability ' + capabilityMap.capability);
          TemplateUtils.getTemplateFromCache(capabilityMap.template, request.template)
            .then((schema: any) => {
              console.log(dateTimeLogger() + ' validate the template');
              var validator: ValidatorResult;
              validator = validateJson(schema, args);
              if (validator.valid) {
                console.log(dateTimeLogger() + ' validate the capability');
                var capValid: RequestValidator;
                capValid = request.verifyCapability(capabilityMap.allow);
                if (capValid.valid) {
                  console.log(dateTimeLogger() + ' verify the signature');
                  request.verifySignature(this.preVerifyDidSignature.bind(this), capabilityMap.validateKYC, capabilityMap.capability)
                    .then((sigValid: RequestValidator) => {
                      if (sigValid.valid) {
                        console.log(dateTimeLogger() + ' query Elysian');
                        resolve(query(request.data));
                      } else {
                        reject(new ValidationError(sigValid.errors[0]));
                      }
                      console.log(dateTimeLogger() + ' transaction completed successfully');
                    })
                } else {
                  reject(new ValidationError(capValid.errors[0]));
                }
              } else {
                reject(new ValidationError(validator.errors[0].message));
              };
            })
            .catch((reason) => {
              console.log(dateTimeLogger() + ' template registry failed' + reason);
              reject(new TransactionError('Cannot connect to template registry'));
            });
        })
        .catch(() => {
          console.log(dateTimeLogger() + ' capabilities not found for project ' + request.projectDid);
          reject(new TransactionError('Capabilities not found for project'));
        });
    });
  }

  private publishAndRespond(hash: string, request: Request) {
    return new Promise((resolve: Function, reject: Function) => {
      this.msgToPublish(hash, request)
        .then((msg: any) => {
          console.log(dateTimeLogger() + ' message to be published ' + msg.msgType);
          var cacheMsg = {
            data: msg,
            request: request,
            txHash: hash
          }
          mq.publish(cacheMsg);
        });
      resolve(hash);
    });
  }

  private createTransactionLog(request: Request, capabilityMap: any) {
    return new Promise((resolve: Function, reject: Function) => {
      transactionService.createTransaction(request.body, request.signature.type,
        request.signature.signatureValue, request.projectDid, capabilityMap.capability)
        .then((transaction: ITransactionModel) => {
          console.log(dateTimeLogger() + ' write transaction to log ' + transaction.hash)
          resolve(transaction);
        });
    });
  }

  preVerifyDidSignature = (didResponse: AxiosResponse, data: Request, capability: string): boolean => {
    return true;
  }

  addCapabilities(projectDid: string, did: string[], requestType: string) {
    capabilitiesService.addCapabilities(projectDid, did, requestType);
  }

  removeCapabilities(projectDid: string, did: string, requestType: string) {
    capabilitiesService.removeCapabilities(projectDid, did, requestType);
  }

  generateProjectWallet(): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      if (connection.readyState != 1) {
        throw new TransactionError('Elysian not available');
      }
      var sovrinUtils = new SovrinUtils();
      var mnemonic = sovrinUtils.generateBip39Mnemonic();
      var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
      var did = String("did:ixo:" + sovrinWallet.did);
      walletService.createWallet(did, sovrinWallet.secret.signKey, sovrinWallet.verifyKey)
        .then((wallet: IWalletModel) => {
          Cache.set(wallet.did, { publicKey: wallet.verifyKey });
          console.log(dateTimeLogger() + ' project wallet created');
          resolve(wallet.did);
        });
    });
  }

  abstract updateCapabilities = (request: Request): void => { };

  abstract msgToPublish = (hash: any, request: Request): any => { };

  messageForBlockchain(msgToSign: any, projectDid: string, msgType?: string, blockchainUri?: string) {
    return new Promise((resolve: Function, reject: Function) => {
      walletService.getWallet(projectDid)
        .then((wallet: IWalletModel) => {
          Cache.set(wallet.did, { publicKey: wallet.verifyKey });
          var sovrinUtils = new SovrinUtils();
          var signedMsg = {
            ...msgToSign,
            signatures: [{
              signatureValue: sovrinUtils.signDocumentNoEncoding(wallet.signKey, wallet.verifyKey, wallet.did, msgToSign.payload[0].value),
              created: new Date()
            }]
          }
          let message = {
            msgType: (msgType || 'blockchain'),
            projectDid: wallet.did,
            uri: (blockchainUri || BlockchainURI.sync),
            data: Buffer.from(JSON.stringify(signedMsg)).toString('hex')
          }
          resolve(message);
        });
    });
  }

  selfSignMessage(msgToSign: any, projectDid: string) {
    return new Promise((resolve: Function, reject: Function) => {
      walletService.getWallet(projectDid)
        .then((wallet: IWalletModel) => {
          Cache.set(wallet.did, { publicKey: wallet.verifyKey });
          var sovrinUtils = new SovrinUtils();
          resolve(sovrinUtils.signDocumentNoEncoding(wallet.signKey, wallet.verifyKey, wallet.did, msgToSign));
        })
        .catch(() => {
          reject(new TransactionError('Exception signing request with did ' + projectDid));
        });
    });
  }

  async publishMessageToQueue(message: any) {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(dateTimeLogger() + ' message to be published ' + message.data.msgType);
      resolve(mq.publish(message));
    });
  }

  subscribeToMessageQueue() {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(mq.subscribe());
    });
  }
}