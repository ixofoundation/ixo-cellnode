import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCreateWithoutEvaluateClaimInput } from "../inputs/ClaimCreateWithoutEvaluateClaimInput";
import { ClaimWhereUniqueInput } from "../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.InputType("ClaimCreateOrConnectWithoutEvaluateClaimInput", {
  isAbstract: true
})
export class ClaimCreateOrConnectWithoutEvaluateClaimInput {
  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: false
  })
  where!: ClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => ClaimCreateWithoutEvaluateClaimInput, {
    nullable: false
  })
  create!: ClaimCreateWithoutEvaluateClaimInput;
}
