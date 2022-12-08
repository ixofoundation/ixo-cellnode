import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimWhereInput } from "../inputs/EvaluateClaimWhereInput";

@TypeGraphQL.InputType("EvaluateClaimListRelationFilter", {
  isAbstract: true
})
export class EvaluateClaimListRelationFilter {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  every?: EvaluateClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  some?: EvaluateClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  none?: EvaluateClaimWhereInput | undefined;
}
