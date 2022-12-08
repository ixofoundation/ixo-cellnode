import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimOrderByWithRelationInput } from "../../../inputs/ClaimOrderByWithRelationInput";
import { ClaimWhereInput } from "../../../inputs/ClaimWhereInput";
import { ClaimWhereUniqueInput } from "../../../inputs/ClaimWhereUniqueInput";
import { ClaimScalarFieldEnum } from "../../../../enums/ClaimScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstClaimOrThrowArgs {
  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  where?: ClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ClaimOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ClaimOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: true
  })
  cursor?: ClaimWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ClaimScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"txHash" | "claimTemplateId" | "projectDid" | "context" | "type" | "issuerId" | "claimSubjectId" | "items" | "dateTime" | "creator" | "created"> | undefined;
}
