import { Router } from "express";

const jayson = require("jayson/promise");

export abstract class AbstractRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    init() {
        this.router.post("/", jayson.server(this.setup()).middleware());
    };

    register(config: any, method: string, handlerFunction: Function) {
        config[method] = (args: any) => {
            try {
                return handlerFunction(args);
            } catch (error) {
                return jayson.server().error(null, error);
            };
        };
    };

    setup() { };
};