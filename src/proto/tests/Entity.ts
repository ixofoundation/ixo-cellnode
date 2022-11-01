import { Registry } from '@cosmjs/proto-signing';
import { MsgCreateEntity, MsgTransferEntity, MsgUpdateEntity, MsgUpdateEntityConfig } from '../codec/entity/tx';
import { AccordedRight, Context, LinkedResource, Service } from '../codec/iid/iid';
import { createClient, getUser } from './common';
import { fee, WalletUsers } from './constants';

export const CreateEntityAsset = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgCreateEntity', MsgCreateEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/entity.MsgCreateEntity',
		value: MsgCreateEntity.fromPartial({
			entityType: 'asset',
			entityStatus: 0,
			// @ts-ignore
			context: [Context.fromPartial({ key: 'ixo', value: 'https://w3id.org/ixo/v1' })],
			ownerDid: did,
			ownerAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const CreateEntityAssetSupamoto = async (inheritEntityDid: string) => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgCreateEntity', MsgCreateEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/entity.MsgCreateEntity',
		value: MsgCreateEntity.fromPartial({
			entityType: 'protocol',
			entityStatus: 0,
			// @ts-ignore
			context: [Context.fromPartial({ key: 'ixo', value: inheritEntityDid })],
			service: [
				Service.fromPartial({ id: 'did:ixo:entity:abc123#cellnode-pandora', type: 'cellnode', serviceEndpoint: 'https://cellnode-pandora.ixo.earth' }),
				Service.fromPartial({ id: 'did:ixo:entity:abc123#ixo', type: 'chainService', serviceEndpoint: 'https://proxies.sifchain.finance/api/impacthub-3/rpc' }),
				Service.fromPartial({ id: 'did:ixo:entity:abc123#supamoto', type: 'linkedDomains', serviceEndpoint: 'https://legal.supamoto.se/' }),
				Service.fromPartial({ id: 'did:ixo:entity:abc123#dashboard', type: 'linkedDomains', serviceEndpoint: 'https://supamoto.jambo.earth/?id={stoveId}' }),
			],
			linkedResource: [
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwa',
					type: 'tokenMetadata',
					description: 'SumaMoto Token Collection Template',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/m5tf6df728jl2hsi8fwa',
					proof: 'm5tf6df728jl2hsi8fwa',
					encrypted: 'false',
					right: '#mintNft',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#{tokenid.json}',
					type: 'tokenMetadata',
					description: 'SumaMoto Token Template',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/{tokenid.json}',
					proof: '{tokenid}',
					encrypted: 'false',
					right: '#mintCarbonToken',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwb',
					type: 'page',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/m5tf6df728jl2hsi8fwb',
					proof: 'm5tf6df728jl2hsi8fwb',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwc',
					type: 'settings',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/df728jl2hsi8fwm5tf6',
					proof: 'df728jl2hsi8fwm5tf6',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwd',
					type: 'claims',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/jl2hsi8fwm5tf6df728',
					proof: 'jl2hsi8fwm5tf6df728',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwe',
					type: 'filters',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/hsi8fwmjl25tf6df728',
					proof: 'hsi8fwmjl25tf6df728',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#certification*',
					type: 'verifiableCredential',
					description: 'Project Certification',
					mediaType: 'application/ld+json',
					serviceEndpoint: '#cellnode-pandora/public/****',
					proof: '****',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#dashboard*',
					type: 'service',
					description: 'Dashboard',
					mediaType: 'application/http',
					serviceEndpoint: '#dashboard/?id={stoveId}',
					proof: '',
					encrypted: 'false',
					right: 'view',
				}),
			],
			accordedRight: [
				AccordedRight.fromPartial({
					id: 'did:ixo:entity:abc123#mintNFT',
					type: 'mint',
					mechanism: 'cw721',
					message: 'msgMintNFT',
					service: '#ixo',
				}),
				AccordedRight.fromPartial({
					id: 'did:ixo:entity:abc123#mintCarbonToken',
					type: 'mint',
					mechanism: 'cw1155',
					message: 'msgMint/carbon',
					service: '#ixo',
				}),
				AccordedRight.fromPartial({
					id: 'did:ixo:entity:abc123#carbonCreditClaim',
					type: 'claim/carbonCredit',
					mechanism: 'claimApproval',
					message: 'msgSubmitClaim',
					service: '#ixo',
				}),
				AccordedRight.fromPartial({
					id: 'https://legal.supamoto.se/supamoto/termsAndConditions.pdf',
					type: 'legal',
					mechanism: 'enforceable',
					message: '',
					service: '#supamoto',
				}),
			],
			linkedEntity: [],
			ownerDid: did,
			ownerAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const CreateEntityAssetSupamotoInstance = async (inheritEntityDid: string) => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgCreateEntity', MsgCreateEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/entity.MsgCreateEntity',
		value: MsgCreateEntity.fromPartial({
			entityType: 'asset',
			entityStatus: 0,
			// @ts-ignore
			context: [Context.fromPartial({ key: 'ixo', value: inheritEntityDid })],
			service: [],
			linkedResource: [
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwa',
					type: 'page',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/m5tf6df728jl2hsi8fwa',
					proof: 'm5tf6df728jl2hsi8fwa',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwb',
					type: 'settings',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/df728jl2hsi8fwm5tf6',
					proof: 'df728jl2hsi8fwm5tf6',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwc',
					type: 'class:claims',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/jl2hsi8fwm5tf6df728',
					proof: 'jl2hsi8fwm5tf6df728',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#m5tf6df728jl2hsi8fwd',
					type: 'class:filters',
					description: '',
					mediaType: 'application/json',
					serviceEndpoint: '#cellnode-pandora/public/hsi8fwmjl25tf6df728',
					proof: 'hsi8fwmjl25tf6df728',
					encrypted: 'false',
					right: '',
				}),
				LinkedResource.fromPartial({
					id: 'did:ixo:entity:abc123#dashboard*',
					type: 'service',
					description: 'Dashboard',
					mediaType: 'application/http',
					serviceEndpoint: '#dashboard/?id=310034110',
					proof: '',
					encrypted: 'false',
					right: 'view',
				}),
			],
			accordedRight: [],
			linkedEntity: [],
			ownerDid: did,
			ownerAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const TransferEntity = async (entityDid: string) => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgTransferEntity', MsgTransferEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);

	const message = {
		typeUrl: '/entity.MsgTransferEntity',
		value: MsgTransferEntity.fromPartial({
			entityDid: entityDid,
			controllerDid: did,
			controllerAddress: myAddress,
			recipientDid: alice.did,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const UpdateEntity = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgUpdateEntity', MsgUpdateEntity);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/entity.MsgUpdateEntity',
		value: MsgUpdateEntity.fromPartial({
			status: 1,
			controllerDid: did,
			controllerAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const UpdateConfigEntity = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/entity.MsgUpdateEntityConfig', MsgUpdateEntityConfig);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const message = {
		typeUrl: '/entity.MsgUpdateEntityConfig',
		value: MsgUpdateEntityConfig.fromPartial({
			nftContractAddress: '',
			signer: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};
