import {Router} from 'express';
import {AbstractRouter} from './AbstractRouter';
import {RequestHandler} from '../handlers/RequestHandler'

declare var Promise: any;

export class RequestRouter extends AbstractRouter {

    RequestRouter(){
        this.setup = this.setup.bind(this);
    }

    setup() {
        var fileSystem = require('fs');

        let config = {};

        var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
        var requestTypes = data.params.payload.request_type;
        var inst: any = this;
        const handler = new RequestHandler();
        requestTypes.forEach(function(obj: any) { 
            var type = obj.type.charAt(0).toLowerCase() + obj.type.slice(1);
            inst.register(config, type, eval("handler." + type));
            }
        );
        
        console.log('request router configured');
        return config;
      }
}

// Create the Router, and export its configured Express.Router
//export default new RequestRouter().router;