import { Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { FunctionParam } from "../codec/bonds/bonds";
import {
  QueryAlphaMaximumsResponse,
  QueryAvailableReserveResponse,
  QueryBondResponse,
  QueryBondsDetailedResponse,
  QueryBondsResponse,
  QueryBuyPriceResponse,
  QueryClientImpl,
  QueryCurrentPriceResponse,
  QueryCurrentReserveResponse,
  Query,
  QueryBondsDetailedRequest,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryBatchResponse,
  QueryLastBatchResponse,
  QueryCustomPriceResponse,
  QuerySellReturnResponse,
  QuerySwapReturnResponse,
} from "../codec/bonds/query";
import {
  MsgCreateBond,
  MsgEditBond,
  MsgSetNextAlpha,
  MsgUpdateBondState,
  MsgUpdateBondStateResponse,
  MsgBuy,
  MsgSell,
  MsgSwap,
  MsgMakeOutcomePayment,
  MsgWithdrawShare,
  MsgWithdrawReserve,
  Msg,
  MsgClientImpl,
  MsgCreateBondResponse,
  MsgEditBondResponse,
  MsgSetNextAlphaResponse,
  MsgBuyResponse,
  MsgSellResponse,
  MsgSwapResponse,
  MsgMakeOutcomePaymentResponse,
  MsgWithdrawShareResponse,
  MsgWithdrawReserveResponse,
} from "../codec/bonds/tx";
import { Coin } from "../codec/cosmos/coin";
//Import QueryTypes Bonds

const myRegistry = new Registry(defaultStargateTypes);
//Register Bonds Types
myRegistry.register("./proto/bonds/tx.proto", MsgCreateBond);
myRegistry.register("./proto/bonds/tx.proto", MsgEditBond);
myRegistry.register("./proto/bonds/tx.proto", MsgSetNextAlpha);
myRegistry.register("./proto/bonds/tx.proto", MsgUpdateBondState);
myRegistry.register("./proto/bonds/tx.proto", MsgUpdateBondStateResponse);
myRegistry.register("./proto/bonds/tx.proto", MsgBuy);
myRegistry.register("./proto/bonds/tx.proto", MsgSell);
myRegistry.register("./proto/bonds/tx.proto", MsgSwap);
myRegistry.register("./proto/bonds/tx.proto", MsgMakeOutcomePayment);
myRegistry.register("./proto/bonds/tx.proto", MsgWithdrawShare);
myRegistry.register("./proto/bonds/tx.proto", MsgWithdrawReserve);

async function initializerpcclient(
  rpcendpoint = "https://testnet.ixo.world/rpc/"
): Promise<{
  tendermintClient: any;
  queryClient: QueryClient;
  rpcClient: ProtobufRpcClient;
  queryService: Query;
  msgqueryService: Msg;
}> {
  const tendermintClient = await Tendermint34Client.connect(rpcendpoint);

  const queryClient = new QueryClient(tendermintClient);

  const rpcClient = createProtobufRpcClient(queryClient);

  const queryService = new QueryClientImpl(rpcClient);

  const msgqueryService = new MsgClientImpl(rpcClient);

  return {
    tendermintClient: tendermintClient,
    queryClient: queryClient,
    rpcClient: rpcClient,
    queryService: queryService,
    msgqueryService: msgqueryService,
  };
}

//Query Functions

export async function QueryBondAvailableReserve(
  bonddid: string
): Promise<QueryAvailableReserveResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AvailableReserve({
    bondDid: bonddid,
  });

  return queryResult;
}

export async function QueryBondAlphaMaximums(
  bonddid: string
): Promise<QueryAlphaMaximumsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AlphaMaximums({
    bondDid: bonddid,
  });

  return queryResult;
}

export async function QueryBond(bonddid: string): Promise<QueryBondResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Bond({
    bondDid: bonddid,
  });

  return queryResult;
}

export async function QueryBonds(bonddid: string): Promise<QueryBondsResponse> {
  const { queryService } = await initializerpcclient();

  //May need array Not sure
  const queryResult = await queryService.Bonds({});

  return queryResult;
}

export async function QueryBondCurrentPrice(
  bonddid: string
): Promise<QueryCurrentPriceResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.CurrentPrice({ bondDid: bonddid });

  return queryResult;
}

export async function QueryBondCurrentReserve(
  bonddid: string
): Promise<QueryCurrentReserveResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.CurrentReserve({ bondDid: bonddid });

  return queryResult;
}

export async function QueryBondCurrentBuyprice(
  bonddid: string,
  bondamount: string
): Promise<QueryBuyPriceResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.BuyPrice({
    bondDid: bonddid,
    bondAmount: bondamount,
  });

  return queryResult;
}

export async function QueryBondsDetailed(
  request: QueryBondsDetailedRequest
): Promise<QueryBondsDetailedResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.BondsDetailed(request);

  return queryResult;
}

export async function QueryParams(
  request: QueryParamsRequest
): Promise<QueryParamsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Params(request);

  return queryResult;
}

