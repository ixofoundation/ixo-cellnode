import {Router} from 'express';
import {AbstractRouter} from './AbstractRouter';
import {RequestHandler} from '../handlers/RequestHandler'

declare var Promise: any;

export class RequestRouter extends AbstractRouter{

    setup() {
        let config = {};
    
        const handler = new RequestHandler();
        this.register(config, "createAgent", handler.createAgent);
        this.register(config, "updateAgentStatus", handler.updateAgentStatus);
        this.register(config, "submitClaim", handler.submitClaim);
        this.register(config, "evaluateClaim", handler.evaluateClaim);
        console.log('request router configured');
        return config;
      }
}

// Create the Router, and export its configured Express.Router
export default new RequestRouter().router;