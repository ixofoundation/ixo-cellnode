import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimOrderByWithAggregationInput } from "../../../inputs/ClaimOrderByWithAggregationInput";
import { ClaimScalarWhereWithAggregatesInput } from "../../../inputs/ClaimScalarWhereWithAggregatesInput";
import { ClaimWhereInput } from "../../../inputs/ClaimWhereInput";
import { ClaimScalarFieldEnum } from "../../../../enums/ClaimScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByClaimArgs {
  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  where?: ClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ClaimOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ClaimOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ClaimScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"txHash" | "claimTemplateId" | "projectDid" | "context" | "type" | "issuerId" | "claimSubjectId" | "items" | "dateTime" | "creator" | "created">;

  @TypeGraphQL.Field(_type => ClaimScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ClaimScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
