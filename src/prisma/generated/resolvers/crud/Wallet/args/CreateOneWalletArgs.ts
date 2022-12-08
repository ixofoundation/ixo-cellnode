import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletCreateInput } from "../../../inputs/WalletCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneWalletArgs {
  @TypeGraphQL.Field(_type => WalletCreateInput, {
    nullable: false
  })
  data!: WalletCreateInput;
}
