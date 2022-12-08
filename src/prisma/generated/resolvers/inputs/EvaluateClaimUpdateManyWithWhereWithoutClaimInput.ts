import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimScalarWhereInput } from "../inputs/EvaluateClaimScalarWhereInput";
import { EvaluateClaimUpdateManyMutationInput } from "../inputs/EvaluateClaimUpdateManyMutationInput";

@TypeGraphQL.InputType("EvaluateClaimUpdateManyWithWhereWithoutClaimInput", {
  isAbstract: true
})
export class EvaluateClaimUpdateManyWithWhereWithoutClaimInput {
  @TypeGraphQL.Field(_type => EvaluateClaimScalarWhereInput, {
    nullable: false
  })
  where!: EvaluateClaimScalarWhereInput;

  @TypeGraphQL.Field(_type => EvaluateClaimUpdateManyMutationInput, {
    nullable: false
  })
  data!: EvaluateClaimUpdateManyMutationInput;
}
