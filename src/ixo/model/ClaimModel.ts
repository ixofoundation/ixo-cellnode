import {Document, Model, model, Schema} from "mongoose";

export interface IClaimModel extends Document {
}

const ClaimSchema: Schema = new Schema({}, {strict: false});

ClaimSchema.pre("save", function (next) {
  next();
});

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);
