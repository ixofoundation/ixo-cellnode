import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicOrderByWithRelationInput } from "../../../inputs/PublicOrderByWithRelationInput";
import { PublicWhereInput } from "../../../inputs/PublicWhereInput";
import { PublicWhereUniqueInput } from "../../../inputs/PublicWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregatePublicArgs {
  @TypeGraphQL.Field(_type => PublicWhereInput, {
    nullable: true
  })
  where?: PublicWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PublicOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: PublicOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => PublicWhereUniqueInput, {
    nullable: true
  })
  cursor?: PublicWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
