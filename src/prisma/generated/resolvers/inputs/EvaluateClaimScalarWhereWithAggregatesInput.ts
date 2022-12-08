import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("EvaluateClaimScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class EvaluateClaimScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: EvaluateClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: EvaluateClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: EvaluateClaimScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  claimId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  status?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  txHash?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  creator?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  created?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  version?: IntWithAggregatesFilter | undefined;
}
