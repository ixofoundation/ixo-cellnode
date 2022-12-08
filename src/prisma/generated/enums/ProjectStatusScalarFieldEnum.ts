import * as TypeGraphQL from "type-graphql";

export enum ProjectStatusScalarFieldEnum {
  id = "id",
  projectDid = "projectDid",
  status = "status",
  txHash = "txHash",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(ProjectStatusScalarFieldEnum, {
  name: "ProjectStatusScalarFieldEnum",
  description: undefined,
});
