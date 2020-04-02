import {Document, Model, model, Schema} from "mongoose";

export interface IEvaluateClaimModel extends Document {
}

var EvaluateClaimSchema: Schema = new Schema({}, {strict: false});

EvaluateClaimSchema.pre("save", function (next) {
  next();
});

export const EvaluateClaim: Model<IEvaluateClaimModel> = model<IEvaluateClaimModel>("EvaluateClaim", EvaluateClaimSchema);
