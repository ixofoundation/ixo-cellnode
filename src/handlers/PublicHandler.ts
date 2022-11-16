import * as PublicService from "../services/PublicService";
import { dateTimeLogger } from "../logger/Logger";
import { TransactionError } from "../error/TransactionError";

const validator = require("validator");

const MAX_AGE = 60 * 60 * 24 * 7;

export const createPublic = async (args: any) => {
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
        });
    } else {
        res.status(404).send("Sorry, we cannot find that!");
    }
};
