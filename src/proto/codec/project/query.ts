/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { AccountMap, Params, ProjectDoc, WithdrawalInfoDocs } from "./project";

export const protobufPackage = "project";

/** QueryProjectDocRequest is the request type for the Query/ProjectDoc RPC method. */
export interface QueryProjectDocRequest {
  projectDid: string;
}

/** QueryProjectDocResponse is the response type for the Query/ProjectDoc RPC method. */
export interface QueryProjectDocResponse {
  projectDoc?: ProjectDoc;
}

/** QueryProjectAccountsRequest is the request type for the Query/ProjectAccounts RPC method. */
export interface QueryProjectAccountsRequest {
  projectDid: string;
}

/** QueryProjectAccountsResponse is the response type for the Query/ProjectAccounts RPC method. */
export interface QueryProjectAccountsResponse {
  accountMap?: AccountMap;
}

/** QueryProjectTxRequest is the request type for the Query/ProjectTx RPC method. */
export interface QueryProjectTxRequest {
  projectDid: string;
}

/** QueryProjectTxResponse is the response type for the Query/ProjectTx RPC method. */
export interface QueryProjectTxResponse {
  txs?: WithdrawalInfoDocs;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params?: Params;
}

function createBaseQueryProjectDocRequest(): QueryProjectDocRequest {
  return { projectDid: "" };
}

