import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentCreateInput } from "../../../inputs/AgentCreateInput";
import { AgentUpdateInput } from "../../../inputs/AgentUpdateInput";
import { AgentWhereUniqueInput } from "../../../inputs/AgentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneAgentArgs {
  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: false
  })
  where!: AgentWhereUniqueInput;

  @TypeGraphQL.Field(_type => AgentCreateInput, {
    nullable: false
  })
  create!: AgentCreateInput;

  @TypeGraphQL.Field(_type => AgentUpdateInput, {
    nullable: false
  })
  update!: AgentUpdateInput;
}
