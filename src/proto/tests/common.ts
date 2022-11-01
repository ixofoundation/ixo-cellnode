import { SigningStargateClient as CustomSigningStargateClient } from '../utils/customClient';
import { Random } from '@cosmjs/crypto';
import { toHex } from '@cosmjs/encoding';
import { Registry } from '@cosmjs/proto-signing';
import { assertIsDeliverTxSuccess, DeliverTxResponse } from '@cosmjs/stargate';
import axios from 'axios';
import base58 from 'bs58';
import { VerificationMethod } from '../codec/iid/iid';
import { Bip39 } from '../utils/fromMm';
import { keyType, KeyTypes, RPC_URL, WalletUsers } from './constants';
import { getEdClient } from './edClient';
import { getSecpClient } from './secpClient';
import { accountFromAny } from '../utils/EdAccountHandler';

export const generateId = (length: number = 12) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const generateMnemonic = (length: 12 | 15 | 18 | 21 | 24 = 12) => {
	const entropyLength = 4 * Math.floor((11 * length) / 33);
	const entropy = Random.getBytes(entropyLength);
	const mnemonic = Bip39.encode(entropy);
	return mnemonic.toString();
};

export const sendFaucet = async (address: string) => {
	return await axios.post('https://devnet-faucet.ixo.earth/credit', { denom: 'uixo', address: address });
};

export const getVerificationMethod = (did: string, pubkey: Uint8Array, controller: string, type: KeyTypes = keyType) => {
	return VerificationMethod.fromPartial({ id: did, type: type === 'ed' ? 'Ed25519VerificationKey2018' : 'EcdsaSecp256k1VerificationKey2019', publicKeyMultibase: 'F' + toHex(pubkey), controller: controller });
};

export type wallet = { ed: ReturnType<typeof getEdClient>; secp: ReturnType<typeof getEdClient> };

export let wallets: { [key in WalletUsers]: wallet };

export const generateWallets = async () => {
	let generatedWallets = {};
	for (const user of Object.values(WalletUsers)) {
		const mnemonics = generateMnemonic(24);
		generatedWallets[user] = { ed: getEdClient(mnemonics), secp: await getSecpClient(mnemonics) };
	}
	wallets = generatedWallets as any;

	// Logs wallet for tester to see account details for wallets
	let walletLog = {};
	for (const [user, wallet] of Object.entries(wallets)) {
		const edAccount = (await wallet.ed.getAccounts())[0];
		const secpAccount = (await wallet.secp.getAccounts())[0];
		walletLog[user] = {
			ed: { did: wallet.ed.did, address: edAccount.address, publicKey: base58.encode(edAccount.pubkey) },
			secp: { did: wallet.secp.did, address: secpAccount.address, publicKey: base58.encode(secpAccount.pubkey) },
		};
	}
	console.log(walletLog);
};

export const generateNewWallet = async (user: WalletUsers) => {
	const mnemonics = generateMnemonic();
	const wallet = { ed: getEdClient(mnemonics), secp: await getSecpClient(mnemonics) };
	wallets[user] = wallet;

	const edAccount = (await wallet.ed.getAccounts())[0];
	const secpAccount = (await wallet.secp.getAccounts())[0];
	console.log({
		[user]: {
			ed: { did: wallet.ed.did, address: edAccount.address, publicKey: base58.encode(edAccount.pubkey) },
			secp: { did: wallet.secp.did, address: secpAccount.address, publicKey: base58.encode(secpAccount.pubkey) },
		},
	});
};

export const getUser = (user: WalletUsers = WalletUsers.tester, walletKeyType: KeyTypes = keyType) => wallets[user][walletKeyType];

export const createClient = async (
	myRegistry: Registry,
	offlineWallet: ReturnType<typeof getEdClient> = getUser(),
	walletKeyType: KeyTypes = keyType,
	ignoreGetSequence?: boolean,
): Promise<CustomSigningStargateClient> => {
	return await CustomSigningStargateClient.connectWithSigner(
		RPC_URL,
		// @ts-ignore
		offlineWallet,
		{
			registry: myRegistry,
			accountParser: accountFromAny,
		},
		walletKeyType,
		ignoreGetSequence,
	);
};

export const checkSuccess = (res: DeliverTxResponse, succeed: boolean) => {
	let isSuccess = true;
	try {
		assertIsDeliverTxSuccess(res);
	} catch (error) {
		// Only print error if expects to succeed
		if (succeed) console.log({ error });
		isSuccess = false;
	}
	succeed ? expect(isSuccess).toBeTruthy() : expect(isSuccess).toBeFalsy();
};

export const testMsg = (message: string, action: () => Promise<DeliverTxResponse>, succeed: boolean = true) => {
	return test(message, async () => {
		console.log('Testing ' + message);
		checkSuccess(await action(), succeed);
	});
};

export const sendFromFaucet = (user: WalletUsers) => {
	return test('send tokens from faucet', async () => {
		const tester = getUser(user);
		const account = (await tester.getAccounts())[0];
		console.log(`Sending tokens from faucet to: ${user}(${account.address})`);
		const res = await sendFaucet(account.address);
		expect(res.data).toBe('ok');
	});
};

export const getDidFromEvents = (res: DeliverTxResponse) => {
	// console.log(res);
	return JSON.parse(res.rawLog)[0]
		['events'].find((e: any) => e.type === 'iid.IidDocumentCreatedEvent')
		['attributes'].find((e: any) => e.key === 'did')
		['value'].replaceAll('"', '');
};
