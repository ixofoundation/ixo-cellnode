import capabilities from "../service/CapabilitiesService";

declare var Promise: any;

export class InitHandler {

    initialise(did: string) {
        return new Promise((resolve: Function, reject: Function) => {
            var fileSystem = require('fs');
            var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));
            resolve(capabilities.createCapability(did, data.configuration));
        })
    }
}

export default new InitHandler();