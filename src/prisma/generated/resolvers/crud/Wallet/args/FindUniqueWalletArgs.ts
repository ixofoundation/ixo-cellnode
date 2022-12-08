import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletWhereUniqueInput } from "../../../inputs/WalletWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueWalletArgs {
  @TypeGraphQL.Field(_type => WalletWhereUniqueInput, {
    nullable: false
  })
  where!: WalletWhereUniqueInput;
}
