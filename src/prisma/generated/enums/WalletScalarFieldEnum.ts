import * as TypeGraphQL from "type-graphql";

export enum WalletScalarFieldEnum {
  did = "did",
  signKey = "signKey",
  verifyKey = "verifyKey"
}
TypeGraphQL.registerEnumType(WalletScalarFieldEnum, {
  name: "WalletScalarFieldEnum",
  description: undefined,
});
