import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TransactionAvgAggregate } from "../outputs/TransactionAvgAggregate";
import { TransactionCountAggregate } from "../outputs/TransactionCountAggregate";
import { TransactionMaxAggregate } from "../outputs/TransactionMaxAggregate";
import { TransactionMinAggregate } from "../outputs/TransactionMinAggregate";
import { TransactionSumAggregate } from "../outputs/TransactionSumAggregate";

@TypeGraphQL.ObjectType("TransactionGroupBy", {
  isAbstract: true
})
export class TransactionGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  data!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  nonce!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  signatureType!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  signatureValue!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  timestamp!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  capability!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHeight!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHash!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  blockResponeCode!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockError!: string | null;

  @TypeGraphQL.Field(_type => TransactionCountAggregate, {
    nullable: true
  })
  _count!: TransactionCountAggregate | null;

  @TypeGraphQL.Field(_type => TransactionAvgAggregate, {
    nullable: true
  })
  _avg!: TransactionAvgAggregate | null;

  @TypeGraphQL.Field(_type => TransactionSumAggregate, {
    nullable: true
  })
  _sum!: TransactionSumAggregate | null;

  @TypeGraphQL.Field(_type => TransactionMinAggregate, {
    nullable: true
  })
  _min!: TransactionMinAggregate | null;

  @TypeGraphQL.Field(_type => TransactionMaxAggregate, {
    nullable: true
  })
  _max!: TransactionMaxAggregate | null;
}
