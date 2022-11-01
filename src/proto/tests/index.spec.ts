import { generateNewWallet, generateWallets, getDidFromEvents, sendFromFaucet, testMsg } from './common';
import { generateConstants, WalletUsers } from './constants';
import * as Bond from './Bond';
import * as Cosmos from './Cosmos';
import * as Entity from './Entity';
import * as Iid from './Iid';
import * as Payments from './Payments';
import * as Projects from './Projects';

beforeAll(() => {
	generateConstants();
	return generateWallets();
});

describe('Testing the cosmos bank module', () => {
	// testMsg('/cosmos.bank.v1beta1.MsgSend', () => Cosmos.BankSendTrx());
});

describe('Testing the iid module', () => {
	sendFromFaucet(WalletUsers.tester);
	testMsg('/iid.MsgCreateIidDocument', () => Iid.CreateIidDoc());
	sendFromFaucet(WalletUsers.alice);
	testMsg('/iid.MsgCreateIidDocument', () => Iid.CreateIidDoc(WalletUsers.alice));
	sendFromFaucet(WalletUsers.bob);
	testMsg('/iid.MsgCreateIidDocument', () => Iid.CreateIidDoc(WalletUsers.bob));

	// testMsg('/iid.MsgUpdateIidDocument', () => Iid.UpdateIidDoc());
	// testMsg('/iid.MsgUpdateIidMeta', () => Iid.UpdateIidMeta());
	// testMsg('/iid.MsgAddIidContext', () => Iid.AddIidContext());
	// testMsg('/iid.MsgDeleteIidContext', () => Iid.DeleteIidContext());
	// testMsg('/iid.MsgAddVerification', () => Iid.AddVerification());
	// testMsg('/iid.MsgSetVerificationRelationships', () => Iid.SetVerificationRelationships());
	// testMsg('/iid.MsgRevokeVerification', () => Iid.RevokeVerification());
	// sendFromFaucet(WalletUsers.accordedRight);
	// testMsg('/iid.MsgCreateIidDocument', () => Iid.CreateIidDoc(WalletUsers.accordedRight, WalletUsers.tester));
	// testMsg('/iid.MsgAddAccordedRight', () => Iid.AddAccordedRight());
	// testMsg('/iid.MsgDeleteAccordedRight', () => Iid.DeleteAccordedRight());
	// testMsg('/iid.MsgAddController', () => Iid.AddController());
	// testMsg('/iid.MsgDeleteController', () => Iid.DeleteController());
	// testMsg('/iid.MsgAddLinkedEntity', () => Iid.AddLinkedEntity());
	// testMsg('/iid.MsgDeleteLinkedEntity', () => Iid.DeleteLinkedEntity());
	// testMsg('/iid.MsgAddLinkedResource', () => Iid.AddLinkedResource());
	// testMsg('/iid.MsgDeleteLinkedResource', () => Iid.DeleteLinkedResource());
	// testMsg('/iid.MsgAddService', () => Iid.AddService());
	// testMsg('/iid.MsgDeleteService', () => Iid.DeleteService());
});

describe('Testing the entity module', () => {
	// let assetDid: string;
	// testMsg('/entity.MsgCreateEntity asset', async () => {
	// 	const res = await Entity.CreateEntityAsset();
	// 	assetDid = getDidFromEvents(res);
	// 	console.log({ assetDid });
	// 	return res;
	// });
	// let assetSupamotoDid: string;
	// testMsg('/entity.MsgCreateEntity asset class supamoto', async () => {
	// 	const res = await Entity.CreateEntityAssetSupamoto(assetDid);
	// 	assetSupamotoDid = getDidFromEvents(res);
	// 	console.log({ assetSupamotoDid });
	// 	return res;
	// });
	// let assetSupamotoInstanceDid: string;
	// testMsg('/entity.MsgCreateEntity asset class supamoto instance', async () => {
	// 	const res = await Entity.CreateEntityAssetSupamotoInstance(assetSupamotoDid);
	// 	assetSupamotoInstanceDid = getDidFromEvents(res);
	// 	console.log({ assetSupamotoInstanceDid });
	// 	return res;
	// });
	// testMsg('/entity.MsgTransferEntity', () => Entity.TransferEntity(assetSupamotoInstanceDid));
	// 	testMsg('/entity.MsgUpdateEntity', () => Entity.UpdateEntity());
	// 	testMsg('/entity.MsgUpdateEntityConfig', () => Entity.UpdateConfigEntity());
});

describe('Testing the Payments module', () => {
	// testMsg('/payments.MsgCreatePaymentTemplate', () => Payments.CreatePaymentTemplate());
	// testMsg('/payments.MsgCreatePaymentContract', () => Payments.CreatePaymentContract());
	// testMsg('/payments.MsgSetPaymentContractAuthorisation', () => Payments.SetPaymentContractAuthorization());
	// testMsg('/payments.MsgCreateSubscription', () => Payments.CreateSubscription());
	// testMsg('/payments.MsgGrantDiscount', () => Payments.GrantDiscount());
	// testMsg('/payments.MsgRevokeDiscount', () => Payments.RevokeDiscount());
	// testMsg('/payments.MsgEffectPayment', () => Payments.EffectPayment());
});

