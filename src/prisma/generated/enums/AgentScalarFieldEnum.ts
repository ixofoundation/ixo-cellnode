import * as TypeGraphQL from "type-graphql";

export enum AgentScalarFieldEnum {
  agentDid = "agentDid",
  projectDid = "projectDid",
  email = "email",
  name = "name",
  role = "role",
  txHash = "txHash",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(AgentScalarFieldEnum, {
  name: "AgentScalarFieldEnum",
  description: undefined,
});
