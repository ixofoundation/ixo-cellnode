import { Capabilities } from "../model/Capabilities";

export const getCapabilitiesByProjectDid = async (projectDid: string) => {
    return Capabilities.find({ projectDid: projectDid });
};
