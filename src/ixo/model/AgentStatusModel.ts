import {Document, Model, model, Schema} from "mongoose";

export interface IAgentStatusModel extends Document {
}

var AgentStatusSchema: Schema = new Schema({}, {strict: false});

AgentStatusSchema.pre("save", function (next) {
  next();
});

export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);
