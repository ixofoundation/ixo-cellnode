import { Ed25519, sha256 } from '@cosmjs/crypto';
import { toUtf8, Bech32, toBase64 } from '@cosmjs/encoding';
import { makeSignBytes } from '@cosmjs/proto-signing';
import { decode } from 'bs58';
import sovrin from 'sovrin-did';

export const getEdClient = (mnemonic: string) => {
	const didDoc = sovrin.fromSeed(sha256(toUtf8(mnemonic)).slice(0, 32));

	const edClient = {
		mnemonic,
		didDoc,
		didPrefix: 'did:ixo:',
		did: 'did:ixo:' + didDoc.did,

		async getAccounts() {
			return [
				{
					algo: 'ed25519-sha-256',
					pubkey: Uint8Array.from(decode(didDoc.verifyKey)),
					address: Bech32.encode('ixo', sha256(decode(didDoc.verifyKey)).slice(0, 20)),
				},
			];
		},

		async signDirect(signerAddress: any, signDoc: any) {
			const account = (await this.getAccounts()).find(({ address }) => address === signerAddress);
			if (!account) throw new Error(`Address ${signerAddress} not found in wallet`);

			const keypair = await Ed25519.makeKeypair(sha256(toUtf8(mnemonic)).slice(0, 32));
			const signBytes = makeSignBytes(signDoc);
			const signatureArray = await Ed25519.createSignature(signBytes, keypair);
			const signatureBase64 = toBase64(signatureArray.slice(0, 64));

			return {
				signed: signDoc,
				signature: {
					signature: signatureBase64,
					pub_key: {
						type: 'tendermint/PubKeyEd25519',
						value: toBase64(account.pubkey),
					},
				},
			};
		},
	};

	return edClient;
};
