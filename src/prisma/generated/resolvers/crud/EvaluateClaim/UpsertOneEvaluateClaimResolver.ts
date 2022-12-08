import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { UpsertOneEvaluateClaimArgs } from "./args/UpsertOneEvaluateClaimArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class UpsertOneEvaluateClaimResolver {
  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: false
  })
  async upsertOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneEvaluateClaimArgs): Promise<EvaluateClaim> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
