import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletCreateInput } from "../../../inputs/WalletCreateInput";
import { WalletUpdateInput } from "../../../inputs/WalletUpdateInput";
import { WalletWhereUniqueInput } from "../../../inputs/WalletWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneWalletArgs {
  @TypeGraphQL.Field(_type => WalletWhereUniqueInput, {
    nullable: false
  })
  where!: WalletWhereUniqueInput;

  @TypeGraphQL.Field(_type => WalletCreateInput, {
    nullable: false
  })
  create!: WalletCreateInput;

  @TypeGraphQL.Field(_type => WalletUpdateInput, {
    nullable: false
  })
  update!: WalletUpdateInput;
}
