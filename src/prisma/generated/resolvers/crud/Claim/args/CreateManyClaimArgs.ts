import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimCreateManyInput } from "../../../inputs/ClaimCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyClaimArgs {
  @TypeGraphQL.Field(_type => [ClaimCreateManyInput], {
    nullable: false
  })
  data!: ClaimCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
