import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueEvaluateClaimArgs } from "./args/FindUniqueEvaluateClaimArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class FindUniqueEvaluateClaimResolver {
  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async evaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
