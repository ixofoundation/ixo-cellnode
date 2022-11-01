import { Registry } from '@cosmjs/proto-signing';
import { fee, WalletUsers } from './constants';
import { defaultRegistryTypes as defaultStargateTypes } from '@cosmjs/stargate';
import { MsgSend } from '../codec/external/cosmos/bank/v1beta1/tx';
import { Coin } from '../codec/cosmos/coin';
import { createClient, getUser } from './common';

export const BankSendTrx = async () => {
	const myRegistry = new Registry(defaultStargateTypes);
	const client = await createClient(myRegistry);

	const tester = getUser();
	const account = (await tester.getAccounts())[0];
	const myAddress = account.address;

	const alice = getUser(WalletUsers.alice);
	const aliceAccount = (await alice.getAccounts())[0];

	const message = {
		typeUrl: '/cosmos.bank.v1beta1.MsgSend',
		value: MsgSend.fromPartial({
			fromAddress: myAddress,
			toAddress: aliceAccount.address,
			amount: [Coin.fromPartial({ amount: '100000', denom: 'uixo' })],
		}),
	};

	const response = await client.signAndBroadcast(myAddress, [message], fee);
	return response;
};
