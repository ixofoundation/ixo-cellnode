import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableWithAggregatesFilter } from "../inputs/BoolNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("CapabilityScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class CapabilityScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [CapabilityScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: CapabilityScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CapabilityScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: CapabilityScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CapabilityScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: CapabilityScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  capability?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  template?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  allow?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableWithAggregatesFilter, {
    nullable: true
  })
  validateKYC?: BoolNullableWithAggregatesFilter | undefined;
}
