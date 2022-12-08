import * as TypeGraphQL from "type-graphql";

export enum EvaluateClaimScalarFieldEnum {
  id = "id",
  claimId = "claimId",
  projectDid = "projectDid",
  status = "status",
  txHash = "txHash",
  creator = "creator",
  created = "created",
  version = "version"
}
TypeGraphQL.registerEnumType(EvaluateClaimScalarFieldEnum, {
  name: "EvaluateClaimScalarFieldEnum",
  description: undefined,
});
