import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCountAggregate } from "../outputs/AgentCountAggregate";
import { AgentMaxAggregate } from "../outputs/AgentMaxAggregate";
import { AgentMinAggregate } from "../outputs/AgentMinAggregate";

@TypeGraphQL.ObjectType("AggregateAgent", {
  isAbstract: true
})
export class AggregateAgent {
  @TypeGraphQL.Field(_type => AgentCountAggregate, {
    nullable: true
  })
  _count!: AgentCountAggregate | null;

  @TypeGraphQL.Field(_type => AgentMinAggregate, {
    nullable: true
  })
  _min!: AgentMinAggregate | null;

  @TypeGraphQL.Field(_type => AgentMaxAggregate, {
    nullable: true
  })
  _max!: AgentMaxAggregate | null;
}
