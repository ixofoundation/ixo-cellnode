import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCreateOrConnectWithoutEvaluateClaimInput } from "../inputs/ClaimCreateOrConnectWithoutEvaluateClaimInput";
import { ClaimCreateWithoutEvaluateClaimInput } from "../inputs/ClaimCreateWithoutEvaluateClaimInput";
import { ClaimWhereUniqueInput } from "../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.InputType("ClaimCreateNestedOneWithoutEvaluateClaimInput", {
  isAbstract: true
})
export class ClaimCreateNestedOneWithoutEvaluateClaimInput {
  @TypeGraphQL.Field(_type => ClaimCreateWithoutEvaluateClaimInput, {
    nullable: true
  })
  create?: ClaimCreateWithoutEvaluateClaimInput | undefined;

  @TypeGraphQL.Field(_type => ClaimCreateOrConnectWithoutEvaluateClaimInput, {
    nullable: true
  })
  connectOrCreate?: ClaimCreateOrConnectWithoutEvaluateClaimInput | undefined;

  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: true
  })
  connect?: ClaimWhereUniqueInput | undefined;
}
