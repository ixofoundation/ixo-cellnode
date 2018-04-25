import {Router} from 'express';
import {AbstractRouter} from './AbstractRouter';
import {RequestHandler} from '../handlers/RequestHandler';

declare var Promise: any;



export class RequestRouter extends AbstractRouter {

    RequestRouter(){
        this.setup = this.setup.bind(this);
    }

    setup() {
        var fileSystem = require('fs');

        let config = {};

        var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
        var inst: any = this;
        const handler = new RequestHandler();
        data.configuration.forEach(function(obj: any) { 
            var type = obj.capability.charAt(0).toLowerCase() + obj.capability.slice(1);
            console.log('REGISTER REQUEST TYPE handler.' + type);
            inst.register(config, type, eval('handler.' + type));
            }
        );
        
        console.log('request router configured');
        return config;
      }
}