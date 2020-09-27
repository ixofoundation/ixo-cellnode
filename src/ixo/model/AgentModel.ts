import {Document, Model, model, Schema} from "mongoose";
import {Project} from "./ProjectModel"
import updateAgentStatusProcessor from "../processor/UpdateAgentStatusProcessor";

export interface IAgentModel extends Document {
  role: string
}

const AgentSchema: Schema = new Schema({
  role: String
}, {strict: false});

AgentSchema.pre("save", function (next) {
  next();
});

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

Agent.on("postCommit", function (obj, projectDid) {
  Project.findOne({
    projectDid: obj.projectDid
  }).then((project) => {
    if (project) {
      const data: any = {
        projectDid: projectDid,
        status: "1", // TODO: check if should auto-approve agents
        agentDid: obj.agentDid,
        role: obj.role
      };
      updateAgentStatusProcessor.selfSignMessage(data, projectDid)
        .then((signature: any) => {
          const statusRequest: any = {
            payload: {
              template: {
                name: "agent_status"
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
          updateAgentStatusProcessor.process(statusRequest);
        });
    }
  });
});
