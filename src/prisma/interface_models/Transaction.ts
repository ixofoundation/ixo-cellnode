import { prisma } from "../prisma_client";
import CryptoUtils from "../../crypto/Utils";

export interface ITransaction {
    projectDid: string;
    data: string;
    hash: string;
    nonce: string;
    signatureType: string;
    signatureValue: string;
    timestamp: Date;
    capability: string;
    blockHeight?: string;
    blockHash?: string;
    blockResponseCode?: number,
    blockError?: string;
};

const cryptoUtils = new CryptoUtils();

export const createTransaction = async (data: string, signatureType: string, signatureValue: string, projectDid: string, capability: string) => {
    const res = await prisma.transaction.findMany({
        take: -1,
    });
    const nonce = cryptoUtils.createNonce();
    let prevHash: string;
    let hash: string;
    if (res) {
        prevHash = res[0].hash;
        hash = cryptoUtils.hash(prevHash + nonce + data).toString();
    } else {
        hash = "";
    };
    const transaction: ITransaction = {
        projectDid: projectDid,
        data: data,
        hash: hash,
        nonce: nonce,
        signatureType: signatureType,
        signatureValue: signatureValue,
        timestamp: new Date(),
        capability: capability,
    };
    return transaction;
};