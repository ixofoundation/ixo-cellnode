import * as PublicService from "../services/PublicService";
import { dateTimeLogger } from "../logger/Logger";
import { TransactionError } from "../error/TransactionError";
const { fileTypeFromBuffer } = require("file-type");

const validator = require("validator");

const fileTypes = process.env.FILE_TYPES || [""];

export const createPublic = async (args: any) => {
    const buf = Buffer.from(args.data, "base64");
    const file = await fileTypeFromBuffer(buf);
    const mime = file?.mime.toString() || "";
    if (!fileTypes.includes(mime)) {
        return "Invalid File Type";
    }
    return PublicService.createPublic(args.contentType, args.data);
};

export const fetchPublic = async (args: any) => {
    try {
        if (!validator.isAlphanumeric(args.key)) {
            throw new TransactionError("Invalid Value");
        } else {
            const res = await PublicService.getPublic(args.key);
            if (res) {
                return res;
            } else {
                throw new TransactionError("Record not found");
            }
        }
    } catch (error) {
        console.log(dateTimeLogger(" image fetch error " + error, true));
        return;
    }
};

export const getPublic = async (req: any, res: any) => {
    const obj = await fetchPublic(req.params);
    if (obj) {
        res.json(obj);
    } else {
        res.status(404).send("Sorry, we cannot find that!");
    }
};
