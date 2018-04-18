import { Document, Schema, Model, model} from "mongoose";
import { ICapabilities } from "./ICapabilities";

export interface ICapabilitiesModel extends ICapabilities, Document {
}

export var CapabilitiesSchema: Schema = new Schema({

    // capability: {
    //     type: Array,
    //     //required : true,
    //     //index: true
    //   }
    capability: []

}, {strict: false});

CapabilitiesSchema.pre("save", function(this: ICapabilities, next) {
    next();
   });
  
  export const Capabilities: Model<ICapabilitiesModel> = model<ICapabilitiesModel>("Capabilities", CapabilitiesSchema);