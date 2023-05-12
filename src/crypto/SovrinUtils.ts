import { createHash } from 'crypto';

require('dateformat');
const base58 = require('bs58');
const sovrin = require('sovrin-did');

export class SovrinUtils {
	generateBip39Mnemonic() {
		const bip39 = require('bip39');
		return bip39.generateMnemonic();
	}

	generateSdidFromMnemonic(mnemonic: any) {
		// Create sha256 hash from Menmonic
		const seed = createHash('sha256').update(mnemonic).digest('hex');

		// Convert SHA256 hash to Uint8Array
		const didSeed = new Uint8Array(32);
		for (let i = 0; i < 32; ++i) {
			didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16);
		}

		// Create the Sovrin DID
		return sovrin.fromSeed(didSeed);
	}

	verifyDocumentSignature(signature: any, publicKey: any): boolean {
		//return !(sovrin.verifySignedMessage(base58.decode(signature), base58.decode(publicKey)) === false);
		return !(sovrin.verifySignedMessage(base58.decode(signature), publicKey) === false);
	}

	//Signs a document using signKey from generated SDID and returns the signature
	signDocumentNoEncoding(signKey: string, verifyKey: string, did: string, input: any) {
		let toSign = input;
		// Stringify the input if it is an object
		if (typeof input == 'object') {
			toSign = JSON.stringify(input);
		}
		const signedMsg = sovrin.signMessage(toSign, signKey, verifyKey);
		return Buffer.from(signedMsg.slice(0, 64)).toString('base64');
	}
}

export default SovrinUtils;
