import {AbstractRouter} from './AbstractRouter';
import {QueryHandler} from '../handlers/QueryHandler'

declare var Promise: any;

export class QueryRouter extends AbstractRouter{

    setup() {
        let config = {};
    
        const handler = new QueryHandler();
        this.register(config, "queryTransactions", handler.queryTransactions);
        this.register(config, "queryCapabilities", handler.queryCapabilities);
        return config;
      }
}
