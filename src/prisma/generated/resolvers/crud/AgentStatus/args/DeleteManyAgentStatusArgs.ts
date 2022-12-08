import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusWhereInput } from "../../../inputs/AgentStatusWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  where?: AgentStatusWhereInput | undefined;
}