export const QueryProjectDocRequest = {
  encode(message: QueryProjectDocRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDid !== "") {
      writer.uint32(10).string(message.projectDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectDocRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectDocRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectDocRequest {
    return { projectDid: isSet(object.projectDid) ? String(object.projectDid) : "" };
  },

  toJSON(message: QueryProjectDocRequest): unknown {
    const obj: any = {};
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectDocRequest>, I>>(object: I): QueryProjectDocRequest {
    const message = createBaseQueryProjectDocRequest();
    message.projectDid = object.projectDid ?? "";
    return message;
  },
};

function createBaseQueryProjectDocResponse(): QueryProjectDocResponse {
  return { projectDoc: undefined };
}

export const QueryProjectDocResponse = {
  encode(message: QueryProjectDocResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDoc !== undefined) {
      ProjectDoc.encode(message.projectDoc, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectDocResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectDocResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDoc = ProjectDoc.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectDocResponse {
    return { projectDoc: isSet(object.projectDoc) ? ProjectDoc.fromJSON(object.projectDoc) : undefined };
  },

  toJSON(message: QueryProjectDocResponse): unknown {
    const obj: any = {};
    message.projectDoc !== undefined &&
      (obj.projectDoc = message.projectDoc ? ProjectDoc.toJSON(message.projectDoc) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectDocResponse>, I>>(object: I): QueryProjectDocResponse {
    const message = createBaseQueryProjectDocResponse();
    message.projectDoc = (object.projectDoc !== undefined && object.projectDoc !== null)
      ? ProjectDoc.fromPartial(object.projectDoc)
      : undefined;
    return message;
  },
};

function createBaseQueryProjectAccountsRequest(): QueryProjectAccountsRequest {
  return { projectDid: "" };
}

export const QueryProjectAccountsRequest = {
  encode(message: QueryProjectAccountsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDid !== "") {
      writer.uint32(10).string(message.projectDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectAccountsRequest {
    return { projectDid: isSet(object.projectDid) ? String(object.projectDid) : "" };
  },

  toJSON(message: QueryProjectAccountsRequest): unknown {
    const obj: any = {};
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectAccountsRequest>, I>>(object: I): QueryProjectAccountsRequest {
    const message = createBaseQueryProjectAccountsRequest();
    message.projectDid = object.projectDid ?? "";
    return message;
  },
};

function createBaseQueryProjectAccountsResponse(): QueryProjectAccountsResponse {
  return { accountMap: undefined };
}

export const QueryProjectAccountsResponse = {
  encode(message: QueryProjectAccountsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountMap !== undefined) {
      AccountMap.encode(message.accountMap, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountMap = AccountMap.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectAccountsResponse {
    return { accountMap: isSet(object.accountMap) ? AccountMap.fromJSON(object.accountMap) : undefined };
  },

  toJSON(message: QueryProjectAccountsResponse): unknown {
    const obj: any = {};
    message.accountMap !== undefined &&
      (obj.accountMap = message.accountMap ? AccountMap.toJSON(message.accountMap) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectAccountsResponse>, I>>(object: I): QueryProjectAccountsResponse {
    const message = createBaseQueryProjectAccountsResponse();
    message.accountMap = (object.accountMap !== undefined && object.accountMap !== null)
      ? AccountMap.fromPartial(object.accountMap)
      : undefined;
    return message;
  },
};

function createBaseQueryProjectTxRequest(): QueryProjectTxRequest {
  return { projectDid: "" };
}

export const QueryProjectTxRequest = {
  encode(message: QueryProjectTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDid !== "") {
      writer.uint32(10).string(message.projectDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectTxRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectTxRequest {
    return { projectDid: isSet(object.projectDid) ? String(object.projectDid) : "" };
  },

  toJSON(message: QueryProjectTxRequest): unknown {
    const obj: any = {};
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectTxRequest>, I>>(object: I): QueryProjectTxRequest {
    const message = createBaseQueryProjectTxRequest();
    message.projectDid = object.projectDid ?? "";
    return message;
  },
};

function createBaseQueryProjectTxResponse(): QueryProjectTxResponse {
  return { txs: undefined };
}

export const QueryProjectTxResponse = {
  encode(message: QueryProjectTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txs !== undefined) {
      WithdrawalInfoDocs.encode(message.txs, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProjectTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs = WithdrawalInfoDocs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProjectTxResponse {
    return { txs: isSet(object.txs) ? WithdrawalInfoDocs.fromJSON(object.txs) : undefined };
  },

  toJSON(message: QueryProjectTxResponse): unknown {
    const obj: any = {};
    message.txs !== undefined && (obj.txs = message.txs ? WithdrawalInfoDocs.toJSON(message.txs) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProjectTxResponse>, I>>(object: I): QueryProjectTxResponse {
    const message = createBaseQueryProjectTxResponse();
    message.txs = (object.txs !== undefined && object.txs !== null)
      ? WithdrawalInfoDocs.fromPartial(object.txs)
      : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** ProjectDoc queries info of a specific project. */
  ProjectDoc(request: QueryProjectDocRequest): Promise<QueryProjectDocResponse>;
  /** ProjectAccounts lists a specific project's accounts. */
  ProjectAccounts(request: QueryProjectAccountsRequest): Promise<QueryProjectAccountsResponse>;
  /** ProjectTx lists a specific project's transactions. */
  ProjectTx(request: QueryProjectTxRequest): Promise<QueryProjectTxResponse>;
  /** Params queries the paramaters of x/project module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "project.Query";
    this.rpc = rpc;
    this.ProjectDoc = this.ProjectDoc.bind(this);
    this.ProjectAccounts = this.ProjectAccounts.bind(this);
    this.ProjectTx = this.ProjectTx.bind(this);
    this.Params = this.Params.bind(this);
  }
  ProjectDoc(request: QueryProjectDocRequest): Promise<QueryProjectDocResponse> {
    const data = QueryProjectDocRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProjectDoc", data);
    return promise.then((data) => QueryProjectDocResponse.decode(new _m0.Reader(data)));
  }

  ProjectAccounts(request: QueryProjectAccountsRequest): Promise<QueryProjectAccountsResponse> {
    const data = QueryProjectAccountsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProjectAccounts", data);
    return promise.then((data) => QueryProjectAccountsResponse.decode(new _m0.Reader(data)));
  }

  ProjectTx(request: QueryProjectTxRequest): Promise<QueryProjectTxResponse> {
    const data = QueryProjectTxRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProjectTx", data);
    return promise.then((data) => QueryProjectTxResponse.decode(new _m0.Reader(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
