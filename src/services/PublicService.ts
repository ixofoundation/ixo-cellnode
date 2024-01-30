import { prisma } from '../prisma/prisma_client.js';
import Hash from 'ipfs-only-hash';

export const createPublic = async (contentType: string, data: string, key?: string) => {
	// Temporarily store data in db if key is provided, unsafe as can be overwritten by anyone
	if (key) {
		const keyStartWithTemp = key.startsWith('temp');
		if (!keyStartWithTemp) return "key must start with 'temp'";

		const base64Data = Buffer.from(data).toString('base64');
		return await prisma.public.upsert({
			where: { key: key },
			update: { contentType: contentType, data: base64Data },
			create: { key: key, contentType: contentType, data: base64Data },
		});
	}

	// remove data encoding format eg: "data:*/*;base64," from data
	const endOfPrefix = data.indexOf(',');
	const cleanData = data.slice(endOfPrefix + 1);
	const dataByteArray = Buffer.from(cleanData, 'base64');
	// options is to match web3 storage options to get same hash
	const cid = await Hash.of(dataByteArray, { cidVersion: 1, rawLeaves: true, leafType: 'raw' });

	const exists = await prisma.public.findFirst({
		where: {
			key: cid,
		},
	});
	if (exists) return exists;

	return prisma.public.create({
		data: {
			key: cid,
			contentType: contentType,
			data: data,
		},
	});
};

export const getPublic = async (key: string) => {
	return prisma.public.findFirst({
		where: {
			key: key,
		},
	});
};
