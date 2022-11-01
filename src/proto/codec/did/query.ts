/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "did";

/** QueryDidDocRequest is the request type for the Query/DidDoc RPC method. */
export interface QueryDidDocRequest {
  did: string;
}

/** QueryDidDocResponse is the response type for the Query/DidDoc RPC method. */
export interface QueryDidDocResponse {
  diddoc?: Any;
}

/** QueryAllDidsRequest is the request type for the Query/AllDids RPC method. */
export interface QueryAllDidsRequest {}

/** QueryAllDidsResponse is the response type for the Query/AllDids RPC method. */
export interface QueryAllDidsResponse {
  dids: string[];
}

/** QueryAllDidDocsRequest is the request type for the Query/AllDidDocs RPC method. */
export interface QueryAllDidDocsRequest {}

/** QueryAllDidDocsResponse is the response type for the Query/AllDidDocs RPC method. */
export interface QueryAllDidDocsResponse {
  diddocs: Any[];
}

/** QueryAddressFromDidRequest is the request type for the Query/AddressFromDid RPC method. */
export interface QueryAddressFromDidRequest {
  did: string;
}

/** QueryAddressFromDidResponse is the response type for the Query/AddressFromDid RPC method. */
export interface QueryAddressFromDidResponse {
  address: string;
}

/** QueryAddressFromBase58EncodedPubkeyRequest is the request type for the Query/AddressFromBase58EncodedPubkey RPC method. */
export interface QueryAddressFromBase58EncodedPubkeyRequest {
  pubKey: string;
}

/** QueryAddressFromBase58EncodedPubkeyResponse is the response type for the Query/AddressFromBase58EncodedPubkey RPC method. */
export interface QueryAddressFromBase58EncodedPubkeyResponse {
  address: string;
}

function createBaseQueryDidDocRequest(): QueryDidDocRequest {
  return { did: "" };
}

