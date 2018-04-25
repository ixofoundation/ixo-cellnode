import { Document, Schema, Model, model} from "mongoose";
import { ICapabilities } from "./ICapabilities";

export interface ICapabilitiesModel extends ICapabilities, Document {
}

export var CapabilitiesSchema: Schema = new Schema({

    capabilities: [{capability: String,
                    template: String,
                    allow: [String]
    }]

}, {strict: false});

CapabilitiesSchema.pre("save", function(this: ICapabilities, next) {
    next();
   });
  
  export const Capabilities: Model<ICapabilitiesModel> = model<ICapabilitiesModel>("Capabilities", CapabilitiesSchema);