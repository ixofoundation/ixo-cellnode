import { prisma } from "../prisma_client";
import { getIWallet } from "../interface_models/Wallet";

export const createWallet = async (did: string, signKey: string, verifyKey: string) => {
    try {
        const res = await prisma.wallet.create({
            data: {
                did: did,
                signKey: signKey,
                verifyKey: verifyKey,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const getWallet = async (did: string) => {
    try {
        const res = await getIWallet(did);
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};