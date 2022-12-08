import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicOrderByWithAggregationInput } from "../../../inputs/PublicOrderByWithAggregationInput";
import { PublicScalarWhereWithAggregatesInput } from "../../../inputs/PublicScalarWhereWithAggregatesInput";
import { PublicWhereInput } from "../../../inputs/PublicWhereInput";
import { PublicScalarFieldEnum } from "../../../../enums/PublicScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByPublicArgs {
  @TypeGraphQL.Field(_type => PublicWhereInput, {
    nullable: true
  })
  where?: PublicWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PublicOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: PublicOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [PublicScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"key" | "cid" | "extension" | "contentType">;

  @TypeGraphQL.Field(_type => PublicScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: PublicScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
