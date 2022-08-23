import { AbstractRouter } from "./AbstractRouter";
import * as QueryHandler from "../handlers/QueryHandler";

export class QueryRouter extends AbstractRouter {
    setup() {
        let config = {};
        this.register(config, "queryTransactions", QueryHandler.queryTransactions);
        this.register(config, "queryCapabilities", QueryHandler.queryCapabilities);
        return config;
    };
};