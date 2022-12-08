import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("AgentStatusCreateWithoutAgentInput", {
  isAbstract: true
})
export class AgentStatusCreateWithoutAgentInput {
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
  role!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  version!: string;

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
}
