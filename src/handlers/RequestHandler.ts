import { Document, Schema, Model, model} from "mongoose";
import { AbstractHandler } from './AbstractHandler';



/////////////////////////////////////////////////
//  HANDLE AGENT MODEL                         //
/////////////////////////////////////////////////
export interface IAgentModel extends Document {}

var AgentSchema: Schema = new Schema({}, {strict: false});

AgentSchema.pre("save", function(next) {
  next();
 });

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

/////////////////////////////////////////////////
//  HANDLE AGENT STATUS MODEL                  //
/////////////////////////////////////////////////

export interface IAgentStatusModel extends Document {}

var AgentStatusSchema: Schema = new Schema({}, {strict: false});

AgentStatusSchema.pre("save", function(next) {
  next();
 });

export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);

/////////////////////////////////////////////////
//  HANDLE CLAIM MODEL                         //
/////////////////////////////////////////////////
export interface IClaimModel extends Document {}

var ClaimSchema: Schema = new Schema({}, {strict: false});

ClaimSchema.pre("save", function(next) {
  next();
 });

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);

export class RequestHandler extends AbstractHandler {

  updateCapabilities(obj : any, methodCall: string) {
    switch(methodCall) {
      case 'CreateAgent': {
        this.saveCapabilities(obj.did, 'SubmitClaim');
        break;
      }
      default: {
        console.log('No capabilities to update');
        break;
      }
    }
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
}
