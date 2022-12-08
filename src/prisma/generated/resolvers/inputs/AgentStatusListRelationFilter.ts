import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusWhereInput } from "../inputs/AgentStatusWhereInput";

@TypeGraphQL.InputType("AgentStatusListRelationFilter", {
  isAbstract: true
})
export class AgentStatusListRelationFilter {
  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  every?: AgentStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  some?: AgentStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  none?: AgentStatusWhereInput | undefined;
}
