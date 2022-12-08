import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateManyClaimInputEnvelope } from "../inputs/EvaluateClaimCreateManyClaimInputEnvelope";
import { EvaluateClaimCreateOrConnectWithoutClaimInput } from "../inputs/EvaluateClaimCreateOrConnectWithoutClaimInput";
import { EvaluateClaimCreateWithoutClaimInput } from "../inputs/EvaluateClaimCreateWithoutClaimInput";
import { EvaluateClaimWhereUniqueInput } from "../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.InputType("EvaluateClaimCreateNestedManyWithoutClaimInput", {
  isAbstract: true
})
export class EvaluateClaimCreateNestedManyWithoutClaimInput {
  @TypeGraphQL.Field(_type => [EvaluateClaimCreateWithoutClaimInput], {
    nullable: true
  })
  create?: EvaluateClaimCreateWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimCreateOrConnectWithoutClaimInput], {
    nullable: true
  })
  connectOrCreate?: EvaluateClaimCreateOrConnectWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateManyClaimInputEnvelope, {
    nullable: true
  })
  createMany?: EvaluateClaimCreateManyClaimInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereUniqueInput], {
    nullable: true
  })
  connect?: EvaluateClaimWhereUniqueInput[] | undefined;
}
