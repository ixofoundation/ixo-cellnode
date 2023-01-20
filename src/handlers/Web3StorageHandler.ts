import { Web3Storage, File } from "web3.storage";
import { prisma } from "../prisma/prisma_client";

const token = process.env.WEB3STORAGE_TOKEN || "";
const client = new Web3Storage({ token: token });

export const store = async (
    name: string,
    contentType: string,
    data: string,
) => {
    const buffer = Buffer.from(data, "base64");
    const blob = new Blob([buffer], { type: contentType });
    const file = new File([blob], name, { type: contentType });
    const cid = await client.put([file]);
    return prisma.storage.create({
        data: {
            cid: cid,
            name: name,
            ipfs: `${cid}.ipfs.w3s.link/${name}`,
        },
    });
};

export const retrieve = async (cid: string) => {
    return prisma.storage.findFirst({
        where: {
            cid: cid,
        },
    });
};
