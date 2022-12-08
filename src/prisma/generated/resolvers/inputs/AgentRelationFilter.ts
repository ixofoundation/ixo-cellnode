import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentWhereInput } from "../inputs/AgentWhereInput";

@TypeGraphQL.InputType("AgentRelationFilter", {
  isAbstract: true
})
export class AgentRelationFilter {
  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  is?: AgentWhereInput | undefined;

  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  isNot?: AgentWhereInput | undefined;
}
