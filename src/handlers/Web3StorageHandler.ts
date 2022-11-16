import { Web3Storage } from "web3.storage";

const token = process.env.WEB3STORAGE_TOKEN || "";
const client = new Web3Storage({ token: token });

export const store = async (data: Buffer, key: string, extension: string) => {
    const file = new File([data], `${key}.${extension}`);
    const cid = await client.put([file]);
    return cid;
};

export const retrieve = async (cid: string) => {
    const res = await client.get(cid);
    return res?.files()[0];
};
