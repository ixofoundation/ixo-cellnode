import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { GroupByEvaluateClaimArgs } from "./args/GroupByEvaluateClaimArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { EvaluateClaimGroupBy } from "../../outputs/EvaluateClaimGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class GroupByEvaluateClaimResolver {
  @TypeGraphQL.Query(_returns => [EvaluateClaimGroupBy], {
    nullable: false
  })
  async groupByEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByEvaluateClaimArgs): Promise<EvaluateClaimGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
