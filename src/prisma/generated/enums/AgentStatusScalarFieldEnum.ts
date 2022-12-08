import * as TypeGraphQL from "type-graphql";

export enum AgentStatusScalarFieldEnum {
  id = "id",
  agentDid = "agentDid",
  projectDid = "projectDid",
  status = "status",
  role = "role",
  version = "version",
  txHash = "txHash",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(AgentStatusScalarFieldEnum, {
  name: "AgentStatusScalarFieldEnum",
  description: undefined,
});
