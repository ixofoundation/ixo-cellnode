import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimCreateManyInput } from "../../../inputs/EvaluateClaimCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => [EvaluateClaimCreateManyInput], {
    nullable: false
  })
  data!: EvaluateClaimCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
