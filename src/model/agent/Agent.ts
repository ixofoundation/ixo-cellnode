import { Document, Schema, Model, model} from "mongoose";
import { IAgent } from "./IAgent";

import {ValidationError} from "../../error/ValidationError";

export interface IAgentModel extends IAgent, Document {
}

export var AGENT_ROLE = Object.freeze({'OA': 'OA', 'SA': 'SA', 'IA': 'IA', 'EA': 'EA'});

export var AgentSchema: Schema = new Schema({
  // tx: {
  //   type: String,
  //   index: true,
  //   unique: true // Unique index. 
  // },
  // created: { 
  //   type: Date, 
  //   default: Date.now
  // },
  did: {
    type: String,
    required : true,
    index: true
  }
  // name: {
  //   type: String,
  //   required : true
  // },
  // email: {
  //   type: String,
  //   required : true
  // },
  // projectTx: {
  //   type: String,
  //   index: true,
  //   required : true
  // },
  // role: {
  //   type: String,
  //   validate: function(role: String){return [AGENT_ROLE.SA,AGENT_ROLE.IA,AGENT_ROLE.EA].indexOf(role.toString())!= -1},
  //   required : true
  // },
  // latestStatus: {
  //   type: String,
  //   required : true,
  //   default: 'Pending'
  // },
  // statuses: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'AgentStatus'
  //   }
  // ]
 }, {strict: false});   // Allow any other fields to also be included over and above the standard ones

 AgentSchema.pre("save", function(this: IAgent, next) {
  next();
 });

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);


