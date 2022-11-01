import base58 from 'bs58';

export function generateSecpDid(pubkey: string, prefix?: string) {
	const pubKeyBz = base58.decode(pubkey);
	const did = base58.encode(pubKeyBz.slice(0, 16));
	return 'did:' + (prefix || 'ixo') + ':' + did;
}
