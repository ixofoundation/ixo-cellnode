import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentWhereUniqueInput } from "../../../inputs/AgentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueAgentArgs {
  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: false
  })
  where!: AgentWhereUniqueInput;
}
