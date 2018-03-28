import { Document, Schema, Model, model} from "mongoose";

export interface ICapabilities{

    did: String;
    service: String;
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