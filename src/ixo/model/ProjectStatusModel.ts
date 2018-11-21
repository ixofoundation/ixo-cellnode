import { Document, Schema, Model, model } from "mongoose";
import { UpdateProjectStatusProcessor } from "../processor/UpdateProjectStatusProcessor";
import { Status } from '../common/shared';
import { dateTimeLogger } from '../../logger/Logger';


export interface IProjectStatusModel extends Document {
  status: string
}

var ProjectStatusSchema: Schema = new Schema({
  status: String
}, { strict: false });

ProjectStatusSchema.pre("save", function (next) {
  next();
});

export const ProjectStatus: Model<IProjectStatusModel> = model<IProjectStatusModel>("ProjectStatus", ProjectStatusSchema);

ProjectStatus.on("postCommit", function (obj, projectDid) {
  if (obj.status === Status.pending) {
    let processor = new UpdateProjectStatusProcessor();
    let message = {
      data: {
        msgType: "eth",
        data: obj.txnID // "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
      },
      request: {projectDid: projectDid},
      txHash: obj.txnID
    }
    processor.publishMessageToQueue(message)
    .catch((err) => {
      console.log(dateTimeLogger() + ' update project status call to ethereum failed for %s %s', projectDid, err);
    });;
  }
});