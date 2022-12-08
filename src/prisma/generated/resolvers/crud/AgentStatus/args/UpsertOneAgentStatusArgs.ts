import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusCreateInput } from "../../../inputs/AgentStatusCreateInput";
import { AgentStatusUpdateInput } from "../../../inputs/AgentStatusUpdateInput";
import { AgentStatusWhereUniqueInput } from "../../../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentStatusCreateInput, {
    nullable: false
  })
  create!: AgentStatusCreateInput;

  @TypeGraphQL.Field(_type => AgentStatusUpdateInput, {
    nullable: false
  })
  update!: AgentStatusUpdateInput;
}
