import * as TypeGraphQL from "type-graphql";
import { Claim } from "../../../models/Claim";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { ClaimEvaluateClaimArgs } from "./args/ClaimEvaluateClaimArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Claim)
export class ClaimRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [EvaluateClaim], {
    nullable: false
  })
  async EvaluateClaim(@TypeGraphQL.Root() claim: Claim, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ClaimEvaluateClaimArgs): Promise<EvaluateClaim[]> {
    return getPrismaFromContext(ctx).claim.findUnique({
      where: {
        txHash: claim.txHash,
      },
    }).EvaluateClaim(args);
  }
}
