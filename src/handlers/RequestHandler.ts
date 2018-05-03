import { Document, Schema, Model, model} from "mongoose";
import { AbstractHandler } from './AbstractHandler';


/////////////////////////////////////////////////
//  PROJECT MODEL                              //
/////////////////////////////////////////////////

export interface IProjectModel extends Document {}

var ProjectSchema: Schema = new Schema({}, {strict: false});

ProjectSchema.pre("save", function(next) {
  next();
 });

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);

/////////////////////////////////////////////////
//   AGENT MODEL                               //
/////////////////////////////////////////////////
export interface IAgentModel extends Document {}

var AgentSchema: Schema = new Schema({}, {strict: false});

AgentSchema.pre("save", function(next) {
  next();
 });

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

/////////////////////////////////////////////////
//   AGENT STATUS MODEL                        //
/////////////////////////////////////////////////

export interface IAgentStatusModel extends Document {}

var AgentStatusSchema: Schema = new Schema({}, {strict: false});

AgentStatusSchema.pre("save", function(next) {
  next();
 });

export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);

/////////////////////////////////////////////////
//   CLAIM MODEL                               //
/////////////////////////////////////////////////
export interface IClaimModel extends Document {}

var ClaimSchema: Schema = new Schema({}, {strict: false});

ClaimSchema.pre("save", function(next) {
  next();
 });

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);

/////////////////////////////////////////////////
//   EVALUATE CLAIM MODEL                      //
/////////////////////////////////////////////////
export interface IEvaluateClaimModel extends Document {}

var EvaluateClaimSchema: Schema = new Schema({}, {strict: false});

EvaluateClaimSchema.pre("save", function(next) {
  next();
 });

export const EvaluateClaim: Model<IEvaluateClaimModel> = model<IEvaluateClaimModel>("EvaluateClaim", EvaluateClaimSchema);

export class RequestHandler extends AbstractHandler {  

  updateCapabilities(did : string, methodCall: string) {
    switch(methodCall) {
      case 'CreateAgent': {
        this.saveCapabilities(did, 'SubmitClaim');
        break;
      }
      case 'CreateProject': {
        this.saveCapabilities(did, 'EvaluateClaim');
        this.saveCapabilities('did:sov:*', 'CreateAgent');
        this.saveCapabilities(did, 'UpdateAgentStatus')
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
    return this.createRequest(args, 'CreateProject', Project, function(request: any) : Promise<boolean> {
      return new Promise(function(resolve: Function, reject: Function){
        Project.findOne(
          { version: 1
          },
          function (error: Error, result: IAgentStatusModel)  {
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
    return this.createRequest(args, 'CreateAgent', Agent);
  }


  updateAgentStatus = (args: any) => {
    return this.createRequest(args, 'UpdateAgentStatus', AgentStatus, function(request: any) : Promise<boolean> {
      let newVersion = request.version + 1;
      return new Promise(function(resolve: Function, reject: Function){
        AgentStatus.findOne(
          { agentDid: request.data.agentDid,
            version: newVersion
          },
          function (error: Error, result: IAgentStatusModel)  {
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

/////////////////////////////////////////////////
//  HANDLE CLAIM REQUESTS                      //
/////////////////////////////////////////////////

  submitClaim = (args: any) => {
    return this.createRequest(args, 'SubmitClaim', Claim);
  }

  evaluateClaim = (args: any) => {
    return this.createRequest(args, 'EvaluateClaim', EvaluateClaim, function(request: any) : Promise<boolean> {
      let newVersion = request.version + 1;
      return new Promise(function(resolve: Function, reject: Function){
        EvaluateClaim.findOne(
          { claimId: request.data.claimId,
            version: newVersion
          },
          function (error: Error, result: IEvaluateClaimModel)  {
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
}
