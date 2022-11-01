import { AbstractRouter } from "./AbstractRouter";
import { RequestLookupHandler } from "../handlers/RequestHandler";

export class RequestRouter extends AbstractRouter {
    RequestRouter() {
        this.setup = this.setup.bind(this);
    };

    setup() {
        const fileSystem = require("fs");
        let config = {};
        const data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, "utf8"));
        const inst: any = this;
        data.configuration.forEach((obj: any) => {
            const capabilityMethod = obj.capability.charAt(0).toLowerCase() + obj.capability.slice(1);
            console.log("Register " + capabilityMethod);
            inst.register(config, capabilityMethod, RequestLookupHandler[capabilityMethod]);
        });
        return config;
    };
};