import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityCreateManyInput } from "../../../inputs/CapabilityCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyCapabilityArgs {
  @TypeGraphQL.Field(_type => [CapabilityCreateManyInput], {
    nullable: false
  })
  data!: CapabilityCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
