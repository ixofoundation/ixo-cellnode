import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusUpdateManyMutationInput } from "../../../inputs/AgentStatusUpdateManyMutationInput";
import { AgentStatusWhereInput } from "../../../inputs/AgentStatusWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusUpdateManyMutationInput, {
    nullable: false
  })
  data!: AgentStatusUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  where?: AgentStatusWhereInput | undefined;
}
