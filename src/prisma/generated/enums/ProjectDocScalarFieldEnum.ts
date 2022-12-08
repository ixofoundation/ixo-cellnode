import * as TypeGraphQL from "type-graphql";

export enum ProjectDocScalarFieldEnum {
  projectDid = "projectDid",
  projectDoc = "projectDoc",
  txHash = "txHash",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(ProjectDocScalarFieldEnum, {
  name: "ProjectDocScalarFieldEnum",
  description: undefined,
});
