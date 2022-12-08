import * as TypeGraphQL from "type-graphql";

export enum CapabilityScalarFieldEnum {
  id = "id",
  projectDid = "projectDid",
  capability = "capability",
  template = "template",
  allow = "allow",
  validateKYC = "validateKYC"
}
TypeGraphQL.registerEnumType(CapabilityScalarFieldEnum, {
  name: "CapabilityScalarFieldEnum",
  description: undefined,
});
