import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCreateWithoutAgentStatusInput } from "../inputs/AgentCreateWithoutAgentStatusInput";
import { AgentWhereUniqueInput } from "../inputs/AgentWhereUniqueInput";

@TypeGraphQL.InputType("AgentCreateOrConnectWithoutAgentStatusInput", {
  isAbstract: true
})
export class AgentCreateOrConnectWithoutAgentStatusInput {
  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: false
  })
  where!: AgentWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentCreateWithoutAgentStatusInput, {
    nullable: false
  })
  create!: AgentCreateWithoutAgentStatusInput;
}