export async function QueryBatch(bondDid: string): Promise<QueryBatchResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Batch({ bondDid });

  return queryResult;
}

export async function QueryLastBatch(
  bondDid: string
): Promise<QueryLastBatchResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.LastBatch({ bondDid });

  return queryResult;
}

export async function QueryCustomPrice(
  bondDid: string,
  bondAmount: string
): Promise<QueryCustomPriceResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.CustomPrice({ bondDid, bondAmount });

  return queryResult;
}

export async function QuerySellReturn(
  bondDid: string,
  bondAmount: string
): Promise<QuerySellReturnResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.SellReturn({ bondDid, bondAmount });

  return queryResult;
}

export async function QuerySwap(
  bondDid: string,
  fromTokenWithAmount: string,
  toToken: string
): Promise<QuerySwapReturnResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.SwapReturn({
    bondDid,
    fromTokenWithAmount,
    toToken,
  });

  return queryResult;
}

// Transaction

export async function TransactionCreateBond(
  bondDid: string,
  token: string,
  name: string,
  description: string,
  functionType: string,
  functionParameters: FunctionParam[],
  creatorDid: string,
  controllerDid: string,
  reserveTokens: string[],
  txFeePercentage: string,
  exitFeePercentage: string,
  feeAddress: string,
  reserveWithdrawalAddress: string,
  orderQuantityLimits: Coin[],
  sanityRate: string,
  sanityMarginPercentage: string,
  allowSells: boolean,
  allowReserveWithdrawals: boolean,
  alphaBond: boolean,
  batchBlocks: string,
  outcomePayment: string,
  creatorAddress: string,
  maxSupply?: Coin
): Promise<MsgCreateBondResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateBond({
    bondDid,
    token,
    name,
    description,
    functionType,
    functionParameters,
    creatorDid,
    controllerDid,
    reserveTokens,
    txFeePercentage,
    exitFeePercentage,
    feeAddress,
    reserveWithdrawalAddress,
    maxSupply,
    orderQuantityLimits,
    sanityRate,
    sanityMarginPercentage,
    allowSells,
    allowReserveWithdrawals,
    alphaBond,
    batchBlocks,
    outcomePayment,
    creatorAddress,
  });

  return transactionResult;
}

export async function TransactionEditBond(
  bondDid: string,
  name: string,
  description: string,
  orderQuantityLimits: string,
  sanityRate: string,
  sanityMarginPercentage: string,
  editorDid: string
): Promise<MsgEditBondResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.EditBond({
    bondDid,
    name,
    description,
    orderQuantityLimits,
    sanityRate,
    sanityMarginPercentage,
    editorDid,
    editorAddress: "",
  });

  return transactionResult;
}

export async function TransactionNextAlpha(
  bondDid: string,
  alpha: string,
  editorDid: string
): Promise<MsgSetNextAlphaResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.SetNextAlpha({
    bondDid,
    alpha,
    editorDid,
    editorAddress: "",
  });

  return transactionResult;
}

export async function TransactionUpdateBondState(
  bondDid: string,
  state: string,
  editorDid: string
): Promise<MsgUpdateBondStateResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.UpdateBondState({
    bondDid,
    state,
    editorDid,
    editorAddress: "",
  });

  return transactionResult;
}

export async function TransactionBuy(
  buyerDid: string,
  maxPrices: Coin[],
  bondDid: string,
  amount?: Coin
): Promise<MsgBuyResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.Buy({
    buyerDid,
    amount,
    maxPrices,
    bondDid,
    buyerAddress: "",
  });

  return transactionResult;
}

export async function TransactionSell(
  sellerDid: string,
  bondDid: string,
  amount?: Coin
): Promise<MsgSellResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.Sell({
    sellerDid,
    amount,
    bondDid,
    sellerAddress: "",
  });

  return transactionResult;
}

export async function TransactionSwap(
  swapperDid: string,
  bondDid: string,
  toToken: string,
  from?: Coin
): Promise<MsgSwapResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.Swap({
    swapperDid,
    bondDid,
    toToken,
    from,
    swapperAddress: "",
  });

  return transactionResult;
}

export async function TransactionMakeOutcomePayment(
  senderDid: string,
  amount: string,
  bondDid: string
): Promise<MsgMakeOutcomePaymentResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.MakeOutcomePayment({
    senderDid,
    amount,
    bondDid,
    senderAddress: "",
  });

  return transactionResult;
}

export async function TransactionWithdrawShare(
  recipientDid: string,
  bondDid: string
): Promise<MsgWithdrawShareResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.WithdrawShare({
    recipientDid,
    bondDid,
    recipientAddress: "",
  });

  return transactionResult;
}

export async function TransactionWithdrawReserve(
  withdrawerDid: string,
  amount: Coin[],
  bondDid: string
): Promise<MsgWithdrawReserveResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.WithdrawReserve({
    withdrawerDid,
    amount,
    bondDid,
    withdrawerAddress: "",
  });

  return transactionResult;
}
