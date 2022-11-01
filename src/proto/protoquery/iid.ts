import {
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  Query,
  QueryClientImpl,
  QueryIidDocumentResponse,
  QueryIidMetaDataResponse,
  QueryIidDocumentsResponse,
} from "../codec/iid/query";

async function initializerpcclient(
  rpcendpoint = "https://testnet.ixo.world/rpc/"
): Promise<{
  tendermintClient: any;
  queryClient: QueryClient;
  rpcClient: ProtobufRpcClient;
  queryService: Query;
}> {
  const tendermintClient = await Tendermint34Client.connect(rpcendpoint);

  const queryClient = new QueryClient(tendermintClient);

  const rpcClient = createProtobufRpcClient(queryClient);

  const queryService = new QueryClientImpl(rpcClient);

  return {
    tendermintClient: tendermintClient,
    queryClient: queryClient,
    rpcClient: rpcClient,
    queryService: queryService,
  };
}

//Query Functions

export async function QueryIidDocuments(
  status: string
): Promise<QueryIidDocumentsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.IidDocuments({
    status: status,
  });

  return queryResult;
}

export async function QueryIidDocument(
  id: string
): Promise<QueryIidDocumentResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.IidDocument({
    id: id,
  });

  return queryResult;
}

export async function QueryMeta(id: string): Promise<QueryIidMetaDataResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.MetaData({
    id: id,
  });

  return queryResult;
}
