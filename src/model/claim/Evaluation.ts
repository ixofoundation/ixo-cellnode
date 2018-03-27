import { Document, Schema, Model, model} from "mongoose";

import { IEvaluation } from "./IEvaluation";

import {ValidationError} from "../../error/ValidationError";

export var EVALUATION_STATUS = Object.freeze({'Pending': 'Pending', 'Approved': 'Approved', 'NotApproved': 'Not Approved'});

export interface IEvaluationModel extends IEvaluation, Document {
}

export var EvaluationSchema: Schema = new Schema({
  // tx: {
  //   type: String,
  //   index: true,
  //   unique: true // Unique index. 
  // },
  // created: { 
  //   type: Date, 
  //   default: 
  //   Date.now
  // },
  did: {
    type: String,
    required : true,
    index: true
  }
  // location:{ 
  //   longitude: { type: Number },
  //   latitude: { type: Number }
  // },
  // result: {
  //   type: String,
  //   required : true,
  //   validate: function(status: String){return Object.keys(EVALUATION_STATUS).indexOf(status.toString())!= -1}
  // }
}, {strict: false});   // Allow any other fields to also be included over and above the standard ones

EvaluationSchema.pre("save", function(this: IEvaluation, next) {
  next();
});

export const Evaluation: Model<IEvaluationModel> = model<IEvaluationModel>("Evaluation", EvaluationSchema);
