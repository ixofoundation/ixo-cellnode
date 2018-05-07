import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import transactionLog from '../service/TransactionLogService';
import walletService from '../service/WalletService';
import { ValidationError } from '../error/ValidationError';
import { TransactionError } from '../error/TransactionError';
import { Request } from "../handlers/Request";
import TemplateUtils from '../templates/TemplateUtils';

import { Document, Schema, Model, model } from "mongoose";
import { json } from 'body-parser';
import { validateJson } from '../templates/JsonValidator';
import { ValidatorResult } from 'jsonschema';
import { RequestValidator } from '../templates/RequestValidator';
import capabilitiesService from '../service/CapabilitiesService';
import { ICapabilitiesModel } from '../model/project/Capabilities';
import { QueryHandler } from './QueryHandler';
import mq from '../MessageQ';


export abstract class AbstractHandler {

  createRequest(args: any, capability: string, model: Model<any>, checkVersion?: Function) {
    var request = new Request(args);
    var inst = this;

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
          console.log('WE GOT A MAP OF CAPABILITIES ' + capabilityMap.capability);
          TemplateUtils.getTemplate(capabilityMap.template, request.template)
            .then((schema: any) => {
              var validator: ValidatorResult;
              validator = validateJson(schema, args);
              if (validator.valid) {
                console.log('next we validate the capability');
                var capValid: RequestValidator;
                capValid = request.verifyCapability(capabilityMap.allow);
                if (capValid.valid) {
                  console.log('next we verify the signature');
                  var sigValid: RequestValidator;
                  sigValid = request.verifySignature();
                  if (sigValid.valid) {
                    //want to check if record has already been added
                    if (checkVersion) {
                      checkVersion(request).then((found: boolean) => {
                        if (found){
                          reject(new TransactionError('Record out of date, please refresh data'));
                        } else {
                          console.log('write transaction to log as sig and record version has been verified')
                          transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                            .then((transaction: ITransactionModel) => {
                              var obj = {
                                ...request.data,
                                tx: transaction.hash,
                                version: request.version + 1
                              };
                              inst.updateCapabilities(request.signature.creator, capabilityMap.capability);
                              mq.publish(obj);
                              resolve(model.create(obj));

                            });                          
                        }
                      })                    
                    } else {                    
                      console.log('write transaction to log as sig has been verified')
                      transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                        .then((transaction: ITransactionModel) => {
                          var obj = {
                            ...request.data,
                            tx: transaction.hash
                          };
                          inst.updateCapabilities(request.signature.creator, capabilityMap.capability);
                          mq.publish(obj);
                          resolve(model.create(obj));
                        });
                    }
                  } else {
                    reject(new ValidationError(sigValid.errors[0]));
                  }
                } else {
                  console.log('CAPABILITY FAILED');
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

  abstract updateCapabilities(obj: any, methodCall: string): void;

  saveWallet(did: string, signKey: string, verifyKey: string) {
    walletService.createWallet(did, signKey, verifyKey);
  }

}