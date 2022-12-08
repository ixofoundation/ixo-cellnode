import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCreateOrConnectWithoutAgentStatusInput } from "../inputs/AgentCreateOrConnectWithoutAgentStatusInput";
import { AgentCreateWithoutAgentStatusInput } from "../inputs/AgentCreateWithoutAgentStatusInput";
import { AgentUpdateWithoutAgentStatusInput } from "../inputs/AgentUpdateWithoutAgentStatusInput";
import { AgentUpsertWithoutAgentStatusInput } from "../inputs/AgentUpsertWithoutAgentStatusInput";
import { AgentWhereUniqueInput } from "../inputs/AgentWhereUniqueInput";

@TypeGraphQL.InputType("AgentUpdateOneRequiredWithoutAgentStatusNestedInput", {
  isAbstract: true
})
export class AgentUpdateOneRequiredWithoutAgentStatusNestedInput {
  @TypeGraphQL.Field(_type => AgentCreateWithoutAgentStatusInput, {
    nullable: true
  })
  create?: AgentCreateWithoutAgentStatusInput | undefined;

  @TypeGraphQL.Field(_type => AgentCreateOrConnectWithoutAgentStatusInput, {
    nullable: true
  })
  connectOrCreate?: AgentCreateOrConnectWithoutAgentStatusInput | undefined;

  @TypeGraphQL.Field(_type => AgentUpsertWithoutAgentStatusInput, {
    nullable: true
  })
  upsert?: AgentUpsertWithoutAgentStatusInput | undefined;

  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: true
  })
  connect?: AgentWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => AgentUpdateWithoutAgentStatusInput, {
    nullable: true
  })
  update?: AgentUpdateWithoutAgentStatusInput | undefined;
}
