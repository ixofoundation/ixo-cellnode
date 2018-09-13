import { Document, Schema, Model, model } from "mongoose";
import { ICapabilities } from "./ICapabilities";

export interface ICapabilitiesModel extends ICapabilities, Document { }

export var CapabilitiesSchema: Schema = new Schema({

    projectDid: String,
    capabilities: [{
        capability: String,
        template: String,
        allow: [String],
        validateKYC: Boolean
    }]

}, { strict: false });

CapabilitiesSchema.pre("save", function (next) {
    next();
});

export const Capabilities: Model<ICapabilitiesModel> = model<ICapabilitiesModel>("Capabilities", CapabilitiesSchema);