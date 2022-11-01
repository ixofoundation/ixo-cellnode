import {
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  UpdateProjectStatusDoc,
  CreateAgentDoc,
  UpdateAgentDoc,
  CreateClaimDoc,
  CreateEvaluationDoc,
  WithdrawFundsDoc,
} from "../codec/project/project";
import {
  Query,
  QueryClientImpl,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryProjectAccountsResponse,
  QueryProjectDocResponse,
  QueryProjectTxResponse,
} from "../codec/project/query";
import {
  Msg,
  MsgClientImpl,
  MsgCreateAgentResponse,
  MsgCreateClaimResponse,
  MsgCreateEvaluationResponse,
  MsgCreateProjectResponse,
  MsgUpdateAgentResponse,
  MsgUpdateProjectDocResponse,
  MsgUpdateProjectStatusResponse,
  MsgWithdrawFundsResponse,
} from "../codec/project/tx";

// const myRegistry = new Registry(defaultStargateTypes);
//Register Project Types
// myRegistry.register("../codec/project/ms", MsgCreateAgent);
// myRegistry.register("./proto/project/tx.proto", MsgCreateProject);
// myRegistry.register("./proto/project/tx.proto", MsgUpdateProjectStatus);
// myRegistry.register("./proto/project/tx.proto", MsgCreateEvaluation);
// myRegistry.register("./proto/project/tx.proto", MsgUpdateAgent);
// myRegistry.register("./proto/project/tx.proto", MsgCreateClaim);
// myRegistry.register("./proto/project/tx.proto", MsgWithdrawFunds);
// myRegistry.register("./proto/project/tx.proto", MsgUpdateProjectDoc);

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

export async function QueryProjectDoc(
  projectDid: string
): Promise<QueryProjectDocResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.ProjectDoc({
    projectDid: projectDid,
  });

  return queryResult;
}
export async function QueryProjectAccounts(
  projectDid: string
): Promise<QueryProjectAccountsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.ProjectAccounts({
    projectDid: projectDid,
  });

  return queryResult;
}
export async function QueryProjectTxs(
  projectDid: string
): Promise<QueryProjectTxResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.ProjectTx({
    projectDid: projectDid,
  });

  return queryResult;
}

export async function QueryParams(
  request: QueryParamsRequest
): Promise<QueryParamsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Params(request);

  return queryResult;
}

// Transaction

export async function TransactionCreateProject(
  txHash: string,
  senderDid: string,
  projectDid: string,
  pubKey: string,
  data: Uint8Array
): Promise<MsgCreateProjectResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateProject({
    txHash,
    senderDid,
    projectDid,
    pubKey,
    data,
  });

  return transactionResult;
}

export async function TransactionUpdateProjectStatus(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data?: UpdateProjectStatusDoc
): Promise<MsgUpdateProjectStatusResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.UpdateProjectStatus({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}

export async function TransactionCreateAgent(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data?: CreateAgentDoc
): Promise<MsgCreateAgentResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateAgent({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}

export async function TransactionUpdateAgent(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data?: UpdateAgentDoc
): Promise<MsgUpdateAgentResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.UpdateAgent({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}

export async function TransactionCreateClaim(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data?: CreateClaimDoc
): Promise<MsgCreateClaimResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateClaim({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}

export async function TransactionCreateEvaluation(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data?: CreateEvaluationDoc
): Promise<MsgCreateEvaluationResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.CreateEvaluation({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}

export async function TransactionWithdrawFunds(
  senderDid: string,
  data?: WithdrawFundsDoc
): Promise<MsgWithdrawFundsResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.WithdrawFunds({
    senderDid,
    data,
  });

  return transactionResult;
}

export async function TransactionUpdateProjectDoc(
  txHash: string,
  senderDid: string,
  projectDid: string,
  data: Uint8Array
): Promise<MsgUpdateProjectDocResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.UpdateProjectDoc({
    txHash,
    senderDid,
    projectDid,
    data,
  });

  return transactionResult;
}
