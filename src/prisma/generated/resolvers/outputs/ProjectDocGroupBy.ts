import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectDocCountAggregate } from "../outputs/ProjectDocCountAggregate";
import { ProjectDocMaxAggregate } from "../outputs/ProjectDocMaxAggregate";
import { ProjectDocMinAggregate } from "../outputs/ProjectDocMinAggregate";

@TypeGraphQL.ObjectType("ProjectDocGroupBy", {
  isAbstract: true
})
export class ProjectDocGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: true
  })
  projectDoc!: Prisma.JsonValue | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  txHash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  creator!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  created!: string;

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
