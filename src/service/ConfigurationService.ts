import { EventEmitter } from 'events';
import { IConfigModel, Config } from '../model/project/Config';
import { IConfig } from '../model/project/IConfig';
import { DocumentQuery, Model } from 'mongoose';

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

  findConfigForDid(did: string): Promise<IConfigModel> {
    console.log("query configs")
    return new Promise(function (resolve: Function, reject: Function) {
      Config.findOne({"did": did}, function (error: Error, config: IConfigModel)  {
        if (error) {
          console.log("Error is " + error);
          reject(null);
        } else {
          resolve(config);
        }
      });
    });
  }

  findConfig(): Promise<IConfigModel> {
    console.log("query configs")
    return new Promise(function (resolve: Function, reject: Function) {
      Config.findOne(function (error: Error, config: IConfigModel)  {
        if (error) {
          console.log("Error is " + error);
          reject(null);
        } else {
          resolve(config);
        }
      });
    });
  }

  // findConfig(): any {
  //   return Config.findOne();
  // }
}

export default new ConfigurationService();