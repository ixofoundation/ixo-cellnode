import { Document, Schema, Model, model } from "mongoose";
import updateProjectStatusProcessor from "../processor/UpdateProjectStatusProcessor";
import { Status } from '../common/shared';

export interface IProjectModel extends Document {
    autoApprove: [string],
    evaluatorPayPerClaim: number
  }
  
  var ProjectSchema: Schema = new Schema({
    autoApprove: [],
    evaluatorPayPerClaim: Number
  }, { strict: false });
  
  ProjectSchema.pre("save", function (next) {
    next();
  });  
  
  export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);
  
  Project.on("postCommit", function (obj, projectDid) {
    var data: any = {
      projectDid: projectDid,
      status: Status.created
    }
    updateProjectStatusProcessor.selfSignMessage(data, projectDid)
      .then((signature: any) => {
        var projectStatusRequest: any = {
          payload: {
            template: {
              name: "project_status"
            },
            data: data
          },
          signature: {
            type: "ed25519-sha-256",
            created: new Date().toISOString(),
            creator: projectDid,
            signatureValue: signature
          }
        }
        updateProjectStatusProcessor.process(projectStatusRequest);
      });
  });

