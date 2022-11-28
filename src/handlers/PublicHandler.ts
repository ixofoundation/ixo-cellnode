import * as PublicService from "../services/PublicService";
import { dateTimeLogger } from "../logger/Logger";
import { TransactionError } from "../error/TransactionError";
const { fileTypeFromBuffer } = require("file-type");

const validator = require("validator");

const fileTypes = process.env.FILE_TYPES || [""];

export const createPublic = async (args: any) => {
    const file = await fileTypeFromBuffer(args.data);
    const mime = file?.mime.toString() || "";
    if (!fileTypes.includes(mime)) {
        return "Invalid File Type";
    }
    return PublicService.createPublic(
        args.data,
        args.extension,
        args.contentType,
    );
};

export const fetchPublic = async (args: any) => {
    try {
        if (!validator.isAlphanumeric(args.key)) {
            throw new TransactionError("Invalid Value");
        } else {
            const res = await PublicService.findForKey(args.key);
            if (res?.record && res.file) {
                const obj = {
                    key: res.record.key,
                    cid: res.file.cid,
                    extension: res.record.extension,
                    contentType: res.record.contentType,
                };
                return obj;
            } else {
                throw new TransactionError("Record not found");
            }
        }
    } catch (error) {
        console.log(dateTimeLogger() + " image fetch error " + error);
        return;
    }
};

export const getPublic = async (req: any, res: any) => {
    const obj = await fetchPublic(req.params);
    if (obj) {
        res.json({
            url: `${obj.cid}.ipfs.w3s.link/${obj.key}.${obj.extension}`,
            cid: obj.cid,
        });
    } else {
        res.status(404).send("Sorry, we cannot find that!");
    }
};
