import { EventEmitter } from 'events';
import { IPublicModel, Public } from '../model/Public';

declare var Promise: any;

export class PublicService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }


  createPublic(data: Buffer, contentType: String, emit = true): Promise<IPublicModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      var key = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
      Public.create(
        {
          "key": key,
          "data": data,
          "contentType": contentType

        }, function (error: Error, newTransaction: IPublicModel) {
          if (error) {
            console.log("Error is " + error);
            reject(error);
          } else {
            resolve(key);
          }
        });
    });
  }

  findForKey(key: String): Promise<IPublicModel> {
    return new Promise(function (resolve: Function, reject: Function) {
        resolve (Public.findOne({ key: key }));
    });
  }
}

export default new PublicService();