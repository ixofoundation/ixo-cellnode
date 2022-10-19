import { store } from "../handlers/Web3StorageHandler";
import { prisma } from "../prisma/prisma_client";

export const createPublic = async (data: Buffer, contentType: string) => {
    const key =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);
    try {
        const res = await prisma.public.create({
            data: {
                key: key,
                data: data,
                contentType: contentType,
            },
        });
        const cid = await store(data, key);
        return { public: res, cid: cid, fileName: key };
    } catch (error) {
        console.log(error);
        return;
    }
};

export const findForKey = async (key: string) => {
    try {
        const res = await prisma.public.findFirst({
            where: {
                key: key,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
};
