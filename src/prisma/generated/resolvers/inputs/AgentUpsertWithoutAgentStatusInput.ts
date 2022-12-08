import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCreateWithoutAgentStatusInput } from "../inputs/AgentCreateWithoutAgentStatusInput";
import { AgentUpdateWithoutAgentStatusInput } from "../inputs/AgentUpdateWithoutAgentStatusInput";

@TypeGraphQL.InputType("AgentUpsertWithoutAgentStatusInput", {
  isAbstract: true
})
export class AgentUpsertWithoutAgentStatusInput {
  @TypeGraphQL.Field(_type => AgentUpdateWithoutAgentStatusInput, {
    nullable: false
  })
  update!: AgentUpdateWithoutAgentStatusInput;

  @TypeGraphQL.Field(_type => AgentCreateWithoutAgentStatusInput, {
    nullable: false
  })
  create!: AgentCreateWithoutAgentStatusInput;
}
