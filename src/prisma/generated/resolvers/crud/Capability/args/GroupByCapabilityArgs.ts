import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CapabilityOrderByWithAggregationInput } from "../../../inputs/CapabilityOrderByWithAggregationInput";
import { CapabilityScalarWhereWithAggregatesInput } from "../../../inputs/CapabilityScalarWhereWithAggregatesInput";
import { CapabilityWhereInput } from "../../../inputs/CapabilityWhereInput";
import { CapabilityScalarFieldEnum } from "../../../../enums/CapabilityScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByCapabilityArgs {
  @TypeGraphQL.Field(_type => CapabilityWhereInput, {
    nullable: true
  })
  where?: CapabilityWhereInput | undefined;

  @TypeGraphQL.Field(_type => [CapabilityOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: CapabilityOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [CapabilityScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "projectDid" | "capability" | "template" | "allow" | "validateKYC">;

  @TypeGraphQL.Field(_type => CapabilityScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: CapabilityScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
