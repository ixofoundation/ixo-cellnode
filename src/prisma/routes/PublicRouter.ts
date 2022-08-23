import { AbstractRouter } from "./AbstractRouter";
import * as PublicHandler from "../handlers/PublicHandler";

export class PublicRouter extends AbstractRouter {
    setup() {
        let config = {};
        this.register(config, "createPublic", PublicHandler.createPublic);
        this.register(config, "fetchPublic", PublicHandler.fetchPublic);
        return config;
    };
};