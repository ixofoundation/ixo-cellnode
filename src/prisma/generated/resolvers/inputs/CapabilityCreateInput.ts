import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CapabilityCreateallowInput } from "../inputs/CapabilityCreateallowInput";

@TypeGraphQL.InputType("CapabilityCreateInput", {
  isAbstract: true
})
export class CapabilityCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  capability!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  template!: string;

  @TypeGraphQL.Field(_type => CapabilityCreateallowInput, {
    nullable: true
  })
  allow?: CapabilityCreateallowInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  validateKYC?: boolean | undefined;
}
