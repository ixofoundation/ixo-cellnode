import * as PublicService from "../services/PublicService";
import { dateTimeLogger } from "../../logger/Logger";
import { TransactionError } from "../../error/TransactionError";

const validator = require("validator");

const MAX_AGE = 60 * 60 * 24 * 7;

export const createPublic = async (args: any) => {
    return PublicService.createPublic(args.data, args.contentType);
};

export const fetchPublic = async (args: any) => {
    try {
        if (!validator.isAlphanumeric(args.key)) {
            throw new TransactionError("Invalid Value");
        } else {
            const res = await PublicService.findForKey(args.key);
            if (res) {
                const obj = {
                    data: res.data.toString(),
                    contentType: res.contentType,
                };
                return obj;
            } else {
                throw new TransactionError("Record not found");
            }
        };
    } catch (error) {
        console.log(dateTimeLogger() + " image fetch error " + error);
        return;
    };
};

export const getPublic = async (req: any, res: any) => {
    const obj = await fetchPublic(req.params);
    if (obj) {
        const img = Buffer.from(obj.data, "base64");
        let maxAge = 0;
        if (obj.contentType.indexOf("image/") == 0) {
            maxAge = MAX_AGE;
        };
        res.writeHead(200, {
            "Cache-Control": "public, max-age=" + maxAge,
            "Content-Type": obj.contentType,
            "Content_Length": img.length,
        });
        console.log(dateTimeLogger() + "image found with length " + img.length);
        res.end(img);
    } else {
        res.status(404).send("Sorry, we cannot find that!");
    };
};