import { Web3File } from "web3.storage";
import { retrieve, store } from "../handlers/Web3StorageHandler";
import { prisma } from "../prisma/prisma_client";

export const createPublic = async (data: Buffer, contentType: string) => {
    const key =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);
    try {
        const cid = await store(data, key);
        const res = await prisma.public.create({
            data: {
                key: key,
                cid: cid,
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
        let files: Web3File[] | undefined;
        const res = await prisma.public.findFirst({
            where: {
                key: key,
            },
        });
        if (res) {
            files = await retrieve(res?.cid);
        }
        return { res, files };
    } catch (error) {
        console.log(error);
        return;
    }
};
