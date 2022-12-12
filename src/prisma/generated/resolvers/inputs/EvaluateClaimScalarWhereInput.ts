import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("EvaluateClaimScalarWhereInput", {
  isAbstract: true
})
export class EvaluateClaimScalarWhereInput {
  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereInput], {
    nullable: true
  })
  AND?: EvaluateClaimScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereInput], {
    nullable: true
  })
  OR?: EvaluateClaimScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereInput], {
    nullable: true
  })
  NOT?: EvaluateClaimScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

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