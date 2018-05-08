import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { SovrinUtils } from '../crypto/SovrinUtils';


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

  /////////////////////////////////////////////////
  //  HANDLE CREATE PROJECT                      //
  /////////////////////////////////////////////////

  createProject = (args: any) => {

    var fileSystem = require('fs');
    var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));

    var sovrinUtils = new SovrinUtils();
    var mnemonic = sovrinUtils.generateBip39Mnemonic();
    var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
    var did = String("did:ixo:" + sovrinWallet.did);
    console.log('Project wallet created ' + JSON.stringify(sovrinWallet));

    this.saveWallet(sovrinWallet.did, sovrinWallet.secret.signKey, sovrinWallet.verifyKey);

    args.payload.data = {
      ...args.payload.data,
      did: did,
    };

    return this.createTransaction(args, 'CreateProject', Project, function (request: any): Promise<boolean> {
      return new Promise(function (resolve: Function, reject: Function) {
        Project.findOne(
          {
            version: 1
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
    });
  }

  /////////////////////////////////////////////////
  //  HANDLE AGENT REQUESTS                      //
  /////////////////////////////////////////////////

  createAgent = (args: any) => {
    return this.createTransaction(args, 'CreateAgent', Agent);
  }


  updateAgentStatus = (args: any) => {
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
    }
    )
  }

  listAgents = (args: any) => {
    return this.queryTransaction(args, 'ListAgents', function (filter: any): Promise<IAgentModel[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Agent.find(
          filter,
          function (error: Error, result: IAgentModel[]) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  }

  /////////////////////////////////////////////////
  //  HANDLE CLAIM REQUESTS                      //
  /////////////////////////////////////////////////

  submitClaim = (args: any) => {
    return this.createTransaction(args, 'SubmitClaim', Claim);
  }

  evaluateClaim = (args: any) => {
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
    return this.queryTransaction(args, 'ListClaims', function (filter: any): Promise<IClaimModel[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Claim.find(
          filter,
          function (error: Error, result: IClaimModel[]) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  }
}
