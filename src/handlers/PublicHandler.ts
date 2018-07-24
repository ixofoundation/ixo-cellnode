import publicService from '../service/PublicService';
import { Request } from "../handlers/Request";
import { IPublicModel, Public } from '../model/project/Public';

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
            publicService.findForKey(args.key)
                .then((resp: IPublicModel) => {
                    let obj = {
                        data: resp.data.toString(),
                        contentType: resp.contentType
                    }
                    resolve(obj);
                })
                .catch((err) => {
                    console.log(new Date().getUTCMilliseconds() + ' image fetch error ' + err);
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
            console.log(new Date().getUTCMilliseconds() + ' image found with length ' + img.length);
            res.end(img);
        }).catch((err: any) => {
            res.status(404).send('Sorry, we cannot find that!');
        });

    }
}