import { Web3Storage } from "web3.storage";

const token = process.env.WEB3STORAGE_TOKEN || "";
const client = new Web3Storage({ token: token });

export const store = async (data: Buffer, key: string) => {
    const file = new File([data], key);
    const cid = await client.put([file]);
    return cid;
};
