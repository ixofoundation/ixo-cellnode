import { Web3File } from "web3.storage";
import { retrieve, store } from "../handlers/Web3StorageHandler";
import { prisma } from "../prisma/prisma_client";

export const createPublic = async (
    data: Buffer,
    extension: string,
    contentType: string,
) => {
    const key =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);
    try {
        const cid = await store(data, key, extension);
        const res = await prisma.public.create({
            data: {
                key: key,
                cid: cid,
                extension: extension,
                contentType: contentType,
            },
        });
        return { public: res, cid: cid, fileName: key };
    } catch (error) {
        console.log(error);
        return;
    }
};

export const findForKey = async (key: string) => {
    try {
        let file: Web3File | undefined;
        const record = await prisma.public.findFirst({
            where: {
                key: key,
            },
        });
        if (record) {
            file = await retrieve(record?.cid);
        }
        return { record, file };
    } catch (error) {
        console.log(error);
        return;
    }
};
