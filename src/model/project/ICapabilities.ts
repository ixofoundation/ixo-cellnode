import { Document, Schema, Model, model} from "mongoose";

export interface ICapabilities{

    capability: String;
    requestType: String;
    // auth_method: [{
    //                 type: String,
    //                 public_key: String,
    //                 secret_key: String
    //             }],
    // request_type: [{
    //                 type: String,
    //                 template: String
    //                 }]
}