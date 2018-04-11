import {EventEmitter}  from 'events';
import {ICapabilitiesModel, Capabilities} from '../model/project/Capabilities';
import {ICapabilities} from '../model/project/ICapabilities';

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

  findCapabilities(): any {
    console.log("query capabilities")
    return Capabilities.find();
  }

}

export default new CapabilitiesService();