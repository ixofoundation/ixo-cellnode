import * as TypeGraphQL from "type-graphql";

export enum ProjectScalarFieldEnum {
  projectDid = "projectDid",
  projectData = "projectData",
  txHash = "txHash",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(ProjectScalarFieldEnum, {
  name: "ProjectScalarFieldEnum",
  description: undefined,
});
