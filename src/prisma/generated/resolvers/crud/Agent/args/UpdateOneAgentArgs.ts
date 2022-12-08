import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentUpdateInput } from "../../../inputs/AgentUpdateInput";
import { AgentWhereUniqueInput } from "../../../inputs/AgentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneAgentArgs {
  @TypeGraphQL.Field(_type => AgentUpdateInput, {
    nullable: false
  })
  data!: AgentUpdateInput;

  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: false
  })
  where!: AgentWhereUniqueInput;
}
