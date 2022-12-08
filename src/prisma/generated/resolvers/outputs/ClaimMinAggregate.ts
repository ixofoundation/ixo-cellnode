import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("ClaimMinAggregate", {
  isAbstract: true
})
export class ClaimMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  txHash!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  claimTemplateId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  context!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  type!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  issuerId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  claimSubjectId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  dateTime!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  creator!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  created!: string | null;
}
