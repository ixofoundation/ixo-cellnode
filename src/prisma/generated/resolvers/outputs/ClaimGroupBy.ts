import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCountAggregate } from "../outputs/ClaimCountAggregate";
import { ClaimMaxAggregate } from "../outputs/ClaimMaxAggregate";
import { ClaimMinAggregate } from "../outputs/ClaimMinAggregate";

@TypeGraphQL.ObjectType("ClaimGroupBy", {
  isAbstract: true
})
export class ClaimGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  txHash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimTemplateId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  context!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  type!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  issuerId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimSubjectId!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: true
  })
  items!: Prisma.JsonValue | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  dateTime!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  creator!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  created!: string;

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
