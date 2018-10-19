import { Document, Schema, Model, model } from "mongoose";
// import updateProjectStatusProcessor from "../processor/UpdateProjectStatusProcessor";
// import { Status } from '../common/shared';

export interface IProjectModel extends Document {
  autoApprove: [string],
  evaluatorPayPerClaim: number
}

var ProjectSchema: Schema = new Schema({
  autoApprove: [],
  evaluatorPayPerClaim: Number
}, { strict: false });

ProjectSchema.pre("save", function (next) {
  next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);
