export interface ICapability {
    projectDid: string;
    capability: string;
    template: string;
    allow: string[];
    validateKYC: boolean;
};