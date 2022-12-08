import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimRelationFilter } from "../inputs/ClaimRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("EvaluateClaimWhereInput", {
  isAbstract: true
})
export class EvaluateClaimWhereInput {
  @TypeGraphQL.Field(_type => [EvaluateClaimWhereInput], {
    nullable: true
  })
  AND?: EvaluateClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereInput], {
    nullable: true
  })
  OR?: EvaluateClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereInput], {
    nullable: true
  })
  NOT?: EvaluateClaimWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => ClaimRelationFilter, {
    nullable: true
  })
  claim?: ClaimRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  claimId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  status?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  txHash?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  creator?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  created?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  version?: IntFilter | undefined;
}
