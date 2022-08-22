import { prisma } from "../prisma_client";
import { createTransactionDoc } from "../interface_models/Transaction";

export const createTransaction = async (data: string, signatureType: string, signatureValue: string, projectDid: string, capability: string) => {
    try {
        const transactionDoc = await createTransactionDoc(data, signatureType, signatureValue, projectDid, capability);
        const res = await prisma.transaction.create({ data: transactionDoc });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const findPreviousTransaction = async () => {
    try {
        const res = await prisma.transaction.findMany({
            take: -1,
        });
        return res[0];
    } catch (error) {
        console.log(error);
        return;
    };
};

export const findTransaction = async () => {
    try {
        const res = await prisma.transaction.findMany();
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const updateTransactionLogForHash = async (txHash: string, blockHash: string, blockHeight: string, blockResponseCode: number) => {
    try {
        const res = await prisma.transaction.update({
            where: {
                hash: txHash,
            },
            data: {
                blockHash: blockHash,
                blockHeight: blockHeight,
                blockResponeCode: blockResponseCode,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const updateTransactionLogForError = async (txHash: string, blockError: string) => {
    try {
        const res = await prisma.transaction.update({
            where: {
                hash: txHash,
            },
            data: {
                blockError: blockError,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};