/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters } from "@cosmjs/stargate";
import { DidCredential } from "./did";
import { MsgAddCredential, MsgAddDid } from "./tx";

// eslint-disable-next-line import/no-cycle

export interface AminoAddDid extends AminoMsg {
  readonly type: "did.MsgAddDid";
  readonly value: {
    readonly did: string;
    readonly pubKey: string;
  };
}

export function isAminoAddDid(msg: AminoMsg): msg is AminoAddDid {
  return msg.type === "did.MsgAddDid";
}
export function AddDidAminoConverters(): AminoConverters {
  return {
    "/did.MsgAddDid": {
      aminoType: "did.MsgAddDid",

      toAmino: ({ did, pubKey }: MsgAddDid): AminoAddDid["value"] => ({
        did: did,
        pubKey: pubKey,
      }),
      fromAmino: ({ did, pubKey }: AminoAddDid["value"]): MsgAddDid => ({
        did: did,
        pubKey: pubKey,
      }),
    },
  };
}

//  TransactionAddCredential

export interface AminoAddCredential extends AminoMsg {
  readonly type: "did.MsgAddCredential";
  readonly value: {
    readonly didCredential?: DidCredential;
  };
}

export function isAminoAddCredential(msg: AminoMsg): msg is AminoAddCredential {
  return msg.type === "did.MsgAddCredential";
}
export function AddCredentialAminoConverters(): AminoConverters {
  return {
    "/did.MsgAddCredential": {
      aminoType: "did.MsgAddCredential",

      toAmino: ({
        didCredential,
      }: MsgAddCredential): AminoAddCredential["value"] => ({
        didCredential: didCredential,
      }),
      fromAmino: ({
        didCredential,
      }: AminoAddCredential["value"]): MsgAddCredential => ({
        didCredential: didCredential,
      }),
    },
  };
}
