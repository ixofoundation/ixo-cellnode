import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import transactionLog from '../service/TransactionLogService'
import { ValidationError } from "../error/ValidationError";;
import { Request } from "../handlers/Request";
import TemplateUtils from '../templates/TemplateUtils';

import { Document, Schema, Model, model } from "mongoose";
import { json } from 'body-parser';
import { validateJson } from '../templates/JsonValidator';
import { ValidatorResult } from 'jsonschema';
import { RequestValidator } from '../templates/RequestValidator';
import capabilitiesService from '../service/CapabilitiesService';
import { ICapabilitiesModel } from '../model/project/Capabilities';


export abstract class AbstractHandler {

  createRequest(args: any, capability: string, model: Model<any>) {
    var request = new Request(args);
    var inst = this;


    return new Promise((resolve: Function, reject: Function) => {
      capabilitiesService.findCapabilities()
        .then((capabilities: ICapabilitiesModel) => {
          var result: any;
          capabilities.capabilities.forEach(element => {
            if (element.capability == capability) {
              result = {
                capability: element.capability,
                template: element.template,
                allow: element.allow
              }
            }        
          })
          return result;
        })
        .then((capabilityMap: any) => {
          console.log('WE GOT A MAP OF CAPABILITIES ' + capabilityMap.capability + capabilityMap.template);
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
                    console.log('write transaction to log as sig has been verified')
                    transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                      .then((transaction: ITransactionModel) => {
                        var obj = {
                          ...request.data,
                          tx: transaction.hash,
                          did: request.did
                        };
                        inst.updateCapabilities(obj, capabilityMap.capability);
                        resolve(model.create(obj));
                      });
                  } else {
                    reject(new ValidationError(sigValid.errors[0]));
                  }
                } else {
                  console.log('CAPABILITY FAILED');
                  reject(new ValidationError('Capability failed'));
                }
              } else {
                reject(new ValidationError(validator.errors[0].message));
              };
            });
      });
    });





    // return new Promise((resolve: Function, reject: Function) => {
    //   console.log('first verify that the payload is according to schema expected');
    //   capabilitiesService.findCapability(capability).then((capability: ICapabilitiesModel) => {
    //     if (capability != null) {
    //       TemplateUtils.getTemplate(capability.capabilities[0].template, request.template).then((schema: any) => {
    //         var validator: ValidatorResult;
    //         validator = validateJson(schema, args);
    //         if (validator.valid) {
    //           console.log('next we validate the capability');
    //           var capValid: RequestValidator;
    //           capValid = request.verifyCapability(capability);
    //           if (capValid.valid) {
    //             console.log('next we verify the signature');
    //             var sigValid: RequestValidator;
    //             sigValid = request.verifySignature();
    //             if (sigValid.valid) {
    //               console.log('write transaction to log as sig has been verified')
    //               transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
    //                 .then((transaction: ITransactionModel) => {
    //                   var obj = {
    //                     ...request.data,
    //                     tx: transaction.hash,
    //                     did: request.did
    //                   };
    //                   inst.updateCapabilities(obj, capability);
    //                   resolve(model.create(obj));
    //                 });
    //             } else {
    //               reject(new ValidationError(sigValid.errors[0]));
    //             }
    //           } else {
    //             console.log('CAPABILITY FAILED');
    //             reject(new ValidationError('Capability failed'));
    //           }
    //         } else {
    //           reject(new ValidationError(validator.errors[0].message));
    //         };
    //       });
    //     } else {
    //       reject(new ValidationError('No Capability found'));
    //     }
    //   });
    // });

  }

  saveCapabilities(did: string, requestType: string) {
    capabilitiesService.addCapabilities(did, requestType);
  }

  abstract updateCapabilities(obj: any, methodCall: string): void;

}