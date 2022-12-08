import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicWhereInput } from "../../../inputs/PublicWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyPublicArgs {
  @TypeGraphQL.Field(_type => PublicWhereInput, {
    nullable: true
  })
  where?: PublicWhereInput | undefined;
}
