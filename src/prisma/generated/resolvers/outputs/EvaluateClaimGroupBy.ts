import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimAvgAggregate } from "../outputs/EvaluateClaimAvgAggregate";
import { EvaluateClaimCountAggregate } from "../outputs/EvaluateClaimCountAggregate";
import { EvaluateClaimMaxAggregate } from "../outputs/EvaluateClaimMaxAggregate";
import { EvaluateClaimMinAggregate } from "../outputs/EvaluateClaimMinAggregate";
import { EvaluateClaimSumAggregate } from "../outputs/EvaluateClaimSumAggregate";

@TypeGraphQL.ObjectType("EvaluateClaimGroupBy", {
  isAbstract: true
})
export class EvaluateClaimGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  status!: string;

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

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  version!: number;

  @TypeGraphQL.Field(_type => EvaluateClaimCountAggregate, {
    nullable: true
  })
  _count!: EvaluateClaimCountAggregate | null;

  @TypeGraphQL.Field(_type => EvaluateClaimAvgAggregate, {
    nullable: true
  })
  _avg!: EvaluateClaimAvgAggregate | null;

  @TypeGraphQL.Field(_type => EvaluateClaimSumAggregate, {
    nullable: true
  })
  _sum!: EvaluateClaimSumAggregate | null;

  @TypeGraphQL.Field(_type => EvaluateClaimMinAggregate, {
    nullable: true
  })
  _min!: EvaluateClaimMinAggregate | null;

  @TypeGraphQL.Field(_type => EvaluateClaimMaxAggregate, {
    nullable: true
  })
  _max!: EvaluateClaimMaxAggregate | null;
}
