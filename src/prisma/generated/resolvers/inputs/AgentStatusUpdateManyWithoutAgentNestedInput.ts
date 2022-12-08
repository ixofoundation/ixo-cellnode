import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusCreateManyAgentInputEnvelope } from "../inputs/AgentStatusCreateManyAgentInputEnvelope";
import { AgentStatusCreateOrConnectWithoutAgentInput } from "../inputs/AgentStatusCreateOrConnectWithoutAgentInput";
import { AgentStatusCreateWithoutAgentInput } from "../inputs/AgentStatusCreateWithoutAgentInput";
import { AgentStatusScalarWhereInput } from "../inputs/AgentStatusScalarWhereInput";
import { AgentStatusUpdateManyWithWhereWithoutAgentInput } from "../inputs/AgentStatusUpdateManyWithWhereWithoutAgentInput";
import { AgentStatusUpdateWithWhereUniqueWithoutAgentInput } from "../inputs/AgentStatusUpdateWithWhereUniqueWithoutAgentInput";
import { AgentStatusUpsertWithWhereUniqueWithoutAgentInput } from "../inputs/AgentStatusUpsertWithWhereUniqueWithoutAgentInput";
import { AgentStatusWhereUniqueInput } from "../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.InputType("AgentStatusUpdateManyWithoutAgentNestedInput", {
  isAbstract: true
})
export class AgentStatusUpdateManyWithoutAgentNestedInput {
  @TypeGraphQL.Field(_type => [AgentStatusCreateWithoutAgentInput], {
    nullable: true
  })
  create?: AgentStatusCreateWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusCreateOrConnectWithoutAgentInput], {
    nullable: true
  })
  connectOrCreate?: AgentStatusCreateOrConnectWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusUpsertWithWhereUniqueWithoutAgentInput], {
    nullable: true
  })
  upsert?: AgentStatusUpsertWithWhereUniqueWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => AgentStatusCreateManyAgentInputEnvelope, {
    nullable: true
  })
  createMany?: AgentStatusCreateManyAgentInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereUniqueInput], {
    nullable: true
  })
  set?: AgentStatusWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereUniqueInput], {
    nullable: true
  })
  disconnect?: AgentStatusWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereUniqueInput], {
    nullable: true
  })
  delete?: AgentStatusWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusWhereUniqueInput], {
    nullable: true
  })
  connect?: AgentStatusWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusUpdateWithWhereUniqueWithoutAgentInput], {
    nullable: true
  })
  update?: AgentStatusUpdateWithWhereUniqueWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusUpdateManyWithWhereWithoutAgentInput], {
    nullable: true
  })
  updateMany?: AgentStatusUpdateManyWithWhereWithoutAgentInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusScalarWhereInput], {
    nullable: true
  })
  deleteMany?: AgentStatusScalarWhereInput[] | undefined;
}
