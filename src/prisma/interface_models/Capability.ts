export interface ICapabilities {
    projectDid: string;
    capability: string;
    template: string;
    allow: string[];
    validateKYC: boolean;
};