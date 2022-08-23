import { prisma } from "../prisma_client";

export const createCapability = async (projectDid: string, capabilities: any) => {
    try {
        let res: any;
        capabilities.forEach(async capability => {
            res += await prisma.capability.create({
                data: {
                    projectDid: projectDid,
                    capability: capability.capability,
                    template: capability.template,
                    allow: capability.allow ? capabilities.allow : [],
                    validateKYC: capability.validateKYC ? capabilities.validateKYC : true,
                },
            });
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const findCapabilities = async () => {
    try {
        const res = await prisma.capability.findMany();
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const findCapabilitiesForProject = async (projectDid: string) => {
    try {
        const res = await prisma.capability.findMany({
            where: {
                projectDid: projectDid,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const addCapabilities = async (projectDid: string, dids: string[], capability: string) => {
    try {
        const res = await prisma.capability.updateMany({
            where: {
                projectDid: projectDid,
                capability: capability,
            },
            data: {
                allow: {
                    push: dids,
                },
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return;
    };
};

export const removeCapabilities = async (projectDid: string, did: string, capability: string) => {
    try {
        const currentAllow = await prisma.capability.findFirst({
            where: {
                projectDid: projectDid,
                capability: capability,
            },
            select: {
                allow: true,
            },
        });
        if (currentAllow) {
            const currentAllowArr = currentAllow.allow;
            const index = currentAllowArr.indexOf(did);
            if (index !== -1) {
                currentAllowArr.splice(index, 1);
                const res = await prisma.capability.updateMany({
                    where: {
                        projectDid: projectDid,
                        capability: capability,
                    },
                    data: {
                        allow: currentAllowArr,
                    },
                });
                return res;
            } else {
                return;
            };
        };
        return;
    } catch (error) {
        console.log(error);
        return;
    };
};