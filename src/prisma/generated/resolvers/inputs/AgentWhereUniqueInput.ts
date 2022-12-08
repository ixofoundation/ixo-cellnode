import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("AgentWhereUniqueInput", {
  isAbstract: true
})
export class AgentWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  agentDid?: string | undefined;
}
