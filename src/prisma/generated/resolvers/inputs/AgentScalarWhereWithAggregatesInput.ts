import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("AgentScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class AgentScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [AgentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: AgentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: AgentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: AgentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  agentDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  email?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  role?: StringWithAggregatesFilter | undefined;

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
}
