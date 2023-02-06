import { prisma } from "../prisma/prisma_client";

export const createPublic = async (contentType: string, data: string) => {
    const key =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);
    try {
        return prisma.public.create({
            data: {
                key: key,
                contentType: contentType,
                data: Buffer.from(data, "base64"),
            },
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getPublic = async (key: string) => {
    try {
        return prisma.public.findFirst({
            where: {
                key: key,
            },
        });
    } catch (error) {
        console.log(error);
        return;
    }
};
