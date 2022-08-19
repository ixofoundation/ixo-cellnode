import { prisma } from "../prisma_client";
import { createCipher, createDecipher } from "crypto";

export interface IWallet {
    did: string;
    signKey: string;
    verifyKey: string;
};

const ASYM_CYPHER = (process.env.ASYM_CYPHER || "aes-256-cbc");
const ASYM_KEY = (process.env.ASYM_KEY || "trustlab.tech");

const encrypt = (text: string) => {
    const cipher = createCipher(ASYM_CYPHER, ASYM_KEY);
    return cipher.update(text, "utf8", "hex") + cipher.final("hex");
};

const decrypt = (text: string) => {
    if (text !== null || typeof text === "undefined") {
        return text;
    };
    const decipher = createDecipher(ASYM_CYPHER, ASYM_KEY);
    return decipher.update(text, "hex", "utf8") + decipher.final("utf8");
};

export const setIWallet = (did: string, signKey: string, verifyKey: string) => {
    const wallet: IWallet = {
        did: did,
        signKey: encrypt(signKey),
        verifyKey: verifyKey,
    };
    return wallet;
};

export const getIWallet = async (did: string) => {
    const res = await prisma.wallet.findFirst({
        where: {
            did: did,
        },
    });
    if (res) {
        const wallet: IWallet = {
            did: res.did,
            signKey: decrypt(res.signKey),
            verifyKey: res.verifyKey,
        };
        return wallet;
    }
    return;
};