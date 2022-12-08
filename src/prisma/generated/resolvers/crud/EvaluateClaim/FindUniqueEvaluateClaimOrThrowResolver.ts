import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueEvaluateClaimOrThrowArgs } from "./args/FindUniqueEvaluateClaimOrThrowArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class FindUniqueEvaluateClaimOrThrowResolver {
  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async getEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueEvaluateClaimOrThrowArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
