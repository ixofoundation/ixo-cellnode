import { EventEmitter } from 'events';
import { IConfigModel, Config } from '../model/Config';
import { IConfig } from '../model/IConfig';
import { DocumentQuery } from 'mongoose';

declare var Promise: any;

export class ConfigurationService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createConfig(data: any, emit = true): Promise<IConfigModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Config.create(
        data, function (error: Error, newTransaction: IConfigModel) {
          if (error) {
            console.log("Error is " + error);
            reject(error);
          } else {
            resolve(newTransaction);
          }
        });
    });
  }

  findConfig(): any {
    console.log("query configs")
    return Config.findOne();
  }
  
}

export default new ConfigurationService();