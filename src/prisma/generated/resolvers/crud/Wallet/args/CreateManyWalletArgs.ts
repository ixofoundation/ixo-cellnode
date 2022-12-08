import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WalletCreateManyInput } from "../../../inputs/WalletCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyWalletArgs {
  @TypeGraphQL.Field(_type => [WalletCreateManyInput], {
    nullable: false
  })
  data!: WalletCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
