import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimCreateManyClaimInputEnvelope } from "../inputs/EvaluateClaimCreateManyClaimInputEnvelope";
import { EvaluateClaimCreateOrConnectWithoutClaimInput } from "../inputs/EvaluateClaimCreateOrConnectWithoutClaimInput";
import { EvaluateClaimCreateWithoutClaimInput } from "../inputs/EvaluateClaimCreateWithoutClaimInput";
import { EvaluateClaimScalarWhereInput } from "../inputs/EvaluateClaimScalarWhereInput";
import { EvaluateClaimUpdateManyWithWhereWithoutClaimInput } from "../inputs/EvaluateClaimUpdateManyWithWhereWithoutClaimInput";
import { EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput } from "../inputs/EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput";
import { EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput } from "../inputs/EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput";
import { EvaluateClaimWhereUniqueInput } from "../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.InputType("EvaluateClaimUpdateManyWithoutClaimNestedInput", {
  isAbstract: true
})
export class EvaluateClaimUpdateManyWithoutClaimNestedInput {
  @TypeGraphQL.Field(_type => [EvaluateClaimCreateWithoutClaimInput], {
    nullable: true
  })
  create?: EvaluateClaimCreateWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimCreateOrConnectWithoutClaimInput], {
    nullable: true
  })
  connectOrCreate?: EvaluateClaimCreateOrConnectWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput], {
    nullable: true
  })
  upsert?: EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateManyClaimInputEnvelope, {
    nullable: true
  })
  createMany?: EvaluateClaimCreateManyClaimInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereUniqueInput], {
    nullable: true
  })
  set?: EvaluateClaimWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereUniqueInput], {
    nullable: true
  })
  disconnect?: EvaluateClaimWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereUniqueInput], {
    nullable: true
  })
  delete?: EvaluateClaimWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimWhereUniqueInput], {
    nullable: true
  })
  connect?: EvaluateClaimWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput], {
    nullable: true
  })
  update?: EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimUpdateManyWithWhereWithoutClaimInput], {
    nullable: true
  })
  updateMany?: EvaluateClaimUpdateManyWithWhereWithoutClaimInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarWhereInput], {
    nullable: true
  })
  deleteMany?: EvaluateClaimScalarWhereInput[] | undefined;
}
