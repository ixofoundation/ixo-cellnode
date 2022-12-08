import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusCreateManyAgentInput } from "../inputs/AgentStatusCreateManyAgentInput";

@TypeGraphQL.InputType("AgentStatusCreateManyAgentInputEnvelope", {
  isAbstract: true
})
export class AgentStatusCreateManyAgentInputEnvelope {
  @TypeGraphQL.Field(_type => [AgentStatusCreateManyAgentInput], {
    nullable: false
  })
  data!: AgentStatusCreateManyAgentInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
