import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectDocCountAggregate } from "../outputs/ProjectDocCountAggregate";
import { ProjectDocMaxAggregate } from "../outputs/ProjectDocMaxAggregate";
import { ProjectDocMinAggregate } from "../outputs/ProjectDocMinAggregate";

@TypeGraphQL.ObjectType("AggregateProjectDoc", {
  isAbstract: true
})
export class AggregateProjectDoc {
  @TypeGraphQL.Field(_type => ProjectDocCountAggregate, {
    nullable: true
  })
  _count!: ProjectDocCountAggregate | null;

  @TypeGraphQL.Field(_type => ProjectDocMinAggregate, {
    nullable: true
  })
  _min!: ProjectDocMinAggregate | null;

  @TypeGraphQL.Field(_type => ProjectDocMaxAggregate, {
    nullable: true
  })
  _max!: ProjectDocMaxAggregate | null;
}
