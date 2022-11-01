/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { DidCredential } from "../did/did";

export const protobufPackage = "did";

/** MsgAddDid defines a message for adding a DID. */
export interface MsgAddDid {
  did: string;
  pubKey: string;
}

/** MsgAddDidResponse defines the Msg/AddDid response type. */
export interface MsgAddDidResponse {}

/** MsgAddCredential defines a message for adding a credential to the signer's DID. */
export interface MsgAddCredential {
  didCredential?: DidCredential;
}

/** MsgAddCredentialResponse defines the Msg/AddCredential response type. */
export interface MsgAddCredentialResponse {}

function createBaseMsgAddDid(): MsgAddDid {
  return { did: "", pubKey: "" };
}

export const MsgAddDid = {
  encode(
    message: MsgAddDid,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddDid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddDid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddDid {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
    };
  },

  toJSON(message: MsgAddDid): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddDid>, I>>(
    object: I
  ): MsgAddDid {
    const message = createBaseMsgAddDid();
    message.did = object.did ?? "";
    message.pubKey = object.pubKey ?? "";
    return message;
  },
};

function createBaseMsgAddDidResponse(): MsgAddDidResponse {
  return {};
}

export const MsgAddDidResponse = {
  encode(
    _: MsgAddDidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddDidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddDidResponse();
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

  fromJSON(_: any): MsgAddDidResponse {
    return {};
  },

  toJSON(_: MsgAddDidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddDidResponse>, I>>(
    _: I
  ): MsgAddDidResponse {
    const message = createBaseMsgAddDidResponse();
    return message;
  },
};

function createBaseMsgAddCredential(): MsgAddCredential {
  return { didCredential: undefined };
}

export const MsgAddCredential = {
  encode(
    message: MsgAddCredential,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.didCredential !== undefined) {
      DidCredential.encode(
        message.didCredential,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddCredential {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCredential();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didCredential = DidCredential.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddCredential {
    return {
      didCredential: isSet(object.didCredential)
        ? DidCredential.fromJSON(object.didCredential)
        : undefined,
    };
  },

  toJSON(message: MsgAddCredential): unknown {
    const obj: any = {};
    message.didCredential !== undefined &&
      (obj.didCredential = message.didCredential
        ? DidCredential.toJSON(message.didCredential)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddCredential>, I>>(
    object: I
  ): MsgAddCredential {
    const message = createBaseMsgAddCredential();
    message.didCredential =
      object.didCredential !== undefined && object.didCredential !== null
        ? DidCredential.fromPartial(object.didCredential)
        : undefined;
    return message;
  },
};

function createBaseMsgAddCredentialResponse(): MsgAddCredentialResponse {
  return {};
}

export const MsgAddCredentialResponse = {
  encode(
    _: MsgAddCredentialResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgAddCredentialResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCredentialResponse();
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

  fromJSON(_: any): MsgAddCredentialResponse {
    return {};
  },

  toJSON(_: MsgAddCredentialResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddCredentialResponse>, I>>(
    _: I
  ): MsgAddCredentialResponse {
    const message = createBaseMsgAddCredentialResponse();
    return message;
  },
};

/** Msg defines the did Msg service. */
export interface Msg {
  /** AddDid defines a method for adding a DID. */
  AddDid(request: MsgAddDid): Promise<MsgAddDidResponse>;
  /** AddCredential defines a method for adding a credential to the signer's DID. */
  AddCredential(request: MsgAddCredential): Promise<MsgAddCredentialResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AddDid = this.AddDid.bind(this);
    this.AddCredential = this.AddCredential.bind(this);
  }
  AddDid(request: MsgAddDid): Promise<MsgAddDidResponse> {
    const data = MsgAddDid.encode(request).finish();
    const promise = this.rpc.request("did.Msg", "AddDid", data);
    return promise.then((data) =>
      MsgAddDidResponse.decode(new _m0.Reader(data))
    );
  }

  AddCredential(request: MsgAddCredential): Promise<MsgAddCredentialResponse> {
    const data = MsgAddCredential.encode(request).finish();
    const promise = this.rpc.request("did.Msg", "AddCredential", data);
    return promise.then((data) =>
      MsgAddCredentialResponse.decode(new _m0.Reader(data))
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
