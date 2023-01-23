import { AccountData, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { generateSecpDid } from "@ixo/impactxclient-sdk/main/utils/did";
import { createSigningClient, createQueryClient } from "@ixo/impactxclient-sdk";
import base58 from "bs58";

const getSecpClient = async (mnemonic: string) => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: "ixo",
    });
    const account = (await wallet.getAccounts())[0];

    const secpClient = {
        mnemonic,
        didDoc: "",
        didPrefix: "did:ixo:",
        did: generateSecpDid(base58.encode(account.pubkey), "ixo"),

        async getAccounts() {
            return (await wallet.getAccounts()) as AccountData[];
        },

        async signDirect(signerAddress: any, signDoc: any) {
            return await wallet.signDirect(signerAddress, signDoc);
        },
    };

    return secpClient;
};

const RPC = process.env.RPC_URL || "";
const MNEMONIC = process.env.MNEMONIC || "";
const oldSigner: any = getSecpClient(MNEMONIC);

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
    txBytes: Uint8Array;
    mode: BroadcastMode;
};

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
    return client.cosmos.tx.v1beta1.broadcastTx(tx);
};
