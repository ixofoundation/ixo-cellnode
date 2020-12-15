import {Document, Model, model, Schema} from "mongoose";
import updateProjectStatusProcessor from "../processor/UpdateProjectStatusProcessor";
import {Status} from '../common/shared';
import {dateTimeLogger} from '../../logger/Logger';

export interface IProjectModel extends Document {
}

const ProjectSchema: Schema = new Schema({}, {strict: false});

ProjectSchema.pre("save", function (next) {
  next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);

Project.on("postCommit", function (obj, projectDid) {
  //update project status to created once project ledgered
  const data: any = {
    projectDid: projectDid,
    status: Status.created
  };
  updateProjectStatusProcessor.selfSignMessage(data, projectDid)
    .then((signature: any) => {
      const projectStatusRequest: any = {
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
      };
      updateProjectStatusProcessor.process(projectStatusRequest)
        .catch((err) => {
          console.log(dateTimeLogger() + ' update project status CREATED processor failed for project %s %s', projectDid, err);
        });
    })
    .catch((err) => {
      console.log(dateTimeLogger() + ' sign update project status to CREATED failed for project %s %s', projectDid, err);
    });
});
