import { prisma } from '../prisma/prisma_client';

export const getCapabilities = async (projectDid: string, userDid: string) => {
	const capabilitiesData = await prisma.capability.findMany({
		where: {
			projectDid: projectDid,
		},
	});
	const capabilities = capabilitiesData?.filter(capability => capability.allow.includes(userDid));
	return capabilities;
};
