import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentUpdateManyMutationInput } from "../../../inputs/AgentUpdateManyMutationInput";
import { AgentWhereInput } from "../../../inputs/AgentWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyAgentArgs {
  @TypeGraphQL.Field(_type => AgentUpdateManyMutationInput, {
    nullable: false
  })
  data!: AgentUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  where?: AgentWhereInput | undefined;
}
