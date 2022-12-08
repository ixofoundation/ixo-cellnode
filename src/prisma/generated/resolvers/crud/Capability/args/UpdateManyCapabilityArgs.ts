import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityUpdateManyMutationInput } from "../../../inputs/CapabilityUpdateManyMutationInput";
import { CapabilityWhereInput } from "../../../inputs/CapabilityWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityUpdateManyMutationInput, {
    nullable: false
  })
  data!: CapabilityUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => CapabilityWhereInput, {
    nullable: true
  })
  where?: CapabilityWhereInput | undefined;
}
