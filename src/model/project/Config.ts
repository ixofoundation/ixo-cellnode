import { Document, Schema, Model, model } from "mongoose";
import { IConfig } from "./IConfig";

export interface IConfigModel extends IConfig, Document {
}

export var ConfigSchema: Schema = new Schema({

    did: {
        type: String,
        //required: true,
        index: true
    },
    requestType: [] 

}, { strict: false });

ConfigSchema.pre("save", function (this: IConfig, next) {
    next();
});

export const Config: Model<IConfigModel> = model<IConfigModel>("Config", ConfigSchema);