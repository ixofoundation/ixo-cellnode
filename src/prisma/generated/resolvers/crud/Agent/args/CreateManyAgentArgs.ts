import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentCreateManyInput } from "../../../inputs/AgentCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyAgentArgs {
  @TypeGraphQL.Field(_type => [AgentCreateManyInput], {
    nullable: false
  })
  data!: AgentCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
