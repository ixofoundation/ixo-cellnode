import { File, Blob } from 'web3.storage';
import { prisma } from '../prisma/prisma_client.js';
import { Client } from '@web3-storage/w3up-client/dist/src/client';
import { Account } from '@web3-storage/w3up-client/dist/src/account';
import { OwnedSpace, Space } from '@web3-storage/w3up-client/dist/src/space';
import { create } from '@web3-storage/w3up-client';

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

	private client: Client | undefined;
	private email = process.env.WEB3_STORAGE_EMAIL;
	private space = process.env.WEB3_STORAGE_SPACE;
	private loading = false;

	async checkInitiated() {
		if (!this.email || !this.space) throw new Error('Environment variables not set');
		await this.init();
	}

	async init() {
		if (this.loading) return;
		this.loading = true;
		try {
			if (!this.client) this.client = await create();

			const didUsername = this.email!.split('@')[0];
			let accounts = this.client.accounts();
			let account: Account;
			// first time setup!
			if (!Object.keys(accounts).length) {
				// waits for you to click the link in your email to verify your identity
				account = await this.client.login(this.email as any);
			} else {
				account = accounts[Object.keys(accounts).find(k => k.includes(didUsername)) ?? 0];
			}
			if (!account) throw new Error('Account not found');

			// wait for payment plan to be selected
			let count = 0;
			while (true) {
				count++;
				const res = await account.plan.get();
				if (res.ok) break;
				console.log('Waiting for payment plan to be selected...');
				if (count > 10) throw new Error('Payment plan not selected');
				await new Promise(resolve => setTimeout(resolve, 10000));
			}

			// get the space associated with the account
			let spaces = this.client.spaces();
			let space: Space | OwnedSpace | undefined = spaces.length ? spaces.find(s => s.name === this.space) : undefined;
			// create a space for your uploads
			space = space ?? (await this.client.createSpace(this.space as any));
			if (!space) throw new Error('Space not found');
			// provision your space with your account:
			await account.provision(space.did());
			// save the space to the store, and set as "current"
			// @ts-ignore
			if (space.createRecovery) await space.createRecovery(account.did());
			// @ts-ignore
			if (space.save) await space.save();

			await this.client.setCurrentSpace(space.did());
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
}
