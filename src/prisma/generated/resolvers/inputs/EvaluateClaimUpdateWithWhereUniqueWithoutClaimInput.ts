import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimUpdateWithoutClaimInput } from "../inputs/EvaluateClaimUpdateWithoutClaimInput";
import { EvaluateClaimWhereUniqueInput } from "../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.InputType("EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput", {
  isAbstract: true
})
export class EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => EvaluateClaimUpdateWithoutClaimInput, {
    nullable: false
  })
  data!: EvaluateClaimUpdateWithoutClaimInput;
}
