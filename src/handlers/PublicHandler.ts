import publicService from '../service/PublicService';
import { Request } from "../handlers/Request";
import { IPublicModel, Public } from '../model/project/Public';

declare var Promise: any;

export class PublicHandler {

    createPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(publicService.createPublic(args.data, args.contentType));
        });
    }

    fetchPublic = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
            var payload = publicService.findForKey(args.key)
            .then((resp: IPublicModel) => {
                console.log('response is:' + resp);
                console.log('data is: ' + resp.data);
                let obj = {
                    data: resp.data.toString(),
                    contentType: resp.contentType
                }
                resolve(obj);
            });
        });
    }
}