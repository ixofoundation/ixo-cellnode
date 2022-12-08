import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicUpdateManyMutationInput } from "../../../inputs/PublicUpdateManyMutationInput";
import { PublicWhereInput } from "../../../inputs/PublicWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyPublicArgs {
  @TypeGraphQL.Field(_type => PublicUpdateManyMutationInput, {
    nullable: false
  })
  data!: PublicUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => PublicWhereInput, {
    nullable: true
  })
  where?: PublicWhereInput | undefined;
}
