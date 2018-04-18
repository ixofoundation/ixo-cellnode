import {EventEmitter}  from 'events';
import {ICapabilitiesModel, Capabilities, CapabilitiesSchema} from '../model/project/Capabilities';
import {ICapabilities} from '../model/project/ICapabilities';
import { DocumentQuery } from 'mongoose';

declare var Promise: any;

/*
Complete Stub of a blockchain simply here to create a transaction id
 */

export class CapabilitiesService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createCapability(capability: any, emit = true): Promise<ICapabilitiesModel>{
    return new Promise(function(resolve: Function, reject: Function){
      Capabilities.create(
        {
          "capability": capability
        }, function(error: Error, newTransaction: ICapabilitiesModel){
         if(error){
           reject(error);
         }else{
           resolve(newTransaction);
         }
      });
    });
  }

  findCapabilities(): Promise<ICapabilitiesModel> {
    console.log("query capabilities")
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.findOne(function (error: Error, capabilities: ICapabilitiesModel)  {
        if (error) {
          console.log("Error is " + error);
          reject(error);
        } else {
          resolve(capabilities);
        }
      });
    });
  }
}

export default new CapabilitiesService();