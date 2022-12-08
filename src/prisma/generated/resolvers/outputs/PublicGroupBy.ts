import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PublicCountAggregate } from "../outputs/PublicCountAggregate";
import { PublicMaxAggregate } from "../outputs/PublicMaxAggregate";
import { PublicMinAggregate } from "../outputs/PublicMinAggregate";

@TypeGraphQL.ObjectType("PublicGroupBy", {
  isAbstract: true
})
export class PublicGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  key!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  cid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  extension!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  contentType!: string;

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
