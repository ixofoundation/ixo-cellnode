import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentRelationFilter } from "../inputs/AgentRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("AgentStatusWhereInput", {
  isAbstract: true
})
export class AgentStatusWhereInput {
  @TypeGraphQL.Field(_type => [AgentStatusWhereInput], {
    nullable: true
  })
  AND?: AgentStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereInput], {
    nullable: true
  })
  OR?: AgentStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereInput], {
    nullable: true
  })
  NOT?: AgentStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => AgentRelationFilter, {
    nullable: true
  })
  agent?: AgentRelationFilter | undefined;

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
  status?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  role?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  version?: StringFilter | undefined;

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
}
