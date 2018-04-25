import { Document, Schema, Model, model} from "mongoose";

export interface ICapabilities{

    capabilities: [{capability: string,
                    template: string,
                    allow: [string]
                    }]
}