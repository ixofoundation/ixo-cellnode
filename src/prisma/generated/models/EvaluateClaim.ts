import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Claim } from "../models/Claim";

@TypeGraphQL.ObjectType("EvaluateClaim", {
  isAbstract: true
})
export class EvaluateClaim {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  claim?: Claim;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  claimId!: string;

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
