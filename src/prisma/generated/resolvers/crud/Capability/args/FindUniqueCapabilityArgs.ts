import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityWhereUniqueInput } from "../../../inputs/CapabilityWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityWhereUniqueInput, {
    nullable: false
  })
  where!: CapabilityWhereUniqueInput;
}
