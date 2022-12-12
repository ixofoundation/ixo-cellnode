import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectStatusAvgAggregate } from "../outputs/ProjectStatusAvgAggregate";
import { ProjectStatusCountAggregate } from "../outputs/ProjectStatusCountAggregate";
import { ProjectStatusMaxAggregate } from "../outputs/ProjectStatusMaxAggregate";
import { ProjectStatusMinAggregate } from "../outputs/ProjectStatusMinAggregate";
import { ProjectStatusSumAggregate } from "../outputs/ProjectStatusSumAggregate";

@TypeGraphQL.ObjectType("AggregateProjectStatus", {
  isAbstract: true
})
export class AggregateProjectStatus {
  @TypeGraphQL.Field(_type => ProjectStatusCountAggregate, {
    nullable: true
  })
  _count!: ProjectStatusCountAggregate | null;

  @TypeGraphQL.Field(_type => ProjectStatusAvgAggregate, {
    nullable: true
  })
  _avg!: ProjectStatusAvgAggregate | null;

  @TypeGraphQL.Field(_type => ProjectStatusSumAggregate, {
    nullable: true
  })
  _sum!: ProjectStatusSumAggregate | null;

  @TypeGraphQL.Field(_type => ProjectStatusMinAggregate, {
    nullable: true
  })
  _min!: ProjectStatusMinAggregate | null;

  @TypeGraphQL.Field(_type => ProjectStatusMaxAggregate, {
    nullable: true
  })
  _max!: ProjectStatusMaxAggregate | null;
}