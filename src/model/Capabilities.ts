import { Document, Schema, Model, model} from "mongoose";
import { ICapabilities } from "./ICapabilities";

export interface ICapabilitiesModel extends ICapabilities, Document {
}

export var CapabilitiesSchema: Schema = new Schema({

    did: {
        type: String,
        required : true,
        index: true
      },
    service: {
        type: Array
        //required : true,
        //index: true
      }
    // auth_method: [{
    //     type: String,
    //     public_key: String,
    //     secret_key: String
    //   }],
    // request_type: [{
    //     type: String,
    //     template: String
    //   }] 

}, {strict: false});

CapabilitiesSchema.pre("save", function(this: ICapabilities, next) {
    next();
   });
  
  export const Capabilities: Model<ICapabilitiesModel> = model<ICapabilitiesModel>("Capabilities", CapabilitiesSchema);