import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityWhereInput } from "../../../inputs/CapabilityWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityWhereInput, {
    nullable: true
  })
  where?: CapabilityWhereInput | undefined;
}
