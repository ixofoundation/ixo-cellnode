import * as TypeGraphQL from "type-graphql";
import { Claim } from "../../../models/Claim";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class EvaluateClaimRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Claim, {
    nullable: false
  })
  async claim(@TypeGraphQL.Root() evaluateClaim: EvaluateClaim, @TypeGraphQL.Ctx() ctx: any): Promise<Claim> {
    return getPrismaFromContext(ctx).evaluateClaim.findUnique({
      where: {
        id: evaluateClaim.id,
      },
    }).claim({});
  }
}
