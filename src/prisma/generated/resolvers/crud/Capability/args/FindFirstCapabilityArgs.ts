import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityOrderByWithRelationInput } from "../../../inputs/CapabilityOrderByWithRelationInput";
import { CapabilityWhereInput } from "../../../inputs/CapabilityWhereInput";
import { CapabilityWhereUniqueInput } from "../../../inputs/CapabilityWhereUniqueInput";
import { CapabilityScalarFieldEnum } from "../../../../enums/CapabilityScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityWhereInput, {
    nullable: true
  })
  where?: CapabilityWhereInput | undefined;

  @TypeGraphQL.Field(_type => [CapabilityOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: CapabilityOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => CapabilityWhereUniqueInput, {
    nullable: true
  })
  cursor?: CapabilityWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [CapabilityScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "projectDid" | "capability" | "template" | "allow" | "validateKYC"> | undefined;
}
