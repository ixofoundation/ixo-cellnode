import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CapabilityAvgAggregate } from "../outputs/CapabilityAvgAggregate";
import { CapabilityCountAggregate } from "../outputs/CapabilityCountAggregate";
import { CapabilityMaxAggregate } from "../outputs/CapabilityMaxAggregate";
import { CapabilityMinAggregate } from "../outputs/CapabilityMinAggregate";
import { CapabilitySumAggregate } from "../outputs/CapabilitySumAggregate";

@TypeGraphQL.ObjectType("AggregateCapability", {
  isAbstract: true
})
export class AggregateCapability {
  @TypeGraphQL.Field(_type => CapabilityCountAggregate, {
    nullable: true
  })
  _count!: CapabilityCountAggregate | null;

  @TypeGraphQL.Field(_type => CapabilityAvgAggregate, {
    nullable: true
  })
  _avg!: CapabilityAvgAggregate | null;

  @TypeGraphQL.Field(_type => CapabilitySumAggregate, {
    nullable: true
  })
  _sum!: CapabilitySumAggregate | null;

  @TypeGraphQL.Field(_type => CapabilityMinAggregate, {
    nullable: true
  })
  _min!: CapabilityMinAggregate | null;

  @TypeGraphQL.Field(_type => CapabilityMaxAggregate, {
    nullable: true
  })
  _max!: CapabilityMaxAggregate | null;
}
