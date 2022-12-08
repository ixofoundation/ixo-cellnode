import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimListRelationFilter } from "../inputs/EvaluateClaimListRelationFilter";
import { JsonNullableFilter } from "../inputs/JsonNullableFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ClaimWhereInput", {
  isAbstract: true
})
export class ClaimWhereInput {
  @TypeGraphQL.Field(_type => [ClaimWhereInput], {
    nullable: true
  })
  AND?: ClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ClaimWhereInput], {
    nullable: true
  })
  OR?: ClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ClaimWhereInput], {
    nullable: true
  })
  NOT?: ClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  txHash?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  claimTemplateId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  context?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  type?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  issuerId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  claimSubjectId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableFilter, {
    nullable: true
  })
  items?: JsonNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  dateTime?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  creator?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  created?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimListRelationFilter, {
    nullable: true
  })
  EvaluateClaim?: EvaluateClaimListRelationFilter | undefined;
}
