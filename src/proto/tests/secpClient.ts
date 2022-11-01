import { AccountData, DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import base58 from 'bs58';
import { generateSecpDid } from '../utils/did';

export const getSecpClient = async (mnemonic: string) => {
	const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'ixo' });
	const account = (await wallet.getAccounts())[0];

	const secpClient = {
		mnemonic,
		didDoc: '',
		didPrefix: 'did:ixo:',
		did: generateSecpDid(base58.encode(account.pubkey), 'ixo'),

		async getAccounts() {
			return (await wallet.getAccounts()) as AccountData[];
		},

		async signDirect(signerAddress: any, signDoc: any) {
			return await wallet.signDirect(signerAddress, signDoc);
		},
	};

	return secpClient;
};
