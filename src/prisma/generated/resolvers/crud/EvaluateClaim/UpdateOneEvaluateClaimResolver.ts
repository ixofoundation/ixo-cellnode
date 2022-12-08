import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneEvaluateClaimArgs } from "./args/UpdateOneEvaluateClaimArgs";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class UpdateOneEvaluateClaimResolver {
  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: true
  })
  async updateOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
