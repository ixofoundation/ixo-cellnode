import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { Request } from "../handlers/Request";
import axios, { AxiosResponse } from 'axios';
import InitHandler from './InitHandler';

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');

/////////////////////////////////////////////////
//  PROJECT MODEL                              //
/////////////////////////////////////////////////

export interface IProjectModel extends Document { }

var ProjectSchema: Schema = new Schema({
}, { strict: false });

ProjectSchema.pre("save", function (next) {
  next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);

/////////////////////////////////////////////////
//   AGENT MODEL                               //
/////////////////////////////////////////////////
export interface IAgentModel extends Document { role: string }

var AgentSchema: Schema = new Schema({
  role: String
}, { strict: false });

AgentSchema.pre("save", function (next) {
  next();
});

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

/////////////////////////////////////////////////
//   AGENT STATUS MODEL                        //
/////////////////////////////////////////////////

export interface IAgentStatusModel extends Document { }

var AgentStatusSchema: Schema = new Schema({}, { strict: false });

AgentStatusSchema.pre("save", function (next) {
  next();
});

export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);

/////////////////////////////////////////////////
//   CLAIM MODEL                               //
/////////////////////////////////////////////////
export interface IClaimModel extends Document { }

var ClaimSchema: Schema = new Schema({}, { strict: false });

ClaimSchema.pre("save", function (next) {
  next();
});

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);

/////////////////////////////////////////////////
//   EVALUATE CLAIM MODEL                      //
/////////////////////////////////////////////////
export interface IEvaluateClaimModel extends Document { }

var EvaluateClaimSchema: Schema = new Schema({}, { strict: false });

EvaluateClaimSchema.pre("save", function (next) {
  next();
});

export const EvaluateClaim: Model<IEvaluateClaimModel> = model<IEvaluateClaimModel>("EvaluateClaim", EvaluateClaimSchema);

export class RequestHandler extends AbstractHandler {

  constructor() {
    super();
  }

  updateCapabilities(request: Request, methodCall: string) {
    switch (methodCall) {
      case 'UpdateAgentStatus': {
        if (request.data.role === 'SA' && request.data.status === '1') this.saveCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
        if (request.data.role === 'EA' && request.data.status === '1') this.saveCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
        if (request.data.status === '1') this.saveCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
        break;
      }
      case 'CreateProject': {
        this.saveCapabilities(request.projectDid, 'did:sov:*', 'CreateAgent');
        this.saveCapabilities(request.projectDid, request.signature.creator, 'UpdateAgentStatus');
        this.saveCapabilities(request.projectDid, request.signature.creator, 'ListAgents');
        this.saveCapabilities(request.projectDid, request.signature.creator, 'ListClaims');
        break;
      }
      default: {
        break;
      }
    }
  }

