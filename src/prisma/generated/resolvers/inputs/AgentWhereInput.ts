import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusListRelationFilter } from "../inputs/AgentStatusListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("AgentWhereInput", {
  isAbstract: true
})
export class AgentWhereInput {
  @TypeGraphQL.Field(_type => [AgentWhereInput], {
    nullable: true
  })
  AND?: AgentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentWhereInput], {
    nullable: true
  })
  OR?: AgentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentWhereInput], {
    nullable: true
  })
  NOT?: AgentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  agentDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  email?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  role?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  txHash?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  creator?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  created?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => AgentStatusListRelationFilter, {
    nullable: true
  })
  AgentStatus?: AgentStatusListRelationFilter | undefined;
}
