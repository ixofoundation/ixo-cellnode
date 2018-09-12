import {AbstractRouter} from './AbstractRouter';
import {RequestHandler} from '../handlers/RequestHandler';

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
        data.configuration.forEach((obj: any) => { 
            var capabilityMethod = obj.capability.charAt(0).toLowerCase() + obj.capability.slice(1);
            console.log('register handler.' + capabilityMethod);
            inst.register(config, capabilityMethod, eval('handler.' + capabilityMethod));
            }
        );
        return config;
      }
}