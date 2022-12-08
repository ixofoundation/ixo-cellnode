import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateEvaluateClaimArgs } from "./args/AggregateEvaluateClaimArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { AggregateEvaluateClaim } from "../../outputs/AggregateEvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class AggregateEvaluateClaimResolver {
  @TypeGraphQL.Query(_returns => AggregateEvaluateClaim, {
    nullable: false
  })
  async aggregateEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateEvaluateClaimArgs): Promise<AggregateEvaluateClaim> {
    return getPrismaFromContext(ctx).evaluateClaim.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
