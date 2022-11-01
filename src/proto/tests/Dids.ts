import { Registry } from '@cosmjs/proto-signing';
import { Claim, DidCredential } from '../codec/did/did';
import { MsgAddCredential, MsgAddDid } from '../codec/did/tx';
import { createClient, getUser } from './common';
import { fee } from './constants';

export const AddDid = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/did.MsgAddDid', MsgAddDid);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const message = {
		typeUrl: '/did.MsgAddDid',
		value: MsgAddDid.fromPartial({
			// @ts-ignore
			did: tester.didSov,
			pubKey: tester.didDoc.verifyKey,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddCredential = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/did.MsgAddCredential', MsgAddCredential);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const message = {
		typeUrl: '/did.MsgAddCredential',
		value: MsgAddCredential.fromPartial({
			didCredential: DidCredential.fromPartial({
				credType: [''],
				issuer: '',
				issued: '',
				claim: Claim.fromPartial({
					id: '',
					KYCValidated: false,
				}),
			}),
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};
