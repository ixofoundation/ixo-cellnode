import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimWhereInput } from "../inputs/ClaimWhereInput";

@TypeGraphQL.InputType("ClaimRelationFilter", {
  isAbstract: true
})
export class ClaimRelationFilter {
  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  is?: ClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  isNot?: ClaimWhereInput | undefined;
}
