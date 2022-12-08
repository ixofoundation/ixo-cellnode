import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusWhereUniqueInput } from "../../../inputs/AgentStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueAgentStatusOrThrowArgs {
  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: false
  })
  where!: AgentStatusWhereUniqueInput;
}
