import publicService from '../service/PublicService';
import { IPublicModel } from '../model/Public';
import { dateTimeLogger } from '../logger/Logger';
import { TransactionError } from '../error/TransactionError';
var validator = require('validator');

declare var Promise: any;

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export class PublicHandler {

    createPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(publicService.createPublic(args.data, args.contentType));
        });
    }

    fetchPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                if (!validator.isAlphanumeric(args.key)) {
                    reject(new TransactionError('Invalid value'))
                } else {
                    publicService.findForKey(args.key)
                        .then((resp: IPublicModel) => {
                            if (resp != undefined) {
                                let obj = {
                                    data: resp.data.toString(),
                                    contentType: resp.contentType
                                }
                                resolve(obj);
                            } else { throw new TransactionError('Record not found') }
                        })
                        .catch((err) => {
                            console.log(dateTimeLogger() + ' image fetch error ' + err);
                            reject(err);
                        });
                }
            } catch (error) {
                reject(new TransactionError('Invalid value'))
            }

        });
    }

    getPublic = (req: any, res: any) => {
        return this.fetchPublic(req.params)
            .then((obj: any) => {
                let img = Buffer.from(obj.data, 'base64');
                let maxAge = 0;
                if (obj.contentType.indexOf('image/') == 0) {
                    maxAge = MAX_AGE;
                }
                res.writeHead(200, {
                    'Cache-Control': 'public, max-age=' + maxAge,
                    'Content-Type': obj.contentType,
                    'Content-Length': img.length
                });
                console.log(dateTimeLogger() + ' image found with length ' + img.length);
                res.end(img);
            }).catch((err: any) => {
                res.status(404).send('Sorry, we cannot find that!');
            });
    }
}