import { Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { PaymentTemplate, DistributionShare } from "../codec/payments/payments";
import {
  Query,
  QueryClientImpl,
  QueryPaymentContractResponse,
  QueryPaymentContractsByIdPrefixResponse,
  QueryPaymentTemplateResponse,
  QuerySubscriptionResponse,
} from "../codec/payments/query";
import {
  Msg,
  MsgClientImpl,
  MsgCreateSubscriptionResponse,
  MsgEffectPaymentResponse,
  MsgSetPaymentContractAuthorisationResponse,
} from "../codec/payments/tx";
const myRegistry = new Registry(defaultStargateTypes);

//Register payment Types
// myRegistry.register("./proto/payments/tx.proto",MsgAddCredential);
// myRegistry.register("./proto/payments/tx.proto", MsgAddDid);

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

export async function QueryPaymentTemplate(
  paymentTemplateId: string
): Promise<QueryPaymentTemplateResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.PaymentTemplate({
    paymentTemplateId: paymentTemplateId,
  });

  return queryResult;
}

export async function QueryPaymentContract(
  paymentContractId: string
): Promise<QueryPaymentContractResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.PaymentContract({
    paymentContractId: paymentContractId,
  });

  return queryResult;
}

export async function QueryPaymentContractsByIdPrefix(
  paymentContractsIdPrefix: string
): Promise<QueryPaymentContractsByIdPrefixResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.PaymentContractsByIdPrefix({
    paymentContractsIdPrefix: paymentContractsIdPrefix,
  });

  return queryResult;
}

export async function QueryPaymentSubscription(
  subscriptionId: string
): Promise<QuerySubscriptionResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Subscription({
    subscriptionId: subscriptionId,
  });

  return queryResult;
}

// Transaction

export async function TransactionSetPaymentContractAuthorisation(
  paymentContractId: string,
  payerDid: string,
  authorised: false,
  payerAddress: string
): Promise<MsgSetPaymentContractAuthorisationResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult =
    await msgqueryService.SetPaymentContractAuthorisation({
      paymentContractId,
      payerDid,
      authorised,
      payerAddress: payerAddress,
    });

  return transactionResult;
}

export async function TransactionCreatePaymentTemplate(
  creatorDid: string,
  creatorAddress: string,
  paymentTemplate?: PaymentTemplate
): Promise<MsgSetPaymentContractAuthorisationResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreatePaymentTemplate({
    creatorDid,
    paymentTemplate,
    creatorAddress: creatorAddress,
  });

  return transactionResult;
}

export async function TransactionCreatePaymentContract(
  creatorDid: string,
  paymentTemplateId: string,
  paymentContractId: string,
  payer: string,
  recipients: DistributionShare[],
  canDeauthorise: boolean,
  discountId: string,
  creatorAddress: string
): Promise<MsgSetPaymentContractAuthorisationResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreatePaymentContract({
    creatorDid,
    paymentTemplateId,
    paymentContractId,
    payer,
    recipients,
    canDeauthorise,
    discountId,
    creatorAddress: creatorAddress,
  });

  return transactionResult;
}

export async function TransactionCreateSubscription(
  creatorDid: string,
  subscriptionId: string,
  paymentContractId: string,
  maxPeriods: string,
  creatorAddress: string,
  period?: any
): Promise<MsgCreateSubscriptionResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateSubscription({
    creatorDid,
    subscriptionId,
    paymentContractId,
    maxPeriods,
    period,
    creatorAddress: creatorAddress,
  });

  return transactionResult;
}

export async function TransactionGrantDiscount(
  senderDid: string,
  paymentContractId: string,
  discountId: string,
  recipient: string,
  senderAddress: string
): Promise<MsgCreateSubscriptionResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.GrantDiscount({
    senderDid,
    paymentContractId,
    discountId,
    recipient,
    senderAddress: senderAddress,
  });

  return transactionResult;
}

export async function TransactionRevokeDiscount(
  senderDid: string,
  paymentContractId: string,
  holder: string,
  senderAddress: string
): Promise<MsgCreateSubscriptionResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.RevokeDiscount({
    senderDid,
    paymentContractId,
    holder,
    senderAddress: senderAddress,
  });

  return transactionResult;
}

export async function TransactionEffectPayment(
  senderDid: string,
  paymentContractId: string,
  senderAddress: string
): Promise<MsgEffectPaymentResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.EffectPayment({
    senderDid,
    paymentContractId,
    senderAddress: senderAddress,
  });

  return transactionResult;
}
