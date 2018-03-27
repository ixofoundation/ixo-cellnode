import {Agent, IAgentModel} from '../agent/Agent';
import { Document, Schema, Model, model} from "mongoose";
import { IAgentStatus } from "./IAgentStatus";

import {ValidationError} from "../../error/ValidationError";

export interface IAgentStatusModel extends IAgentStatus, Document {
}

export var AGENT_STATUS = Object.freeze({'Pending': 'Pending', 'Approved': 'Approved', 'NotApproved': 'Not Approved', 'Revoked': 'Revoked'});

export var AgentStatusSchema: Schema = new Schema({
  tx: {
    type: String,
    index: true,
    unique: true // Unique index. 
  },
  created: { 
    type: Date, 
    default: 
    Date.now
  },
  did: {
    type: String,
    required : true,
    index: true
  },
  agentTx: {
    type: String,
    index: true,
    required : true
  },
  status: {
    type: String,
    validate: function(status: String){return Object.keys(AGENT_STATUS).indexOf(status.toString())!= -1},
    required : true
  }
 }, {strict: false});   // Allow any other fields to also be included over and above the standard ones

 AgentStatusSchema.pre("save", function(this: IAgentStatus, next) {
  next();
});


export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);

