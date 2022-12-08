import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityCreateInput } from "../../../inputs/CapabilityCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityCreateInput, {
    nullable: false
  })
  data!: CapabilityCreateInput;
}
