import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityCreateInput } from "../../../inputs/CapabilityCreateInput";
import { CapabilityUpdateInput } from "../../../inputs/CapabilityUpdateInput";
import { CapabilityWhereUniqueInput } from "../../../inputs/CapabilityWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityWhereUniqueInput, {
    nullable: false
  })
  where!: CapabilityWhereUniqueInput;

  @TypeGraphQL.Field(_type => CapabilityCreateInput, {
    nullable: false
  })
  create!: CapabilityCreateInput;

  @TypeGraphQL.Field(_type => CapabilityUpdateInput, {
    nullable: false
  })
  update!: CapabilityUpdateInput;
}
