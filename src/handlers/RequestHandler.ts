import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { Request } from "../handlers/Request";
import axios, { AxiosResponse } from 'axios';
import InitHandler from './InitHandler';

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');
var evaluatorPay = 0;

/////////////////////////////////////////////////
//  PROJECT MODEL                              //
/////////////////////////////////////////////////

export interface IProjectModel extends Document { }

var ProjectSchema: Schema = new Schema({
  evaluatorPay: String
}, { strict: false });

ProjectSchema.pre("save", function (next) {
  var inst: any;
  inst = this;
  evaluatorPay = Number(inst.evaluatorPay);
  next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);

/////////////////////////////////////////////////
//   AGENT MODEL                               //
/////////////////////////////////////////////////
export interface IAgentModel extends Document { }

var AgentSchema: Schema = new Schema({}, { strict: false });

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
    //this.getWallet();
    // Project.findOne()
    //   .then((project: any) => {
    //     if (project) {
    //       evaluatorPay = Number(project.evaluatorPay);
    //     }
    //   });
  }

  updateCapabilities(projectDid: string, did: string, methodCall: string) {
    switch (methodCall) {
      case 'CreateAgent': {
        this.saveCapabilities(projectDid, did, 'SubmitClaim');
        this.saveCapabilities(projectDid, did, 'ListClaims');
        break;
      }
      case 'CreateProject': {
        this.saveCapabilities(projectDid, did, 'EvaluateClaim');
        this.saveCapabilities(projectDid, 'did:sov:*', 'CreateAgent');
        this.saveCapabilities(projectDid, did, 'UpdateAgentStatus');
        this.saveCapabilities(projectDid, did, 'ListAgents');
        break;
      }
      default: {
        break;
      }
    }
  }

  msgToPublish(obj: any, creator: string, methodCall: string): any {
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
                ...obj
              },
              txHash: txHash,
              senderDid: creator,
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
              senderDid: creator,
              projectDid: obj.projectDid
            }]
          }
          break;
        }
        case 'UpdateAgentStatus': {
          blockChainPayload = {
            payload: [18, {
              data: {
                did: obj.agentDid,
                status: obj.status
              },
              txHash: txHash,
              senderDid: creator,
              projectDid: obj.projectDid
            }]
          }

          break;
        }
        case 'SubmitClaim': {
          blockChainPayload = {
            payload: [19, {
              data: {
                claimID: obj.claimId,
              },
              txHash: txHash,
              senderDid: creator,
              projectDid: obj.projectDid
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
              senderDid: creator,
              projectDid: obj.projectDid
            }]
          }

          break;
        }
        default: {
          reject('Capability does not exist')
          break;
        }
      }
      resolve(this.signMessageForBlockchain(blockChainPayload));
    });
  }

  /////////////////////////////////////////////////
  //  HANDLE CREATE PROJECT                      //
  /////////////////////////////////////////////////

  createProject = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.generateProjectWallet()
      .then((did: any) => {        
        return InitHandler.initialise(did)
          .then((response: any) => {
            console.log(JSON.stringify(response));            
            return this.createTransaction(args, 'CreateProject', Project);
          });
      });
  }

  /////////////////////////////////////////////////
  //  HANDLE AGENT REQUESTS                      //
  /////////////////////////////////////////////////

  createAgent = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.createTransaction(args, 'CreateAgent', Agent);
  }


  updateAgentStatus = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.createTransaction(args, 'UpdateAgentStatus', AgentStatus, function (request: any): Promise<boolean> {
      let newVersion = request.version + 1;
      return new Promise(function (resolve: Function, reject: Function) {
        AgentStatus.findOne(
          {
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
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
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
              "as": "statuses"
            }
          },
          { $unwind: { path: "$statuses", preserveNullAndEmptyArrays: true } },
          { $sort: { "statuses.version": -1 } },
          {
            $group: {
              "_id": "$_id",
              "name": { $first: "$name" },
              "surname": { $first: "$surname" },
              "statuses": { $first: "$statuses" }
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
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.createTransaction(args, 'SubmitClaim', Claim);
  }

  checkForFunds(): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(new Date().getUTCMilliseconds() + ' confirm funds exists');
      axios.get(BLOCKCHAIN_URI_REST + 'projectAccounts/' + this.getWallet().did)
        .then((response) => {
          var balance: any;
          if (response.status == 200) {
            response.data.forEach((element: any) => {
              if (element.did == this.getWallet().did) {
                balance = element.balance - evaluatorPay;
                console.log(new Date().getUTCMilliseconds() + 'balance is ' + balance);
              }
            })
            if (balance > 0) {
              resolve(true);
            }
          }
          resolve(false);
        })
        .catch(() => {
          console.log(new Date().getUTCMilliseconds() + ' could not connect to blockchain');
          resolve(false);
        });
    });
  };

  evaluateClaim = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.checkForFunds()
      .then((resp: boolean) => {
        if (resp) {
          return this.createTransaction(args, 'EvaluateClaim', EvaluateClaim, function (request: any): Promise<boolean> {
            let newVersion = request.version + 1;
            return new Promise(function (resolve: Function, reject: Function) {
              EvaluateClaim.findOne(
                {
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
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
    return this.queryTransaction(args, 'ListClaims', function (filter: any): Promise<any[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Claim.aggregate([
          {
            $match: filter
          },
          {
            $lookup: {
              "from": "evaluateclaims",
              "localField": "claimid",
              "foreignField": "claimId",
              "as": "evaluations"
            }
          },
          { $unwind: { path: "$claims", preserveNullAndEmptyArrays: true } },
          { $sort: { "evaluations.version": -1 } },
          {
            $group: {
              "_id": "$_id",
              "name": { $first: "$name" },
              "type": { $first: "$type" },
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