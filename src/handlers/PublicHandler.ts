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
            resolve(publicService.findForKey(args.key));
        });
    }
}