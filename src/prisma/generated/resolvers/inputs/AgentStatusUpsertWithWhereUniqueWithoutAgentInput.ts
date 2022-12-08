import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusCreateWithoutAgentInput } from "../inputs/AgentStatusCreateWithoutAgentInput";
import { AgentStatusUpdateWithoutAgentInput } from "../inputs/AgentStatusUpdateWithoutAgentInput";
import { AgentStatusWhereUniqueInput } from "../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.InputType("AgentStatusUpsertWithWhereUniqueWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusUpsertWithWhereUniqueWithoutAgentInput {
  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentStatusUpdateWithoutAgentInput, {
    nullable: false
  })
  update!: AgentStatusUpdateWithoutAgentInput;

  @TypeGraphQL.Field(_type => AgentStatusCreateWithoutAgentInput, {
    nullable: false
  })
  create!: AgentStatusCreateWithoutAgentInput;
}
