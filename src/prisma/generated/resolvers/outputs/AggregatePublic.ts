import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PublicCountAggregate } from "../outputs/PublicCountAggregate";
import { PublicMaxAggregate } from "../outputs/PublicMaxAggregate";
import { PublicMinAggregate } from "../outputs/PublicMinAggregate";

@TypeGraphQL.ObjectType("AggregatePublic", {
  isAbstract: true
})
export class AggregatePublic {
  @TypeGraphQL.Field(_type => PublicCountAggregate, {
    nullable: true
  })
  _count!: PublicCountAggregate | null;

  @TypeGraphQL.Field(_type => PublicMinAggregate, {
    nullable: true
  })
  _min!: PublicMinAggregate | null;

  @TypeGraphQL.Field(_type => PublicMaxAggregate, {
    nullable: true
  })
  _max!: PublicMaxAggregate | null;
}
