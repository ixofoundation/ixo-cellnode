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
import { json } from 'body-parser';
import mq from '../MessageQ';


export abstract class AbstractHandler {

  public createRequest(args: any, capability: string, model: Model<any>, checkIfExist?: Function) {
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
                  var sigValid: RequestValidator;
                  sigValid = request.verifySignature();
                  if (sigValid.valid) {
                    //want to check if record has already been added
                    if (checkIfExist) {
                      checkIfExist(request)
                        .then((found: boolean) => {
                          if (found) {
                            reject(new TransactionError('Record out of date, please refresh data'));
                          } else {
                            console.log('write transaction to log')
                            transactionService.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                              .then((transaction: ITransactionModel) => {
                                var obj = {
                                  ...request.data,
                                  tx: transaction.hash,
                                  version: request.version + 1
                                };
                                console.log('updating the capabilities');
                                inst.updateCapabilities(request.signature.creator, capabilityMap.capability);
                                console.log('publish to blockchain');
                                mq.publish(obj);
                                console.log('commit to PDS');
                                resolve(model.create(obj));
                              });
                          }
                        })
                    } else {
                      console.log('write transaction to log')
                      transactionService.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                        .then((transaction: ITransactionModel) => {
                          var obj = {
                            ...request.data,
                            tx: transaction.hash
                          };
                          console.log('updating the capabilities')
                          inst.updateCapabilities(request.signature.creator, capabilityMap.capability);
                          console.log('publish to blockchain');
                          mq.publish(obj);
                          console.log('commit to PDS');
                          resolve(model.create(obj));
                        });
                    }
                  } else {
                    reject(new ValidationError(sigValid.errors[0]));
                  }
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

  saveWallet(did: string, signKey: string, verifyKey: string) {
    walletService.createWallet(did, signKey, verifyKey);
  }

  abstract updateCapabilities(obj: any, methodCall: string): void;

}