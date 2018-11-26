import {AbstractRouter} from './AbstractRouter';
import {PublicHandler} from '../handlers/PublicHandler'

declare var Promise: any;

export class PublicRouter extends AbstractRouter{

    setup() {
        let config = {};
    
        const handler = new PublicHandler();
        this.register(config, "createPublic", handler.createPublic);
        this.register(config, "fetchPublic", handler.fetchPublic);
        return config;
      }
}