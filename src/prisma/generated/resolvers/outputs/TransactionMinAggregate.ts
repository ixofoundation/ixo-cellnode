import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("TransactionMinAggregate", {
  isAbstract: true
})
export class TransactionMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  hash!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  data!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  nonce!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  signatureType!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  signatureValue!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  timestamp!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  capability!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHeight!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHash!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  blockResponeCode!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockError!: string | null;
}
