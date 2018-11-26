import { EventEmitter } from 'events';
import { ICapabilitiesModel, Capabilities } from '../model/Capabilities';
import { dateTimeLogger } from '../logger/Logger';

declare var Promise: any;


/*
Complete Stub of a blockchain simply here to create a transaction id
 */

export class CapabilitiesService {

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  createCapability(project: string, capability: any, emit = true): Promise<ICapabilitiesModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.create(
        {
          projectDid: project,
          capabilities: capability
        }, function (error: Error, newTransaction: ICapabilitiesModel) {
          if (error) {
            reject(error);
          } else {
            resolve(newTransaction);
          }
        });
    });
  }

  findCapabilities(): Promise<ICapabilitiesModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.findOne(
        {},
        function (error: Error, result: ICapabilitiesModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }

  findCapabilitiesForProject(projectDid: string): Promise<ICapabilitiesModel> {
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.findOne(
        {
          projectDid: projectDid
        },
        function (error: Error, result: ICapabilitiesModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }

  addCapabilities(projectDid: string, did: string[], requestType: string): Promise<ICapabilitiesModel> {
    console.log(dateTimeLogger() + ' add capabilities for ' + did + ' for request type ' + requestType);
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.updateOne(
        {
          'projectDid': projectDid,
          'capabilities.capability': requestType,
        },
        { $addToSet: { "capabilities.$.allow": did } },
        function (error: Error, result: ICapabilitiesModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }

  removeCapabilities(projectDid: string, did: string, requestType: string): Promise<ICapabilitiesModel> {
    console.log(dateTimeLogger() + ' remove capabilities for ' + did + ' for request type ' + requestType);
    return new Promise(function (resolve: Function, reject: Function) {
      Capabilities.updateOne(
        {
          'projectDid': projectDid,
          'capabilities.capability': requestType,
        },
        { $pull: { "capabilities.$.allow": did } },
        function (error: Error, result: ICapabilitiesModel) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
    });
  }
}

export default new CapabilitiesService();