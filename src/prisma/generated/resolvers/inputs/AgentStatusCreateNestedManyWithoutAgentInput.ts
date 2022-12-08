import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusCreateManyAgentInputEnvelope } from "../inputs/AgentStatusCreateManyAgentInputEnvelope";
import { AgentStatusCreateOrConnectWithoutAgentInput } from "../inputs/AgentStatusCreateOrConnectWithoutAgentInput";
import { AgentStatusCreateWithoutAgentInput } from "../inputs/AgentStatusCreateWithoutAgentInput";
import { AgentStatusWhereUniqueInput } from "../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.InputType("AgentStatusCreateNestedManyWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusCreateNestedManyWithoutAgentInput {
  @TypeGraphQL.Field(_type => [AgentStatusCreateWithoutAgentInput], {
    nullable: true
  })
  create?: AgentStatusCreateWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusCreateOrConnectWithoutAgentInput], {
    nullable: true
  })
  connectOrCreate?: AgentStatusCreateOrConnectWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => AgentStatusCreateManyAgentInputEnvelope, {
    nullable: true
  })
  createMany?: AgentStatusCreateManyAgentInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereUniqueInput], {
    nullable: true
  })
  connect?: AgentStatusWhereUniqueInput[] | undefined;
}
