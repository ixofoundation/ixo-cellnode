import {
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  Query,
  QueryClientImpl,
  QueryEntityConfigResponse,
  QueryEntityDocResponse,
  QueryEntityListResponse,
} from "../codec/entity/query";

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

export async function QueryEntityList(
  entityType: string,
  entityStatus: string
): Promise<QueryEntityListResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.EntityList({
    entityType: entityType,
    entityStatus: entityStatus,
  });

  return queryResult;
}

export async function QueryEntityDoc(
  entityDid: string
): Promise<QueryEntityDocResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.EntityDoc({
    entityDid: entityDid,
  });

  return queryResult;
}

export async function QueryEntityConfig(): Promise<QueryEntityConfigResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.EntityConfig({});

  return queryResult;
}
