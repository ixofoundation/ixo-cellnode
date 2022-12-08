import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusUpdateWithoutAgentInput } from "../inputs/AgentStatusUpdateWithoutAgentInput";
import { AgentStatusWhereUniqueInput } from "../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.InputType("AgentStatusUpdateWithWhereUniqueWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusUpdateWithWhereUniqueWithoutAgentInput {
  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentStatusUpdateWithoutAgentInput, {
    nullable: false
  })
  data!: AgentStatusUpdateWithoutAgentInput;
}
