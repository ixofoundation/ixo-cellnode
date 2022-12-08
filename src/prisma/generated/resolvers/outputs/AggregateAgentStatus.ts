import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusAvgAggregate } from "../outputs/AgentStatusAvgAggregate";
import { AgentStatusCountAggregate } from "../outputs/AgentStatusCountAggregate";
import { AgentStatusMaxAggregate } from "../outputs/AgentStatusMaxAggregate";
import { AgentStatusMinAggregate } from "../outputs/AgentStatusMinAggregate";
import { AgentStatusSumAggregate } from "../outputs/AgentStatusSumAggregate";

@TypeGraphQL.ObjectType("AggregateAgentStatus", {
  isAbstract: true
})
export class AggregateAgentStatus {
  @TypeGraphQL.Field(_type => AgentStatusCountAggregate, {
    nullable: true
  })
  _count!: AgentStatusCountAggregate | null;

  @TypeGraphQL.Field(_type => AgentStatusAvgAggregate, {
    nullable: true
  })
  _avg!: AgentStatusAvgAggregate | null;

  @TypeGraphQL.Field(_type => AgentStatusSumAggregate, {
    nullable: true
  })
  _sum!: AgentStatusSumAggregate | null;

  @TypeGraphQL.Field(_type => AgentStatusMinAggregate, {
    nullable: true
  })
  _min!: AgentStatusMinAggregate | null;

  @TypeGraphQL.Field(_type => AgentStatusMaxAggregate, {
    nullable: true
  })
  _max!: AgentStatusMaxAggregate | null;
}
