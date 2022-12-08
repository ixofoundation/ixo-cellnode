import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentWhereInput } from "../../../inputs/AgentWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyAgentArgs {
  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  where?: AgentWhereInput | undefined;
}
