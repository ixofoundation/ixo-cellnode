import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletUpdateManyMutationInput } from "../../../inputs/WalletUpdateManyMutationInput";
import { WalletWhereInput } from "../../../inputs/WalletWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyWalletArgs {
  @TypeGraphQL.Field(_type => WalletUpdateManyMutationInput, {
    nullable: false
  })
  data!: WalletUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => WalletWhereInput, {
    nullable: true
  })
  where?: WalletWhereInput | undefined;
}
