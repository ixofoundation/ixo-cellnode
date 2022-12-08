import * as TypeGraphQL from "type-graphql";

export enum PublicScalarFieldEnum {
  key = "key",
  cid = "cid",
  extension = "extension",
  contentType = "contentType"
}
TypeGraphQL.registerEnumType(PublicScalarFieldEnum, {
  name: "PublicScalarFieldEnum",
  description: undefined,
});
