import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityUpdateInput } from "../../../inputs/CapabilityUpdateInput";
import { CapabilityWhereUniqueInput } from "../../../inputs/CapabilityWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityUpdateInput, {
    nullable: false
  })
  data!: CapabilityUpdateInput;

  @TypeGraphQL.Field(_type => CapabilityWhereUniqueInput, {
    nullable: false
  })
  where!: CapabilityWhereUniqueInput;
}
