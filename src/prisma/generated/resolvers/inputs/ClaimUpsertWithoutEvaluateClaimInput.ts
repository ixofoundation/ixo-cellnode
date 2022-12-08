import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCreateWithoutEvaluateClaimInput } from "../inputs/ClaimCreateWithoutEvaluateClaimInput";
import { ClaimUpdateWithoutEvaluateClaimInput } from "../inputs/ClaimUpdateWithoutEvaluateClaimInput";

@TypeGraphQL.InputType("ClaimUpsertWithoutEvaluateClaimInput", {
  isAbstract: true
})
export class ClaimUpsertWithoutEvaluateClaimInput {
  @TypeGraphQL.Field(_type => ClaimUpdateWithoutEvaluateClaimInput, {
    nullable: false
  })
  update!: ClaimUpdateWithoutEvaluateClaimInput;

  @TypeGraphQL.Field(_type => ClaimCreateWithoutEvaluateClaimInput, {
    nullable: false
  })
  create!: ClaimCreateWithoutEvaluateClaimInput;
}
