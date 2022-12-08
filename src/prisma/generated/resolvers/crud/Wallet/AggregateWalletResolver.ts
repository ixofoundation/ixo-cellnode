import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateWalletArgs } from "./args/AggregateWalletArgs";
import { Wallet } from "../../../models/Wallet";
import { AggregateWallet } from "../../outputs/AggregateWallet";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Wallet)
export class AggregateWalletResolver {
  @TypeGraphQL.Query(_returns => AggregateWallet, {
    nullable: false
  })
  async aggregateWallet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateWalletArgs): Promise<AggregateWallet> {
    return getPrismaFromContext(ctx).wallet.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
