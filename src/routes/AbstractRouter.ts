import { Router } from 'express';
import { Promise } from 'mongoose';

const jayson = require('jayson/promise');

export abstract class AbstractRouter {
    router: Router

    /**
     * Initialize the Router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/', jayson.server(this.setup()).middleware());
    }

    register(config: any, method: string, handlerFunction: Function) {
        config[method] = (args: any) => {
            return new Promise((resolve: Function, reject: Function) => {
                handlerFunction(args)
                    .then((data: any) => resolve(data))
                    .catch((err: Error) => {
                        reject(jayson.server().error(null, err.message))
                    });
            });
        };
    }

    setup() { }

}

