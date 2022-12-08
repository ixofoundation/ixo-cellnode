import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateManyClaimInput } from "../inputs/EvaluateClaimCreateManyClaimInput";

@TypeGraphQL.InputType("EvaluateClaimCreateManyClaimInputEnvelope", {
  isAbstract: true
})
export class EvaluateClaimCreateManyClaimInputEnvelope {
  @TypeGraphQL.Field(_type => [EvaluateClaimCreateManyClaimInput], {
    nullable: false
  })
  data!: EvaluateClaimCreateManyClaimInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
