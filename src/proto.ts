import { Ed25519, sha256 } from "@cosmjs/crypto";
import { toUtf8, Bech32, toBase64 } from "@cosmjs/encoding";
import { makeSignBytes } from "@cosmjs/proto-signing";
import { decode } from "bs58";
import sovrin from "sovrin-did";

import { createSigningClient, createQueryClient } from "@ixo/impactxclient-sdk";
import { BroadcastTxRequest } from "@ixo/impactxclient-sdk/types/codegen/cosmos/tx/v1beta1/service";

const getEdClient = (mnemonic: string) => {
    const didDoc = sovrin.fromSeed(sha256(toUtf8(mnemonic)).slice(0, 32));

    const edClient = {
        mnemonic,
        didDoc,
        didPrefix: "did:ixo:",
        did: "did:ixo:" + didDoc.did,

        async getAccounts() {
            return [
                {
                    algo: "ed25519-sha-256",
                    pubkey: Uint8Array.from(decode(didDoc.verifyKey)),
                    address: Bech32.encode(
                        "ixo",
                        sha256(decode(didDoc.verifyKey)).slice(0, 20),
                    ),
                },
            ];
        },

        async signDirect(signerAddress: any, signDoc: any) {
            const account = (await this.getAccounts()).find(
                ({ address }) => address === signerAddress,
            );
            if (!account)
                throw new Error(`Address ${signerAddress} not found in wallet`);

            const keypair = await Ed25519.makeKeypair(
                sha256(toUtf8(mnemonic)).slice(0, 32),
            );
            const signBytes = makeSignBytes(signDoc);
            const signatureArray = await Ed25519.createSignature(
                signBytes,
                keypair,
            );
            const signatureBase64 = toBase64(signatureArray.slice(0, 64));

            return {
                signed: signDoc,
                signature: {
                    signature: signatureBase64,
                    pub_key: {
                        type: "tendermint/PubKeyEd25519",
                        value: toBase64(account.pubkey),
                    },
                },
            };
        },
    };

    return edClient;
};

const RPC = process.env.RPC_URL || "";
const MNEMONIC = process.env.MNEMONIC || "";
const oldSigner: any = getEdClient(MNEMONIC);

type messages = [{ typeUrl: string; value: any }];
type fee = { amount: [{ denom: string; amount: string }]; gas: string };
enum BroadcastMode {
    BROADCAST_MODE_UNSPECIFIED = 0,
    BROADCAST_MODE_BLOCK = 1,
    BROADCAST_MODE_SYNC = 2,
    BROADCAST_MODE_ASYNC = 3,
    UNRECOGNIZED = -1,
}
type tx = {
    txBytes: Uint8Array
    mode: BroadcastMode
}

export const sign = async (
    signerAddress: string,
    messages: messages,
    fee: fee = {
        amount: [{ denom: "", amount: "" }],
        gas: "string",
    },
    memo: string = "",
) => {
    const client = await createSigningClient(RPC, oldSigner);
    const signature = await (
        await client.sign(signerAddress, messages, fee, memo)
    ).signatures[0];
    return Buffer.from(signature).toString("hex");
};

export const broadcast = async (tx: tx) => {
    const client = await createQueryClient(RPC);
    return client.cosmos.tx.v1beta1.broadcastTx(BroadcastTxRequest.fromPartial(tx));
};
