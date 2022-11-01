export interface ICapability {
    projectDid: string;
    capability: string;
    template: string;
    allow: string[];
    validateKYC: boolean;
};

export const newCapabilitiesDoc = (capabilitiesRes: any) => {
    const capabilitiesArr: any[] = [];
    capabilitiesRes.forEach(element => {
        const capabilityDoc = {
            capability: element.capability,
            template: element.template,
            allow: element.allow,
            validateKYC: element.validateKYC,
        };
        capabilitiesArr.push(capabilityDoc);
    });
    const capabilitiesDoc = {
        projectDid: capabilitiesRes[0].projectDid,
        capabilities: capabilitiesArr,
    };
    return capabilitiesDoc;
};