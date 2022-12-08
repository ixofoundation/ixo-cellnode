import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateClaimArgs } from "./args/AggregateClaimArgs";
import { Claim } from "../../../models/Claim";
import { AggregateClaim } from "../../outputs/AggregateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Claim)
export class AggregateClaimResolver {
  @TypeGraphQL.Query(_returns => AggregateClaim, {
    nullable: false
  })
  async aggregateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateClaimArgs): Promise<AggregateClaim> {
    return getPrismaFromContext(ctx).claim.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
