import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusCreateInput } from "../../../inputs/AgentStatusCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusCreateInput, {
    nullable: false
  })
  data!: AgentStatusCreateInput;
}
