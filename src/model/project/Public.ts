import { Document, Schema, Model, model } from "mongoose";
import { IPublic } from "./IPublic";

export interface IPublicModel extends IPublic, Document { }

export var PublicSchema: Schema = new Schema({

    data: Buffer,
    contentType: String

}, { strict: false });

PublicSchema.pre("save", function (next) {
    next();
});

export const Public: Model<IPublicModel> = model<IPublicModel>("Public", PublicSchema);