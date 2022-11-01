import { Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { DidCredential } from "../codec/did/did";
import {
  Query,
  QueryAddressFromBase58EncodedPubkeyResponse,
  QueryAddressFromDidResponse,
  QueryAllDidDocsResponse,
  QueryAllDidsResponse,
  QueryClientImpl,
  QueryDidDocResponse,
} from "../codec/did/query";
import {
  MsgAddCredentialResponse,
  MsgAddDidResponse,
  MsgClientImpl,
  Msg,
} from "../codec/did/tx";

const myRegistry = new Registry(defaultStargateTypes);

//Register did Types
// myRegistry.register("./proto/did/tx.proto",MsgAddCredential);
// myRegistry.register("./proto/did/tx.proto", MsgAddDid);

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

export async function QuerydidDoc(
  diddoc: string
): Promise<QueryDidDocResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.DidDoc({
    did: diddoc,
  });

  return queryResult;
}

export async function QueryAlldids(
  diddoc: string
): Promise<QueryAllDidsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AllDids({});

  return queryResult;
}

export async function QueryAlldidDoc(
  diddoc: string
): Promise<QueryAllDidDocsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AllDidDocs({ diddoc });

  return queryResult;
}

export async function QueryAddressFromDid(
  diddoc: string
): Promise<QueryAddressFromDidResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AddressFromDid({ did: diddoc });

  return queryResult;
}

export async function QueryAddressFromBase58EncodedPubkey(
  base58key: string
): Promise<QueryAddressFromBase58EncodedPubkeyResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.AddressFromBase58EncodedPubkey({
    pubKey: base58key,
  });

  return queryResult;
}

// message functions

export async function TransactionAddDid(
  did: string,
  pubKey: string
): Promise<MsgAddDidResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.AddDid({ did, pubKey });

  return transactionResult;
}

export async function TransactionAddCredential(
  didCredential?: DidCredential
): Promise<MsgAddCredentialResponse> {
  const { msgqueryService } = await initializerpcclient();

  const transactionResult = await msgqueryService.AddCredential({
    didCredential,
  });

  return transactionResult;
}
