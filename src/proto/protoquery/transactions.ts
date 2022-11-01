import {
  createProtobufRpcClient,
  QueryClient,
  ProtobufRpcClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { PageRequest } from "../codec/external/cosmos/base/query/v1beta1/pagination";

import {
  BroadcastMode,
  GetBlockWithTxsResponse,
  GetTxResponse,
  GetTxsEventResponse,
  OrderBy,
  ServiceClientImpl,
  SimulateResponse,
} from "../codec/external/cosmos/tx/v1beta1/service";
import { Tx } from "../codec/external/cosmos/tx/v1beta1/tx";

async function initializerpcclient(
  rpcendpoint = "https://testnet.ixo.world/rpc/"
): Promise<{
  tendermintClient: any;
  queryClient: QueryClient;
  rpcClient: ProtobufRpcClient;
  queryService: ServiceClientImpl;
}> {
  const tendermintClient = await Tendermint34Client.connect(rpcendpoint);

  const queryClient = new QueryClient(tendermintClient);

  const rpcClient = createProtobufRpcClient(queryClient);

  const queryService = new ServiceClientImpl(rpcClient);

  return {
    tendermintClient: tendermintClient,
    queryClient: queryClient,
    rpcClient: rpcClient,
    queryService: queryService,
  };
}

//Query Functions

export async function ServiceQuerySimulate(
  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   */
  txBytes: Uint8Array,
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   *
   * @deprecated
   */
  tx?: Tx
): Promise<SimulateResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.Simulate({
    tx,
    txBytes,
  });

  return queryResult;
}

export async function ServiceGetTx(
  /** hash is the tx hash to query, encoded as a hex string. */
  hash: string
): Promise<GetTxResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.GetTx({
    hash,
  });

  return queryResult;
}

export async function ServiceBroadcastTx(
  /** tx_bytes is the raw transaction. */
  txBytes: Uint8Array,
  mode: BroadcastMode
): Promise<GetTxResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.BroadcastTx({
    txBytes,
    mode,
  });

  return queryResult;
}

export async function ServiceGetTxEvent(
  /** events is the list of transaction event type. */
  events: string[],
  orderBy: OrderBy,
  /** pagination defines a pagination for the request. */
  pagination?: PageRequest
): Promise<GetTxsEventResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.GetTxsEvent({
    events,
    orderBy,
    pagination,
  });

  return queryResult;
}

export async function ServiceGetBlockWithTxs(
  /** height is the height of the block to query. */
  height: Long,
  /** pagination defines a pagination for the request. */
  pagination?: PageRequest
): Promise<GetBlockWithTxsResponse> {
  const { queryService } = await initializerpcclient();

  const queryResult = await queryService.GetBlockWithTxs({
    height,
    pagination,
  });

  return queryResult;
}
