import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusUpdateInput } from "../../../inputs/AgentStatusUpdateInput";
import { AgentStatusWhereUniqueInput } from "../../../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusUpdateInput, {
    nullable: false
  })
  data!: AgentStatusUpdateInput;

  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;
}
