import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateWithoutClaimInput } from "../inputs/EvaluateClaimCreateWithoutClaimInput";
import { EvaluateClaimUpdateWithoutClaimInput } from "../inputs/EvaluateClaimUpdateWithoutClaimInput";
import { EvaluateClaimWhereUniqueInput } from "../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.InputType("EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput", {
  isAbstract: true
})
export class EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => EvaluateClaimUpdateWithoutClaimInput, {
    nullable: false
  })
  update!: EvaluateClaimUpdateWithoutClaimInput;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateWithoutClaimInput, {
    nullable: false
  })
  create!: EvaluateClaimCreateWithoutClaimInput;
}
