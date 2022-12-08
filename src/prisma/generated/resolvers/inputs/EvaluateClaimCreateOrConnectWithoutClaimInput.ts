import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateWithoutClaimInput } from "../inputs/EvaluateClaimCreateWithoutClaimInput";
import { EvaluateClaimWhereUniqueInput } from "../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.InputType("EvaluateClaimCreateOrConnectWithoutClaimInput", {
  isAbstract: true
})
export class EvaluateClaimCreateOrConnectWithoutClaimInput {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateWithoutClaimInput, {
    nullable: false
  })
  create!: EvaluateClaimCreateWithoutClaimInput;
}
