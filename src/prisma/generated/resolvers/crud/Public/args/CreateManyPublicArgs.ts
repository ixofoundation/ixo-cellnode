import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicCreateManyInput } from "../../../inputs/PublicCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyPublicArgs {
  @TypeGraphQL.Field(_type => [PublicCreateManyInput], {
    nullable: false
  })
  data!: PublicCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