  msgToPublish(obj: any, request: Request, methodCall: string): any {
    return new Promise((resolve: Function, reject: Function) => {
      var blockChainPayload: any;
      var txHash = obj.txHash;
      delete obj.version;
      delete obj.txHash;
      switch (methodCall) {
        case 'CreateProject': {
          blockChainPayload = {
            payload: [16, {
              data: {
                ...obj,
                createdOn:request.signature.created,
                createdBy:request.signature.creator
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: this.getWallet().did,
              pubKey: this.getWallet().verifyKey
            }]
          }
          break;
        }
        case 'CreateAgent': {
          blockChainPayload = {
            payload: [17, {
              data: {
                did: obj.agentDid,
                role: obj.role,
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }
          break;
        }
        case 'UpdateAgentStatus': {
          blockChainPayload = {
            payload: [18, {
              data: {
                did: obj.agentDid,
                status: obj.status,
                role: obj.role
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }

          break;
        }
        case 'SubmitClaim': {
          blockChainPayload = {
            payload: [19, {
              data: {
                claimID: txHash
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }
          break;
        }
        case 'EvaluateClaim': {
          blockChainPayload = {
            payload: [20, {
              data: {
                claimID: obj.claimId,
                status: obj.status
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }

          break;
        }
        default: {
          reject('Capability does not exist')
          break;
        }
      }
      resolve(this.signMessageForBlockchain(blockChainPayload, request.projectDid));
    });
  }

  // preVerifyDidSignature(didResponse: any, request: Request) {
  //   return (!didResponse.kyc && (request.data.role === 'EA' || request.data.role === 'IA')) ? false : true;
  // }

  /////////////////////////////////////////////////
  //  HANDLE CREATE PROJECT                      //
  /////////////////////////////////////////////////

  createProject = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.generateProjectWallet()
      .then((did: any) => {
        return InitHandler.initialise(did)
          .then((response: any) => {
            return this.createTransaction(args, 'CreateProject', Project, undefined, did);
          });
      });
  }

  /////////////////////////////////////////////////
  //  HANDLE AGENT REQUESTS                      //
  /////////////////////////////////////////////////

  createAgent = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'CreateAgent', Agent, function (request: any): Promise<boolean> {
      return new Promise(function (resolve: Function, reject: Function) {
        Agent.find(
          {
            projectDid: request.data.projectDid,
            agentDid: request.data.agentDid
          },
          function (error: Error, results: IAgentModel[]) {
            if (error) {
              reject(error);
            } else {
              results.forEach(element => {
                if (element.role === request.data.role) resolve(true);
                if (element.role === 'EA' && request.data.role === 'SA') resolve(true);
                if (element.role === 'SA' && request.data.role === 'EA') resolve(true);
              });
              resolve(false);
            }
          });
      });
    });
  }


  updateAgentStatus = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'UpdateAgentStatus', AgentStatus, function (request: any): Promise<boolean> {
      let newVersion = request.version + 1;
      return new Promise(function (resolve: Function, reject: Function) {
        AgentStatus.findOne(
          {
            projectDid: request.data.projectDid,
            agentDid: request.data.agentDid,
            version: newVersion
          },
          function (error: Error, result: IAgentStatusModel) {
            if (error) {
              reject(error);
            } else {
              if (result) {
                resolve(true);
              }
              resolve(false);
            }
          }).limit(1);
      });
    })
  }

  listAgents = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.queryTransaction(args, 'ListAgents', function (filter: any): Promise<any[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Agent.aggregate([
          {
            $match: filter
          },
          {
            $lookup: {
              "from": "agentstatuses",
              "localField": "agentDid",
              "foreignField": "agentDid",
              "as": "currentStatus"
            }
          },
          { $unwind: { path: "$currentStatus", preserveNullAndEmptyArrays: true } },
          { $sort: { "currentStatus.version": -1 } },
          {
            $group: {
              "_id": "$_id",
              "name": { $first: "$name" },
              "agentDid": { $first: "$agentDid" },
              "projectDid": { $first: "$projectDid" },
              "role": { $first: "$role" },
              "email": { $first: "$email" },
              "currentStatus": { $first: "$currentStatus" }
            }
          }
        ],
          function (error: Error, result: any[]) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
      });
    });
  }

  /////////////////////////////////////////////////
  //  HANDLE CLAIM REQUESTS                      //
  /////////////////////////////////////////////////

  submitClaim = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'SubmitClaim', Claim);
  }

  checkForFunds(projectDid: string): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(new Date().getUTCMilliseconds() + ' confirm funds exists');
      axios.get(BLOCKCHAIN_URI_REST + 'projectAccounts/' + projectDid)
        .then((response) => {
          var balance = 0;
          if (response.status == 200) {
            response.data.forEach((element: any) => {
              if (element.did == projectDid) {
                // TODO: calculate if funds available for evaluators
                //balance = element.balance - element.evaluatorPayPerClaim;
              console.log(new Date().getUTCMilliseconds() + 'balance is ' + balance);
              }
            })
            if (balance >= 0) {
              resolve(true);
            }
          }
          resolve(false);
        })
        .catch((reason) => {
          console.log(new Date().getUTCMilliseconds() + ' could not connect to blockchain ' + reason);
          resolve(false);
        });
    });
  };

    evaluateClaim = (args: any) => {
      console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
      return this.checkForFunds(new Request(args).projectDid)
        .then((resp: boolean) => {
          if (resp) {
            return this.createTransaction(args, 'EvaluateClaim', EvaluateClaim, function (request: any): Promise<boolean> {
              let newVersion = request.version + 1;
              return new Promise(function (resolve: Function, reject: Function) {
                EvaluateClaim.findOne(
                  {
                    projectDid: request.data.projectDid,
                    claimId: request.data.claimId,
                    version: newVersion
                  },
                  function (error: Error, result: IEvaluateClaimModel) {
                    if (error) {
                      reject(error);
                    } else {
                      if (result) {
                        resolve(true);
                      }
                      resolve(false);
                    }
                  }).limit(1);
              });
            });
          }
          console.log(new Date().getUTCMilliseconds() + ' insufficient funds available');
          return 'Service currently unavailable';
        });
    }

    listClaims = (args: any) => {
      console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
      return this.queryTransaction(args, 'ListClaims', function (filter: any): Promise<any[]> {
        return new Promise(function (resolve: Function, reject: Function) {
          Claim.aggregate([
            {
              $match: filter
            },
            {
              $lookup: {
                "from": "evaluateclaims",
                "localField": "txHash",
                "foreignField": "claimId",
                "as": "evaluations"
              }
            },
            { $unwind: { path: "$evaluations", preserveNullAndEmptyArrays: true } },
            { $sort: { "evaluations.version": -1 } },
            {
              $group: {
                "_id": "$_id",
                "name": { $first: "$name" },
                "type": { $first: "$type" },
                "txHash": { $first: "$txHash" },
                "evaluations": { $first: "$evaluations" }
              }
            }
          ],
            function (error: Error, result: any[]) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
        });
      });
    }
  }