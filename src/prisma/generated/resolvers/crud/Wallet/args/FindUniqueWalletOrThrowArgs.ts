import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletWhereUniqueInput } from "../../../inputs/WalletWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueWalletOrThrowArgs {
  @TypeGraphQL.Field(_type => WalletWhereUniqueInput, {
    nullable: false
  })
  where!: WalletWhereUniqueInput;
}
