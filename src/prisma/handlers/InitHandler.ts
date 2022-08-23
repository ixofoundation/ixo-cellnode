import * as CapabilityService from "../services/CapabilityService";

export const initialise = async (did: string) => {
    const fileSystem = require("fs");
    const data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, "utf8"));
    return CapabilityService.createCapability(did, data.configuration);
};