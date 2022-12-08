import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletOrderByWithRelationInput } from "../../../inputs/WalletOrderByWithRelationInput";
import { WalletWhereInput } from "../../../inputs/WalletWhereInput";
import { WalletWhereUniqueInput } from "../../../inputs/WalletWhereUniqueInput";
import { WalletScalarFieldEnum } from "../../../../enums/WalletScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyWalletArgs {
  @TypeGraphQL.Field(_type => WalletWhereInput, {
    nullable: true
  })
  where?: WalletWhereInput | undefined;

  @TypeGraphQL.Field(_type => [WalletOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: WalletOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => WalletWhereUniqueInput, {
    nullable: true
  })
  cursor?: WalletWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [WalletScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"did" | "signKey" | "verifyKey"> | undefined;
}
