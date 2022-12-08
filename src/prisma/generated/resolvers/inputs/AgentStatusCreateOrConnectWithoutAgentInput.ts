import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusCreateWithoutAgentInput } from "../inputs/AgentStatusCreateWithoutAgentInput";
import { AgentStatusWhereUniqueInput } from "../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.InputType("AgentStatusCreateOrConnectWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusCreateOrConnectWithoutAgentInput {
  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentStatusCreateWithoutAgentInput, {
    nullable: false
  })
  create!: AgentStatusCreateWithoutAgentInput;
}
