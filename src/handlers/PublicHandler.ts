import publicService from '../service/PublicService';
import { IPublicModel } from '../model/project/Public';

var dateFormat = require('dateformat');

declare var Promise: any;

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export class PublicHandler {

    dateTimeLogger(): string {
        return dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss:l");
    }

    createPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(publicService.createPublic(args.data, args.contentType));
        });
    }

    fetchPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            publicService.findForKey(args.key)
                .then((resp: IPublicModel) => {
                    let obj = {
                        data: resp.data.toString(),
                        contentType: resp.contentType
                    }
                    resolve(obj);
                })
                .catch((err) => {
                    console.log(this.dateTimeLogger() + ' image fetch error ' + err);
                    reject(err);
                });
        });
    }

    getPublic = (req: any, res: any) => {
        return this.fetchPublic(req.params).then((obj: any) => {
            let img = new Buffer(obj.data, 'base64');
            let maxAge = 0;
            if (obj.contentType.indexOf('image/') == 0) {
                maxAge = MAX_AGE;
            }
            res.writeHead(200, {
                'Cache-Control': 'public, max-age=' + maxAge,
                'Content-Type': obj.contentType,
                'Content-Length': img.length
            });
            console.log(this.dateTimeLogger() + ' image found with length ' + img.length);
            res.end(img);
        }).catch((err: any) => {
            res.status(404).send('Sorry, we cannot find that!');
        });

    }
}