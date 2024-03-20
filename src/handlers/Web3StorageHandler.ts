import { File, Blob } from 'web3.storage';
import { prisma } from '../prisma/prisma_client.js';
import * as Client from '@web3-storage/w3up-client';
import * as Signer from '@ucanto/principal/ed25519';
import { importDAG } from '@ucanto/core/delegation';
import { CarReader } from '@ipld/car';
import { StoreMemory } from '@web3-storage/access/stores/store-memory';

/**
 * @param name  The name of the file
 * @param contentType  The content type of the file
 * @param data  The base64 encoded data of the file
 * @returns  The CID of the file
 * @throws  Error if the file could not be stored
 */
export const store = async (name: string, contentType: string, data: string) => {
	const buffer = Buffer.from(data, 'base64');
	const blob = new Blob([buffer], { type: contentType });
	const file = new File([blob], name, { type: contentType });
	const cid = await Web3Client.instance.store(file);
	const exists = await prisma.storage.findFirst({
		where: {
			cid: cid.toString(),
		},
	});
	if (exists) return exists;
	return prisma.storage.create({
		data: {
			cid: cid.toString(),
			name: name,
			ipfs: `${cid}.ipfs.w3s.link`,
		},
	});
};

export const retrieve = async (cid: string) => {
	return prisma.storage.findFirst({
		where: {
			cid: cid,
		},
	});
};

export class Web3Client {
	constructor() {
		this.checkInitiated();
	}

	public static instance = new Web3Client();

	private client: Client.Client | undefined;
	private key = process.env.WEB3_KEY;
	private proof = process.env.WEB3_PROOF;
	private loading = false;

	async checkInitiated() {
		if (!this.key || !this.proof) throw new Error('Environment variables not set');
		await this.init();
	}

	async init() {
		if (this.loading) return;
		this.loading = true;
		try {
			if (!this.client) {
				// Load client with specific private key
				const principal = Signer.parse(this.key!);
				this.client = await Client.create({ principal, store: new StoreMemory() });
				// Add proof that this agent has been delegated capabilities on the space
				const proof = await this.parseProof(this.proof!);
				const space = await this.client.addSpace(proof);
				await this.client.setCurrentSpace(space.did());
				// READY to go!
			}
		} catch (error) {
			this.client = undefined;
			this.loading = false;
			throw error;
		} finally {
			this.loading = false;
		}
	}

	// ====================================
	//  CLAIMS
	// ====================================
	async store(file: File) {
		await this.checkInitiated();

		if (!this.client) throw new Error('Client not found, please try again later');

		const cid = await this.client.uploadFile(file);
		return cid;
	}

	/** @param {string} data Base64 encoded CAR file */
	async parseProof(data: string) {
		const blocks: any[] = [];
		const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'));
		for await (const block of reader.blocks()) {
			blocks.push(block);
		}
		return importDAG(blocks);
	}
}
