import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCountAggregate } from "../outputs/ClaimCountAggregate";
import { ClaimMaxAggregate } from "../outputs/ClaimMaxAggregate";
import { ClaimMinAggregate } from "../outputs/ClaimMinAggregate";

@TypeGraphQL.ObjectType("AggregateClaim", {
  isAbstract: true
})
export class AggregateClaim {
  @TypeGraphQL.Field(_type => ClaimCountAggregate, {
    nullable: true
  })
  _count!: ClaimCountAggregate | null;

  @TypeGraphQL.Field(_type => ClaimMinAggregate, {
    nullable: true
  })
  _min!: ClaimMinAggregate | null;

  @TypeGraphQL.Field(_type => ClaimMaxAggregate, {
    nullable: true
  })
  _max!: ClaimMaxAggregate | null;
}
