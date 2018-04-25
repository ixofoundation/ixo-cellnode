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

  updateCapabilities(obj : any, methodCall: string) {
    switch(methodCall) {
      case 'CreateAgent': {
        this.saveCapabilities(obj.did, 'SubmitClaim');
        break;
      }
      case 'CreateProject': {
        this.saveCapabilities(obj.did, 'EvaluateClaim');
        this.saveCapabilities('did:sov:*', 'CreateAgent');
        this.saveCapabilities(obj.did, 'UpdateAgentStatus')
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
    return this.createRequest(args, 'CreateProject', Project);
  }
  
/////////////////////////////////////////////////
//  HANDLE AGENT REQUESTS                      //
/////////////////////////////////////////////////

  createAgent = (args: any) => {
    return this.createRequest(args, 'CreateAgent', Agent);
  }


  updateAgentStatus = (args: any) => {
    return this.createRequest(args, 'UpdateAgentStatus', AgentStatus);
  }

/////////////////////////////////////////////////
//  HANDLE CLAIM REQUESTS                      //
/////////////////////////////////////////////////

  submitClaim = (args: any) => {
    return this.createRequest(args, 'SubmitClaim', Claim);
  }

  evaluateClaim = (args: any) => {
    return this.createRequest(args, 'EvaluateClaim', EvaluateClaim);
  }
}
