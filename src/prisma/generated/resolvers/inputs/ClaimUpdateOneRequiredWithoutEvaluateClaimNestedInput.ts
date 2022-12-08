import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCreateOrConnectWithoutEvaluateClaimInput } from "../inputs/ClaimCreateOrConnectWithoutEvaluateClaimInput";
import { ClaimCreateWithoutEvaluateClaimInput } from "../inputs/ClaimCreateWithoutEvaluateClaimInput";
import { ClaimUpdateWithoutEvaluateClaimInput } from "../inputs/ClaimUpdateWithoutEvaluateClaimInput";
import { ClaimUpsertWithoutEvaluateClaimInput } from "../inputs/ClaimUpsertWithoutEvaluateClaimInput";
import { ClaimWhereUniqueInput } from "../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.InputType("ClaimUpdateOneRequiredWithoutEvaluateClaimNestedInput", {
  isAbstract: true
})
export class ClaimUpdateOneRequiredWithoutEvaluateClaimNestedInput {
  @TypeGraphQL.Field(_type => ClaimCreateWithoutEvaluateClaimInput, {
    nullable: true
  })
  create?: ClaimCreateWithoutEvaluateClaimInput | undefined;

  @TypeGraphQL.Field(_type => ClaimCreateOrConnectWithoutEvaluateClaimInput, {
    nullable: true
  })
  connectOrCreate?: ClaimCreateOrConnectWithoutEvaluateClaimInput | undefined;

  @TypeGraphQL.Field(_type => ClaimUpsertWithoutEvaluateClaimInput, {
    nullable: true
  })
  upsert?: ClaimUpsertWithoutEvaluateClaimInput | undefined;

  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: true
  })
  connect?: ClaimWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ClaimUpdateWithoutEvaluateClaimInput, {
    nullable: true
  })
  update?: ClaimUpdateWithoutEvaluateClaimInput | undefined;
}
