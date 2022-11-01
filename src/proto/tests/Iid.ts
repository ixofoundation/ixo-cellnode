import { Registry } from '@cosmjs/proto-signing';
import { AccordedRight, Context, IidDocument, IidMetadata, LinkedEntity, LinkedResource, Service, VerificationMethod } from '../codec/iid/iid';
import {
	MsgAddAccordedRight,
	MsgAddController,
	MsgAddIidContext,
	MsgAddLinkedEntity,
	MsgAddLinkedResource,
	MsgAddService,
	MsgAddVerification,
	MsgCreateIidDocument,
	MsgDeleteAccordedRight,
	MsgDeleteController,
	MsgDeleteIidContext,
	MsgDeleteLinkedEntity,
	MsgDeleteLinkedResource,
	MsgDeleteService,
	MsgRevokeVerification,
	MsgSetVerificationRelationships,
	MsgUpdateIidDocument,
	MsgUpdateIidMeta,
	Verification,
} from '../codec/iid/tx';
import { createClient, getUser, getVerificationMethod } from './common';
import { constants, fee, WalletUsers } from './constants';

export const CreateIidDoc = async (signer: WalletUsers = WalletUsers.tester, userToAddToVerifications?: WalletUsers) => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgCreateIidDocument', MsgCreateIidDocument);
	const client = await createClient(myRegistry, getUser(signer));

	const user = getUser(signer);
	const account = (await user.getAccounts())[0];
	const myAddress = account.address;
	const myPubKey = account.pubkey;
	const did = user.did;

	let verifications = [
		Verification.fromPartial({ relationships: ['authentication'], method: getVerificationMethod(did, myPubKey, did) }),
		Verification.fromPartial({ relationships: ['authentication'], method: getVerificationMethod(`${did}#${myAddress}`, myPubKey, did) }),
	];

	if (userToAddToVerifications) {
		const eUser = getUser(userToAddToVerifications);
		const eUserAccount = (await eUser.getAccounts())[0];
		const eUserAddress = eUserAccount.address;
		const eUserPubKey = eUserAccount.pubkey;
		const eUserdid = eUser.did;

		verifications.push(Verification.fromPartial({ relationships: ['authentication'], method: getVerificationMethod(eUserdid, eUserPubKey, eUserdid) }));
		verifications.push(Verification.fromPartial({ relationships: ['authentication'], method: getVerificationMethod(`${eUserdid}#${eUserAddress}`, eUserPubKey, eUserdid) }));
	}

	const message = {
		typeUrl: '/iid.MsgCreateIidDocument',
		value: MsgCreateIidDocument.fromPartial({
			id: did,
			verifications,
			signer: myAddress,
			controllers: [did],
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const UpdateIidDoc = async (IidDocumentJSON: string) => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgUpdateIidDocument', MsgUpdateIidDocument);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);

	const message = {
		typeUrl: '/iid.MsgUpdateIidDocument',
		value: MsgUpdateIidDocument.fromPartial({
			doc: IidDocument.fromPartial({ id: did, controller: [alice.did] }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const UpdateIidMeta = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgUpdateIidMeta', MsgUpdateIidMeta);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgUpdateIidMeta',
		value: MsgUpdateIidMeta.fromPartial({
			id: did,
			meta: IidMetadata.fromPartial({ versionId: '2' }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddIidContext = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddIidContext', MsgAddIidContext);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgAddIidContext',
		value: MsgAddIidContext.fromPartial({
			id: did,
			context: Context.fromPartial({ key: constants.contextKey, val: 'val' }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteIidContext = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteIidContext', MsgDeleteIidContext);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgDeleteIidContext',
		value: MsgDeleteIidContext.fromPartial({
			id: did,
			contextKey: constants.contextKey,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

/**
 * @param relationships list with values: 'authentication' | 'assertionMethod' | 'keyAgreement' | 'capabilityInvocation' | 'capabilityDelegation'
 */
export const AddVerification = async (relationships: string[] = ['authentication']) => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddVerification', MsgAddVerification);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);
	const aliceAccount = (await alice.getAccounts())[0];

	const message = {
		typeUrl: '/iid.MsgAddVerification',
		value: MsgAddVerification.fromPartial({
			id: did,
			verification: Verification.fromPartial({
				relationships: relationships,
				method: getVerificationMethod(alice.did, aliceAccount.pubkey, alice.did),
			}),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

/**
 * @param relationships list with values: 'authentication' | 'assertionMethod' | 'keyAgreement' | 'capabilityInvocation' | 'capabilityDelegation'
 */
export const SetVerificationRelationships = async (relationships: string[] = ['authentication']) => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgSetVerificationRelationships', MsgSetVerificationRelationships);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);

	const message = {
		typeUrl: '/iid.MsgSetVerificationRelationships',
		value: MsgSetVerificationRelationships.fromPartial({
			id: did,
			methodId: alice.did,
			relationships: relationships,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const RevokeVerification = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgRevokeVerification', MsgRevokeVerification);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);

	const message = {
		typeUrl: '/iid.MsgRevokeVerification',
		value: MsgRevokeVerification.fromPartial({
			id: did,
			methodId: alice.did,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddAccordedRight = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddAccordedRight', MsgAddAccordedRight);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const accordedRight = getUser(WalletUsers.accordedRight);

	const message = {
		typeUrl: '/iid.MsgAddAccordedRight',
		value: MsgAddAccordedRight.fromPartial({
			id: accordedRight.did,
			accordedRight: AccordedRight.fromPartial({
				type: 'type',
				id: constants.accordedRightId,
				mechanism: 'mechanism',
				message: 'message',
				service: 'service',
			}),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteAccordedRight = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteAccordedRight', MsgDeleteAccordedRight);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const accordedRight = getUser(WalletUsers.accordedRight);

	const message = {
		typeUrl: '/iid.MsgDeleteAccordedRight',
		value: MsgDeleteAccordedRight.fromPartial({
			id: accordedRight.did,
			rightId: constants.accordedRightId,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddController = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddController', MsgAddController);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const bob = getUser(WalletUsers.bob);

	const message = {
		typeUrl: '/iid.MsgAddController',
		value: MsgAddController.fromPartial({
			id: did,
			controllerDid: bob.did,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteController = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteController', MsgDeleteController);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const bob = getUser(WalletUsers.bob);

	const message = {
		typeUrl: '/iid.MsgDeleteController',
		value: MsgDeleteController.fromPartial({
			id: did,
			controllerDid: bob.did,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddLinkedEntity = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddLinkedEntity', MsgAddLinkedEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgAddLinkedEntity',
		value: MsgAddLinkedEntity.fromPartial({
			id: did,
			linkedEntity: LinkedEntity.fromPartial({ id: constants.linkedEntityId }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteLinkedEntity = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteLinkedEntity', MsgDeleteLinkedEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgDeleteLinkedEntity',
		value: MsgDeleteLinkedEntity.fromPartial({
			id: did,
			entityId: constants.linkedEntityId,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddLinkedResource = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddLinkedResource', MsgAddLinkedResource);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgAddLinkedResource',
		value: MsgAddLinkedResource.fromPartial({
			id: did,
			linkedResource: LinkedResource.fromPartial({ id: constants.linkedResourceId, description: 'Description' }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteLinkedResource = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteLinkedResource', MsgDeleteLinkedResource);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgDeleteLinkedResource',
		value: MsgDeleteLinkedResource.fromPartial({
			id: did,
			resourceId: constants.linkedResourceId,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const AddService = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgAddService', MsgAddService);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgAddService',
		value: MsgAddService.fromPartial({
			id: did,
			serviceData: Service.fromPartial({ id: constants.serviceId, serviceEndpoint: 'https://ixo.world', type: 'awesome' }),
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const DeleteService = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/iid.MsgDeleteService', MsgDeleteService);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/iid.MsgDeleteService',
		value: MsgDeleteService.fromPartial({
			id: did,
			serviceId: constants.serviceId,
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};
