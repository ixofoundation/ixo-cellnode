import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimUpdateManyMutationInput } from "../../../inputs/ClaimUpdateManyMutationInput";
import { ClaimWhereInput } from "../../../inputs/ClaimWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyClaimArgs {
  @TypeGraphQL.Field(_type => ClaimUpdateManyMutationInput, {
    nullable: false
  })
  data!: ClaimUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  where?: ClaimWhereInput | undefined;
}
