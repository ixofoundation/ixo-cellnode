import * as TypeGraphQL from "type-graphql";

export enum TransactionScalarFieldEnum {
  hash = "hash",
  projectDid = "projectDid",
  data = "data",
  nonce = "nonce",
  signatureType = "signatureType",
  signatureValue = "signatureValue",
  timestamp = "timestamp",
  capability = "capability",
  blockHeight = "blockHeight",
  blockHash = "blockHash",
  blockResponeCode = "blockResponeCode",
  blockError = "blockError"
}
TypeGraphQL.registerEnumType(TransactionScalarFieldEnum, {
  name: "TransactionScalarFieldEnum",
  description: undefined,
});
