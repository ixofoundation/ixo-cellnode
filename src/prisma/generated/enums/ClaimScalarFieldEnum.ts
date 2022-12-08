import * as TypeGraphQL from "type-graphql";

export enum ClaimScalarFieldEnum {
  txHash = "txHash",
  claimTemplateId = "claimTemplateId",
  projectDid = "projectDid",
  context = "context",
  type = "type",
  issuerId = "issuerId",
  claimSubjectId = "claimSubjectId",
  items = "items",
  dateTime = "dateTime",
  creator = "creator",
  created = "created"
}
TypeGraphQL.registerEnumType(ClaimScalarFieldEnum, {
  name: "ClaimScalarFieldEnum",
  description: undefined,
});
