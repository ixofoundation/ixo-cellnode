import {Router} from 'express';
import {AbstractRouter} from './AbstractRouter';
import {InitHandler} from '../handlers/InitHandler'

declare var Promise: any;

export class InitRouter extends AbstractRouter{

    setup() {
        let config = {};
        const handler = new InitHandler();
        this.register(config, "initPds", handler.initPds);
        console.log('init router configured');
        return config;
      }
}

// Create the Router, and export its configured Express.Router
//export default new InitRouter().router;