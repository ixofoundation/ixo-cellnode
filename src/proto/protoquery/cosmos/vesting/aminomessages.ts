import { AminoConverters } from "../../additionalTypes";

export function createVestingAminoConverters(): AminoConverters {
  return {
    "/cosmos.vesting.v1beta1.MsgCreateVestingAccount": "not_supported_by_chain",
  };
}
