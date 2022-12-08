import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusCreateManyInput } from "../../../inputs/AgentStatusCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyAgentStatusArgs {
  @TypeGraphQL.Field(_type => [AgentStatusCreateManyInput], {
    nullable: false
  })
  data!: AgentStatusCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
