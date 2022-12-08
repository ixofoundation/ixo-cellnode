import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusScalarWhereInput } from "../inputs/AgentStatusScalarWhereInput";
import { AgentStatusUpdateManyMutationInput } from "../inputs/AgentStatusUpdateManyMutationInput";

@TypeGraphQL.InputType("AgentStatusUpdateManyWithWhereWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusUpdateManyWithWhereWithoutAgentInput {
  @TypeGraphQL.Field(_type => AgentStatusScalarWhereInput, {
    nullable: false
  })
  where!: AgentStatusScalarWhereInput;

  @TypeGraphQL.Field(_type => AgentStatusUpdateManyMutationInput, {
    nullable: false
  })
  data!: AgentStatusUpdateManyMutationInput;
}
