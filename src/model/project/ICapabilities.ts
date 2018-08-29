export interface ICapabilities{

    projectDid: string,
    capabilities: [{capability: string,
                    template: string,
                    allow: [string],
                    validateKYC: boolean
                    }]
}