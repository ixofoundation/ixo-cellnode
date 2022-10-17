import { Capabilities } from "../model/Capabilities";

export const getCapabilities = async (projectDid: string, userDid: string) => {
    const capabilitiesData = await Capabilities.findOne({
        projectDid: projectDid,
    });
    const capabilities = capabilitiesData?.capabilities.filter((capability) =>
        capability.allow.includes(userDid),
    );
    return capabilities;
};