describe('Testing the Projects module', () => {
	// testMsg('/project.MsgCreateProject', () => Projects.CreateProject());
	// testMsg('/project.MsgUpdateProjectStatus', () => Projects.UpdateProjectStatus('CREATED'));
	// testMsg('/project.MsgUpdateProjectStatus', () => Projects.UpdateProjectStatus('PENDING'));
	// testMsg('/project.MsgUpdateProjectDoc', () => Projects.UpdateProjectDoc());
	// sendFromFaucet(WalletUsers.project); // Need to fecth other addresses for project to fund
	// testMsg('/project.MsgCreateAgent', () => Projects.CreateAgent());
	// testMsg('/project.MsgUpdateAgent', () => Projects.UpdateAgent());
	// testMsg('/project.MsgUpdateProjectStatus', () => Projects.UpdateProjectStatus('FUNDED'));
	// testMsg('/project.MsgUpdateProjectStatus', () => Projects.UpdateProjectStatus('STARTED'));
	// testMsg('/project.MsgCreateClaim', () => Projects.CreateClaim());
	// testMsg('/project.MsgCreateEvaluation', () => Projects.CreateEvaluation());
	// testMsg('/project.MsgWithdrawFunds', () => Projects.WithdrawFunds());
});

describe('Testing the Bonds module', () => {
	// testMsg('/bonds.MsgCreateBond', () => Bond.CreateBond());
	// testMsg('/bonds.MsgEditBond', () => Bond.EditBond());
	// testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.tester, 1)); // Buy one token first to hatch bond
	// testMsg('/bonds.MsgBuy', () => Bond.Buy(20000));
	// testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('520000000000000000'));
	// testMsg('/bonds.MsgMakeOutcomePayment', () => Bond.MakeOutcomePayment(1000));
	// testMsg('/bonds.MsgUpdateBondState', () => Bond.UpdateBondState('SETTLE'));
	// testMsg('/bonds.MsgWithdrawShare', () => Bond.WithdrawShare());
	// testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(10)); // Not tested
	// testMsg('/bonds.MsgSell', () => Bond.Sell(10)); // Not tested
	// testMsg('/bonds.MsgSwap', () => Bond.Swap()); // Not tested
});

/*
describe('Testing the Bonds module sells disabled', () => {
	beforeAll(() => generateNewWallet(WalletUsers.bond));
	testMsg('/bonds.MsgCreateBond', () => Bond.CreateBond(false));
	testMsg('/bonds.MsgEditBond', () => Bond.EditBond());
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.tester, 400000));
	// Withdrawing of reserve during HATCH state not possible...
	testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(WalletUsers.alice, 10), false);
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.alice, 400000));
	// Cannot buy 200001 as d0 is 1mil and must buy exact amount to hatch bond
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.bob, 200001), false);
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.bob, 200000));
	testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(WalletUsers.tester, 400000));
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('510000000000000000'));
	testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(WalletUsers.tester, 5000));
	// Cannot withdraw 595001res due to insufficient funds...
	testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(WalletUsers.tester, 595001), false);
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('400000000000000000'));
	// Cannot change public alpha 0.4->0.6...
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('600000000000000000'), false);
	// Cannot sell because sells are disabled...
	testMsg('/bonds.MsgSell', () => Bond.Sell(WalletUsers.alice, 10), false);
	testMsg('/bonds.MsgMakeOutcomePayment', () => Bond.MakeOutcomePayment(8000000));
	testMsg('/bonds.MsgUpdateBondState', () => Bond.UpdateBondState('SETTLE'));
	testMsg('/bonds.MsgWithdrawShare', () => Bond.WithdrawShare(WalletUsers.alice));
	testMsg('/bonds.MsgWithdrawShare', () => Bond.WithdrawShare(WalletUsers.bob));
});
*/

/*
describe('Testing the Bonds module sells enabled', () => {
	beforeAll(() => generateNewWallet(WalletUsers.bond));
	testMsg('/bonds.MsgCreateBond', () => Bond.CreateBond(true));
	testMsg('/bonds.MsgEditBond', () => Bond.EditBond());
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.tester, 400000));
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.alice, 400000));
	// Cannot buy 200001 as d0 is 1mil and must buy exact amount to hatch bond
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.bob, 200001), false);
	testMsg('/bonds.MsgBuy', () => Bond.Buy(WalletUsers.bob, 200000));
	// Cannot withdraw reserve as disabled
	testMsg('/bonds.MsgWithdrawReserve', () => Bond.WithdrawReserve(WalletUsers.tester, 400000), false);
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('510000000000000000'));
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('400000000000000000'));
	// Cannot change public alpha 0.4->0.6...
	testMsg('/bonds.MsgSetNextAlpha', () => Bond.SetNextAlpha('600000000000000000'), false);
	testMsg('/bonds.MsgSell', () => Bond.Sell(WalletUsers.alice, 400000));
	testMsg('/bonds.MsgMakeOutcomePayment', () => Bond.MakeOutcomePayment(8000000));
	testMsg('/bonds.MsgUpdateBondState', () => Bond.UpdateBondState('SETTLE'));
	// Cannot withdraw sahre as sold all tokens
	testMsg('/bonds.MsgWithdrawShare', () => Bond.WithdrawShare(WalletUsers.alice), false);
	testMsg('/bonds.MsgWithdrawShare', () => Bond.WithdrawShare(WalletUsers.bob));
});
*/
