import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WalletCountAggregate } from "../outputs/WalletCountAggregate";
import { WalletMaxAggregate } from "../outputs/WalletMaxAggregate";
import { WalletMinAggregate } from "../outputs/WalletMinAggregate";

@TypeGraphQL.ObjectType("AggregateWallet", {
  isAbstract: true
})
export class AggregateWallet {
  @TypeGraphQL.Field(_type => WalletCountAggregate, {
    nullable: true
  })
  _count!: WalletCountAggregate | null;

  @TypeGraphQL.Field(_type => WalletMinAggregate, {
    nullable: true
  })
  _min!: WalletMinAggregate | null;

  @TypeGraphQL.Field(_type => WalletMaxAggregate, {
    nullable: true
  })
  _max!: WalletMaxAggregate | null;
}
