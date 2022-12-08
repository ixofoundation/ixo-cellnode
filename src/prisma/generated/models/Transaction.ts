import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("Transaction", {
  isAbstract: true
})
export class Transaction {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  data!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  nonce!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  signatureType!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  signatureValue!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  timestamp!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  capability!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHeight?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockHash?: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  blockResponeCode?: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  blockError?: string | null;
}
