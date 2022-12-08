import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentCreateInput } from "../../../inputs/AgentCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneAgentArgs {
  @TypeGraphQL.Field(_type => AgentCreateInput, {
    nullable: false
  })
  data!: AgentCreateInput;
}
