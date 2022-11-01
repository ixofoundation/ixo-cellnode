import { Registry } from '@cosmjs/proto-signing';
import base58 from 'bs58';
import { CreateAgentDoc, CreateClaimDoc, CreateEvaluationDoc, UpdateAgentDoc, UpdateProjectStatusDoc, WithdrawFundsDoc } from '../codec/project/project';
import { MsgCreateAgent, MsgCreateClaim, MsgCreateEvaluation, MsgCreateProject, MsgUpdateAgent, MsgUpdateProjectDoc, MsgUpdateProjectStatus, MsgWithdrawFunds } from '../codec/project/tx';
import { JsonToArray } from '../protoquery/utils';
import { createClient, getUser } from './common';
import { constants, fee, WalletUsers } from './constants';

/**
 * Requires CreatePaymentTemplate to be run first to create paymentTemplateId used
 */
export const CreateProject = async () => {
	const projectData = {
		nodeDid: 'nodeDid',
		requiredClaims: '500',
		serviceEndpoint: 'serviceEndpoint',
		createdOn: '2020-01-01T01:01:01.000Z',
		createdBy: 'Creator',
		status: '',
		fees: {
			'@context': '',
			items: [{ '@type': 'OracleFee', id: constants.paymentTemplateId }],
		},
	};
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgCreateProject', MsgCreateProject);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any, true);

	const tester = getUser();
	const did = tester.did;
	const project = getUser(WalletUsers.project, constants.projectWalletType as any);

	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgCreateProject',
		value: MsgCreateProject.fromPartial({
			senderDid: did,
			projectDid: projectDid,
			pubKey: base58.encode(projectAccount.pubkey),
			txHash: '',
			projectAddress: projectAccount.address,
			data: JsonToArray(JSON.stringify(projectData)),
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], {
		amount: [
			{
				denom: 'uixo',
				amount: '1000000',
			},
		],
		gas: '3000000',
	});
	return response;
};

/**
 * @param status one of 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED'
 */
export const UpdateProjectStatus = async (status: 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED') => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgUpdateProjectStatus', MsgUpdateProjectStatus);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgUpdateProjectStatus',
		value: MsgUpdateProjectStatus.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: UpdateProjectStatusDoc.fromPartial({ status }),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};

/**
 * @param role one of 'SA' | ''.
 */
export const CreateAgent = async (role: string = 'SA') => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgCreateAgent', MsgCreateAgent);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgCreateAgent',
		value: MsgCreateAgent.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: CreateAgentDoc.fromPartial({ agentDid: did, role }),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};

/**
 * Not implemented on chain!!!
 */
export const UpdateAgent = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgUpdateAgent', MsgUpdateAgent);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgUpdateAgent',
		value: MsgUpdateAgent.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: UpdateAgentDoc.fromPartial({ did: did, status: 'AWESOME' }),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};

export const CreateClaim = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgCreateClaim', MsgCreateClaim);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgCreateClaim',
		value: MsgCreateClaim.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: CreateClaimDoc.fromPartial({ claimId: constants.projectClaimId, claimTemplateId: constants.projectTemplateId }),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};

export const CreateEvaluation = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgCreateEvaluation', MsgCreateEvaluation);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const message = {
		typeUrl: '/project.MsgCreateEvaluation',
		value: MsgCreateEvaluation.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: CreateEvaluationDoc.fromPartial({ claimId: constants.projectClaimId, status: '1' }),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};

export const WithdrawFunds = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgWithdrawFunds', MsgWithdrawFunds);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;

	const message = {
		typeUrl: '/project.MsgWithdrawFunds',
		value: MsgWithdrawFunds.fromPartial({
			senderDid: did,
			data: WithdrawFundsDoc.fromPartial({
				projectDid: projectDid,
				recipientDid: did,
				amount: '100000',
				isRefund: true,
			}),
			senderAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const UpdateProjectDoc = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/project.MsgUpdateProjectDoc', MsgUpdateProjectDoc);
	const client = await createClient(myRegistry, getUser(WalletUsers.project, constants.projectWalletType as any), constants.projectWalletType as any);

	const tester = getUser();
	const did = tester.did;

	const project = getUser(WalletUsers.project, constants.projectWalletType as any);
	const projectDid = project.did;
	const projectAccount = (await project.getAccounts())[0];

	const data = {
		nodeDid: 'nodeDid',
		requiredClaims: '500',
		serviceEndpoint: 'serviceEndpoint',
		createdOn: '2020-01-01T01:01:01.000Z',
		createdBy: 'Creator',
		status: '',
		fees: {
			'@context': '',
			items: [{ '@type': 'OracleFee', id: 'payment:template:oracle-fee' }],
		},
		newField: 'someNewField',
	};

	const message = {
		typeUrl: '/project.MsgUpdateProjectDoc',
		value: MsgUpdateProjectDoc.fromPartial({
			txHash: '',
			senderDid: did,
			projectDid: projectDid,
			data: JsonToArray(JSON.stringify(data)),
			projectAddress: projectAccount.address,
		}),
	};

	const response = await client.signAndBroadcast(projectAccount.address, [message], fee);
	return response;
};
