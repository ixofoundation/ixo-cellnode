import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableFilter } from "../inputs/BoolNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("CapabilityWhereInput", {
  isAbstract: true
})
export class CapabilityWhereInput {
  @TypeGraphQL.Field(_type => [CapabilityWhereInput], {
    nullable: true
  })
  AND?: CapabilityWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CapabilityWhereInput], {
    nullable: true
  })
  OR?: CapabilityWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [CapabilityWhereInput], {
    nullable: true
  })
  NOT?: CapabilityWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  capability?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  template?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  allow?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableFilter, {
    nullable: true
  })
  validateKYC?: BoolNullableFilter | undefined;
}
