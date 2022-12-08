import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { JsonNullableWithAggregatesFilter } from "../inputs/JsonNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ClaimScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class ClaimScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [ClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: ClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: ClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: ClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  txHash?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  claimTemplateId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  context?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  type?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  issuerId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  claimSubjectId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableWithAggregatesFilter, {
    nullable: true
  })
  items?: JsonNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  dateTime?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  creator?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  created?: StringWithAggregatesFilter | undefined;
}
