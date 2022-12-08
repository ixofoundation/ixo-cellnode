import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCreateNestedOneWithoutEvaluateClaimInput } from "../inputs/ClaimCreateNestedOneWithoutEvaluateClaimInput";

@TypeGraphQL.InputType("EvaluateClaimCreateInput", {
  isAbstract: true
})
export class EvaluateClaimCreateInput {
  @TypeGraphQL.Field(_type => ClaimCreateNestedOneWithoutEvaluateClaimInput, {
    nullable: false
  })
  claim!: ClaimCreateNestedOneWithoutEvaluateClaimInput;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  status!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  txHash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  creator!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  created!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  version!: number;
}
