import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCreateOrConnectWithoutAgentStatusInput } from "../inputs/AgentCreateOrConnectWithoutAgentStatusInput";
import { AgentCreateWithoutAgentStatusInput } from "../inputs/AgentCreateWithoutAgentStatusInput";
import { AgentWhereUniqueInput } from "../inputs/AgentWhereUniqueInput";

@TypeGraphQL.InputType("AgentCreateNestedOneWithoutAgentStatusInput", {
  isAbstract: true
})
export class AgentCreateNestedOneWithoutAgentStatusInput {
  @TypeGraphQL.Field(_type => AgentCreateWithoutAgentStatusInput, {
    nullable: true
  })
  create?: AgentCreateWithoutAgentStatusInput | undefined;

  @TypeGraphQL.Field(_type => AgentCreateOrConnectWithoutAgentStatusInput, {
    nullable: true
  })
  connectOrCreate?: AgentCreateOrConnectWithoutAgentStatusInput | undefined;

  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: true
  })
  connect?: AgentWhereUniqueInput | undefined;
}
