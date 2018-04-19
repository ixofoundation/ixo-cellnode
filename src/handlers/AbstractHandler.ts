import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import transactionLog from '../service/TransactionLogService'
import {ValidationError} from "../error/ValidationError";;
import {Request} from "../handlers/Request";
import configService from '../service/ConfigurationService';
import {TemplateUtils} from '../templates/TemplateUtils';

import { Document, Schema, Model, model} from "mongoose";
import { json } from 'body-parser';
import { IConfigModel } from '../model/project/Config';
import { validateJson } from '../templates/JsonValidator';
import { ValidatorResult } from 'jsonschema';
import { RequestValidator } from '../templates/RequestValidator';
import capabilitiesService from '../service/CapabilitiesService';
import { ICapabilitiesModel } from '../model/project/Capabilities';


export abstract class AbstractHandler {

  createRequest (args: any, methodCall: string, model: Model<any>) {
      var request = new Request(args);
      var inst = this;
      return new Promise((resolve: Function, reject: Function) => {
        console.log('first verify that the payload is according to schema expected');
        configService.findConfig().then ((config: IConfigModel) => {
          config.requestType.some(function(requestType: any) {
            if(requestType.type == methodCall){
              var tu = new TemplateUtils();
              tu.getTemplate(requestType.template, request.template).then((schema: any) => {
                var validator: ValidatorResult;
                validator = validateJson(schema, args);
                if (validator.valid) {
                  console.log('next we validate the capability');
                  capabilitiesService.findCapabilities().then ((capabilities: ICapabilitiesModel) => {
                    console.log('THESE ARE OUR CAPABILITIES ' + JSON.stringify(capabilities));
                    var capValid: RequestValidator;
                    capValid = request.verifyCapability(capabilities.capability, methodCall);
                    if (capValid.valid) {
                      console.log('next we verify the signature');
                      var sigValid: RequestValidator;
                      sigValid = request.verifySignature();
                      if (sigValid.valid) {
                        console.log('write transaction to log as sig has been verified')
                        transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                          .then((transaction: ITransactionModel) => {
                              var obj = {...request.data,
                                        tx: transaction.hash,
                                        did: request.did
                                      };
                              inst.updateCapabilities(obj, methodCall);                              
                              resolve(model.create(obj));
                          });
                      } else {
                        reject(new ValidationError(sigValid.errors[0]));
                      }                  
                    } else {
                      console.log('CAPABILITY FAILED');
                      reject(new ValidationError('Capability failed'));
                    }
                  }); 
                } else {
                  reject(new ValidationError(validator.errors[0].message));
                };
              });
            }
            return requestType.type === methodCall;
          })        
        });
      });
    }

    saveCapabilities(did: string, requestType: string) {
      capabilitiesService.addCapabilities(did, requestType);
    }

    abstract updateCapabilities(obj: any, methodCall: string) :void;

}