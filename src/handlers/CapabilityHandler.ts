import { Capabilities, ICapabilitiesModel } from "../model/Capabilities";

export const getCapabilities = async (projectDid: string, userDid: string) => {
    const capabilities = await Capabilities.find({ projectDid: projectDid });
    const capabilitiesByUser: ICapabilitiesModel[] = [];
    capabilities.forEach((capability) => {
        capability.capabilities.forEach((cap) => {
            if (cap.allow.includes(userDid))
                capabilitiesByUser.push(capability);
        });
    });
    return capabilitiesByUser;
};
