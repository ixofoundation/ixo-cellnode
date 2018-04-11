import { Document, Schema, Model, model} from "mongoose";

export interface IConfig{

    did: String,

    requestType: [{ type: String,
                    template: String
                 }]
}