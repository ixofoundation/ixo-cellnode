import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletOrderByWithAggregationInput } from "../../../inputs/WalletOrderByWithAggregationInput";
import { WalletScalarWhereWithAggregatesInput } from "../../../inputs/WalletScalarWhereWithAggregatesInput";
import { WalletWhereInput } from "../../../inputs/WalletWhereInput";
import { WalletScalarFieldEnum } from "../../../../enums/WalletScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByWalletArgs {
  @TypeGraphQL.Field(_type => WalletWhereInput, {
    nullable: true
  })
  where?: WalletWhereInput | undefined;

  @TypeGraphQL.Field(_type => [WalletOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: WalletOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [WalletScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"did" | "signKey" | "verifyKey">;

  @TypeGraphQL.Field(_type => WalletScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: WalletScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
