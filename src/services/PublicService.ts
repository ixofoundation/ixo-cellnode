import { prisma } from '../prisma/prisma_client';
import Hash from 'ipfs-only-hash';

export const createPublic = async (contentType: string, data: string) => {
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
