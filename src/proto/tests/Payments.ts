import { Registry } from '@cosmjs/proto-signing';
import { Coin } from '../codec/cosmos/coin';
import { BlockPeriod, Discount, DistributionShare, PaymentTemplate } from '../codec/payments/payments';
import { MsgCreatePaymentContract, MsgCreatePaymentTemplate, MsgCreateSubscription, MsgEffectPayment, MsgGrantDiscount, MsgRevokeDiscount, MsgSetPaymentContractAuthorisation } from '../codec/payments/tx';
import { JsonToArray } from '../protoquery';
import { createClient, getUser } from './common';
import { constants, fee, WalletUsers } from './constants';

export const CreatePaymentTemplate = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgCreatePaymentTemplate', MsgCreatePaymentTemplate);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgCreatePaymentTemplate',
		value: MsgCreatePaymentTemplate.fromPartial({
			creatorDid: did,
			creatorAddress: myAddress,
			paymentTemplate: PaymentTemplate.fromPartial({
				id: constants.paymentTemplateId,
				paymentAmount: [
					Coin.fromPartial({
						denom: 'uixo',
						amount: '500000',
					}),
				],
				paymentMinimum: [
					Coin.fromPartial({
						denom: 'uixo',
						amount: '100000',
					}),
				],
				paymentMaximum: [
					Coin.fromPartial({
						denom: 'uixo',
						amount: '500000000',
					}),
				],
				discounts: [Discount.fromPartial({ id: constants.paymentDiscountId, percent: '5000000000000000000' })],
			}),
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

/**
 * Distribution shares must add up to 100, and inputs is to power 18
 */
export const CreatePaymentContract = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgCreatePaymentContract', MsgCreatePaymentContract);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const alice = getUser(WalletUsers.alice);
	const aliceAccount = (await alice.getAccounts())[0];

	const message = {
		typeUrl: '/payments.MsgCreatePaymentContract',
		value: MsgCreatePaymentContract.fromPartial({
			creatorDid: did,
			paymentTemplateId: constants.paymentTemplateId,
			paymentContractId: constants.paymentContractId,
			payer: myAddress,
			recipients: [DistributionShare.fromPartial({ address: aliceAccount.address, percentage: '100000000000000000000' })],
			discountId: constants.paymentDiscountId,
			canDeauthorise: true,
			creatorAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const SetPaymentContractAuthorization = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgSetPaymentContractAuthorisation', MsgSetPaymentContractAuthorisation);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgSetPaymentContractAuthorisation',
		value: MsgSetPaymentContractAuthorisation.fromPartial({
			paymentContractId: constants.paymentContractId,
			payerDid: did,
			authorised: true,
			payerAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const CreateSubscription = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgCreateSubscription', MsgCreateSubscription);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgCreateSubscription',
		value: MsgCreateSubscription.fromPartial({
			creatorDid: did,
			subscriptionId: constants.paymentSubscripionId,
			paymentContractId: constants.paymentContractId,
			maxPeriods: '3',
			period: { typeUrl: '/payments.BlockPeriod', value: BlockPeriod.encode(BlockPeriod.fromPartial({ periodLength: 3, periodStartBlock: 5 })).finish() },
			creatorAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const GrantDiscount = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgGrantDiscount', MsgGrantDiscount);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgGrantDiscount',
		value: MsgGrantDiscount.fromPartial({
			senderDid: did,
			paymentContractId: constants.paymentContractId,
			discountId: constants.paymentDiscountId,
			recipient: constants.paymentContractRecipient.address,
			senderAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const RevokeDiscount = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgRevokeDiscount', MsgRevokeDiscount);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgRevokeDiscount',
		value: MsgRevokeDiscount.fromPartial({
			senderDid: did,
			paymentContractId: constants.paymentContractId,
			holder: myAddress,
			senderAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};

export const EffectPayment = async () => {
	const myRegistry = new Registry();
	myRegistry.register('/payments.MsgEffectPayment', MsgEffectPayment);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;
	const did = tester.did;

	const message = {
		typeUrl: '/payments.MsgEffectPayment',
		value: MsgEffectPayment.fromPartial({
			senderDid: did,
			paymentContractId: constants.paymentContractId,
			senderAddress: myAddress,
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};
