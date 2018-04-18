import { Document, Schema, Model, model} from "mongoose";

export interface ICapabilities{

    capability: [{  requestType: String,
                    allow: [String]
                }]
}