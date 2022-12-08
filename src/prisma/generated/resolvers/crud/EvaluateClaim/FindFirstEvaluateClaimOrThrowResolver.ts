import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstEvaluateClaimOrThrowArgs } from "./args/FindFirstEvaluateClaimOrThrowArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class FindFirstEvaluateClaimOrThrowResolver {
  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async findFirstEvaluateClaimOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstEvaluateClaimOrThrowArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