export const QueryDidDocRequest = {
  encode(
    message: QueryDidDocRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDidDocRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDidDocRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDidDocRequest {
    return {
      did: isSet(object.did) ? String(object.did) : "",
    };
  },

  toJSON(message: QueryDidDocRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDidDocRequest>, I>>(
    object: I
  ): QueryDidDocRequest {
    const message = createBaseQueryDidDocRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryDidDocResponse(): QueryDidDocResponse {
  return { diddoc: undefined };
}

export const QueryDidDocResponse = {
  encode(
    message: QueryDidDocResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.diddoc !== undefined) {
      Any.encode(message.diddoc, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDidDocResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDidDocResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.diddoc = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDidDocResponse {
    return {
      diddoc: isSet(object.diddoc) ? Any.fromJSON(object.diddoc) : undefined,
    };
  },

  toJSON(message: QueryDidDocResponse): unknown {
    const obj: any = {};
    message.diddoc !== undefined &&
      (obj.diddoc = message.diddoc ? Any.toJSON(message.diddoc) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDidDocResponse>, I>>(
    object: I
  ): QueryDidDocResponse {
    const message = createBaseQueryDidDocResponse();
    message.diddoc =
      object.diddoc !== undefined && object.diddoc !== null
        ? Any.fromPartial(object.diddoc)
        : undefined;
    return message;
  },
};

function createBaseQueryAllDidsRequest(): QueryAllDidsRequest {
  return {};
}

export const QueryAllDidsRequest = {
  encode(
    _: QueryAllDidsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDidsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidsRequest();
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

  fromJSON(_: any): QueryAllDidsRequest {
    return {};
  },

  toJSON(_: QueryAllDidsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidsRequest>, I>>(
    _: I
  ): QueryAllDidsRequest {
    const message = createBaseQueryAllDidsRequest();
    return message;
  },
};

function createBaseQueryAllDidsResponse(): QueryAllDidsResponse {
  return { dids: [] };
}

export const QueryAllDidsResponse = {
  encode(
    message: QueryAllDidsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllDidsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidsResponse {
    return {
      dids: Array.isArray(object?.dids)
        ? object.dids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: QueryAllDidsResponse): unknown {
    const obj: any = {};
    if (message.dids) {
      obj.dids = message.dids.map((e) => e);
    } else {
      obj.dids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidsResponse>, I>>(
    object: I
  ): QueryAllDidsResponse {
    const message = createBaseQueryAllDidsResponse();
    message.dids = object.dids?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryAllDidDocsRequest(): QueryAllDidDocsRequest {
  return {};
}

export const QueryAllDidDocsRequest = {
  encode(
    _: QueryAllDidDocsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllDidDocsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidDocsRequest();
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

  fromJSON(_: any): QueryAllDidDocsRequest {
    return {};
  },

  toJSON(_: QueryAllDidDocsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidDocsRequest>, I>>(
    _: I
  ): QueryAllDidDocsRequest {
    const message = createBaseQueryAllDidDocsRequest();
    return message;
  },
};

function createBaseQueryAllDidDocsResponse(): QueryAllDidDocsResponse {
  return { diddocs: [] };
}

export const QueryAllDidDocsResponse = {
  encode(
    message: QueryAllDidDocsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.diddocs) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllDidDocsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDidDocsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.diddocs.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDidDocsResponse {
    return {
      diddocs: Array.isArray(object?.diddocs)
        ? object.diddocs.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryAllDidDocsResponse): unknown {
    const obj: any = {};
    if (message.diddocs) {
      obj.diddocs = message.diddocs.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.diddocs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDidDocsResponse>, I>>(
    object: I
  ): QueryAllDidDocsResponse {
    const message = createBaseQueryAllDidDocsResponse();
    message.diddocs = object.diddocs?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAddressFromDidRequest(): QueryAddressFromDidRequest {
  return { did: "" };
}

export const QueryAddressFromDidRequest = {
  encode(
    message: QueryAddressFromDidRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAddressFromDidRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressFromDidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddressFromDidRequest {
    return {
      did: isSet(object.did) ? String(object.did) : "",
    };
  },

  toJSON(message: QueryAddressFromDidRequest): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAddressFromDidRequest>, I>>(
    object: I
  ): QueryAddressFromDidRequest {
    const message = createBaseQueryAddressFromDidRequest();
    message.did = object.did ?? "";
    return message;
  },
};

function createBaseQueryAddressFromDidResponse(): QueryAddressFromDidResponse {
  return { address: "" };
}

export const QueryAddressFromDidResponse = {
  encode(
    message: QueryAddressFromDidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAddressFromDidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressFromDidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddressFromDidResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAddressFromDidResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAddressFromDidResponse>, I>>(
    object: I
  ): QueryAddressFromDidResponse {
    const message = createBaseQueryAddressFromDidResponse();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAddressFromBase58EncodedPubkeyRequest(): QueryAddressFromBase58EncodedPubkeyRequest {
  return { pubKey: "" };
}

export const QueryAddressFromBase58EncodedPubkeyRequest = {
  encode(
    message: QueryAddressFromBase58EncodedPubkeyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubKey !== "") {
      writer.uint32(10).string(message.pubKey);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAddressFromBase58EncodedPubkeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressFromBase58EncodedPubkeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddressFromBase58EncodedPubkeyRequest {
    return {
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
    };
  },

  toJSON(message: QueryAddressFromBase58EncodedPubkeyRequest): unknown {
    const obj: any = {};
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAddressFromBase58EncodedPubkeyRequest>, I>
  >(object: I): QueryAddressFromBase58EncodedPubkeyRequest {
    const message = createBaseQueryAddressFromBase58EncodedPubkeyRequest();
    message.pubKey = object.pubKey ?? "";
    return message;
  },
};

function createBaseQueryAddressFromBase58EncodedPubkeyResponse(): QueryAddressFromBase58EncodedPubkeyResponse {
  return { address: "" };
}

export const QueryAddressFromBase58EncodedPubkeyResponse = {
  encode(
    message: QueryAddressFromBase58EncodedPubkeyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAddressFromBase58EncodedPubkeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAddressFromBase58EncodedPubkeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAddressFromBase58EncodedPubkeyResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAddressFromBase58EncodedPubkeyResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAddressFromBase58EncodedPubkeyResponse>, I>
  >(object: I): QueryAddressFromBase58EncodedPubkeyResponse {
    const message = createBaseQueryAddressFromBase58EncodedPubkeyResponse();
    message.address = object.address ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** DidDoc queries info of a specific DID's DidDoc. */
  DidDoc(request: QueryDidDocRequest): Promise<QueryDidDocResponse>;
  /** AllDids returns a list of all existing DIDs. */
  AllDids(request: QueryAllDidsRequest): Promise<QueryAllDidsResponse>;
  /** AllDidDocs returns a list of all existing DidDocs (i.e. all DIDs along with their DidDoc info). */
  AllDidDocs(request: QueryAllDidDocsRequest): Promise<QueryAllDidDocsResponse>;
  /** AddressFromDid retrieves the cosmos address associated to an ixo DID. */
  AddressFromDid(
    request: QueryAddressFromDidRequest
  ): Promise<QueryAddressFromDidResponse>;
  /** AddressFromBase58EncodedPubkey retrieves the cosmos address associated to an ixo DID's pubkey. */
  AddressFromBase58EncodedPubkey(
    request: QueryAddressFromBase58EncodedPubkeyRequest
  ): Promise<QueryAddressFromBase58EncodedPubkeyResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DidDoc = this.DidDoc.bind(this);
    this.AllDids = this.AllDids.bind(this);
    this.AllDidDocs = this.AllDidDocs.bind(this);
    this.AddressFromDid = this.AddressFromDid.bind(this);
    this.AddressFromBase58EncodedPubkey =
      this.AddressFromBase58EncodedPubkey.bind(this);
  }
  DidDoc(request: QueryDidDocRequest): Promise<QueryDidDocResponse> {
    const data = QueryDidDocRequest.encode(request).finish();
    const promise = this.rpc.request("did.Query", "DidDoc", data);
    return promise.then((data) =>
      QueryDidDocResponse.decode(new _m0.Reader(data))
    );
  }

  AllDids(request: QueryAllDidsRequest): Promise<QueryAllDidsResponse> {
    const data = QueryAllDidsRequest.encode(request).finish();
    const promise = this.rpc.request("did.Query", "AllDids", data);
    return promise.then((data) =>
      QueryAllDidsResponse.decode(new _m0.Reader(data))
    );
  }

  AllDidDocs(
    request: QueryAllDidDocsRequest
  ): Promise<QueryAllDidDocsResponse> {
    const data = QueryAllDidDocsRequest.encode(request).finish();
    const promise = this.rpc.request("did.Query", "AllDidDocs", data);
    return promise.then((data) =>
      QueryAllDidDocsResponse.decode(new _m0.Reader(data))
    );
  }

  AddressFromDid(
    request: QueryAddressFromDidRequest
  ): Promise<QueryAddressFromDidResponse> {
    const data = QueryAddressFromDidRequest.encode(request).finish();
    const promise = this.rpc.request("did.Query", "AddressFromDid", data);
    return promise.then((data) =>
      QueryAddressFromDidResponse.decode(new _m0.Reader(data))
    );
  }

  AddressFromBase58EncodedPubkey(
    request: QueryAddressFromBase58EncodedPubkeyRequest
  ): Promise<QueryAddressFromBase58EncodedPubkeyResponse> {
    const data =
      QueryAddressFromBase58EncodedPubkeyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "did.Query",
      "AddressFromBase58EncodedPubkey",
      data
    );
    return promise.then((data) =>
      QueryAddressFromBase58EncodedPubkeyResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
