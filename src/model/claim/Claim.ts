// import { Document, Schema, Model, model} from "mongoose";
// import {Evaluation, IEvaluationModel, EVALUATION_STATUS} from '../claim/Evaluation';

// import { IClaim } from "./IClaim";

// import {ValidationError} from "../../error/ValidationError";

// export interface IClaimModel extends IClaim, Document {
// }

// export var ClaimSchema: Schema = new Schema({
//   // tx: {
//   //   type: String,
//   //   index: true,
//   //   unique: true // Unique index. 
//   // },
//   // created: { 
//   //   type: Date, 
//   //   default: 
//   //   Date.now
//   // },
//   did: {
//     type: String,
//     required : true,
//     index: true
//   }
//   // projectTx: {
//   //   type: String,
//   //   required : true,
//   //   index: true
//   // },
//   // location:{ 
//   //   longitude: { type: Number },
//   //   latitude: { type: Number }
//   // },
//   // latestEvaluation: {
//   //   type: String,
//   //   required : true,
//   //   default: EVALUATION_STATUS.Pending
//   // },
//   // evaluations: [{
//   //     type: Schema.Types.ObjectId,
//   //     ref: 'Evaluation'
//   //   }
//   // ]
// }, {strict: false});   // Allow any other fields to also be included over and above the standard ones

// ClaimSchema.pre("save", function(this: IClaim, next) {
//     next();
// });

// export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);
