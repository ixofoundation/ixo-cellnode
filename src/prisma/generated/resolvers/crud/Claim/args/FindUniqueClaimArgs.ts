import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimWhereUniqueInput } from "../../../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueClaimArgs {
  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: false
  })
  where!: ClaimWhereUniqueInput;
}
