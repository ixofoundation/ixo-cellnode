import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateNestedManyWithoutClaimInput } from "../inputs/EvaluateClaimCreateNestedManyWithoutClaimInput";

@TypeGraphQL.InputType("ClaimCreateInput", {
  isAbstract: true
})
export class ClaimCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  txHash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimTemplateId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  context!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  type!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  issuerId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimSubjectId!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: true
  })
  items?: Prisma.InputJsonValue | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  dateTime!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  creator!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  created!: string;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateNestedManyWithoutClaimInput, {
    nullable: true
  })
  EvaluateClaim?: EvaluateClaimCreateNestedManyWithoutClaimInput | undefined;
}
