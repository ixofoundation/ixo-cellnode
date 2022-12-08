import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletUpdateInput } from "../../../inputs/WalletUpdateInput";
import { WalletWhereUniqueInput } from "../../../inputs/WalletWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneWalletArgs {
  @TypeGraphQL.Field(_type => WalletUpdateInput, {
    nullable: false
  })
  data!: WalletUpdateInput;

  @TypeGraphQL.Field(_type => WalletWhereUniqueInput, {
    nullable: false
  })
  where!: WalletWhereUniqueInput;
}
