import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { Request } from "../handlers/Request";


/////////////////////////////////////////////////
//  PROJECT MODEL                              //
/////////////////////////////////////////////////

export interface IProjectModel extends Document { }

var ProjectSchema: Schema = new Schema({}, { strict: false });

ProjectSchema.pre("save", function (next) {
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

  updateCapabilities(did: string, methodCall: string) {
    switch (methodCall) {
      case 'CreateAgent': {
        this.saveCapabilities(did, 'SubmitClaim');
        this.saveCapabilities(did, 'ListClaims');
        break;
      }
      case 'CreateProject': {
        this.saveCapabilities(did, 'EvaluateClaim');
        this.saveCapabilities('did:sov:*', 'CreateAgent');
        this.saveCapabilities(did, 'UpdateAgentStatus');
        this.saveCapabilities(did, 'ListAgents');
        break;
      }
      default: {
        console.log('No capabilities to update');
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
              projectDid: this.getWallet().did
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
              projectDid: this.getWallet().did              
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
              projectDid: this.getWallet().did
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
              projectDid: this.getWallet().did
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
    this.generateProjectWallet();

    return this.createTransaction(args, 'CreateProject', Project, function (request: any): Promise<boolean> {
      return new Promise(function (resolve: Function, reject: Function) {
        Project.findOne(
          {
            version: 1
          },
          function (error: Error, result: IProjectModel) {
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

  evaluateClaim = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction');
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