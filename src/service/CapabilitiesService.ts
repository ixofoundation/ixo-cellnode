import {EventEmitter}  from 'events';
import {ICapabilitiesModel, Capabilities} from '../model/Capabilities';
import {ICapabilities} from '../model/ICapabilities';

declare var Promise: any;

/*
Complete Stub of a blockchain simply here to create a transaction id
 */

export class CapabilitiesService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createCapability(did: String, capability: any, emit = true): Promise<ICapabilitiesModel>{
    return new Promise(function(resolve: Function, reject: Function){
      Capabilities.create(
        {
          "did": did, 
          "service": capability
        }, function(error: Error, newTransaction: ICapabilitiesModel){
         if(error){
           reject(error);
         }else{
           resolve(newTransaction);
         }
      });
    });
  }

}

export default new CapabilitiesService();