/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "entity";

export interface Params {
  NftContractAddress: string;
  NftContractMinter: string;
}

/** // ProjectDoc defines a project (or entity) type with all of its parameters. */
export interface EntityDoc {
}

function createBaseParams(): Params {
  return { NftContractAddress: "", NftContractMinter: "" };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.NftContractAddress !== "") {
      writer.uint32(10).string(message.NftContractAddress);
    }
    if (message.NftContractMinter !== "") {
      writer.uint32(18).string(message.NftContractMinter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.NftContractAddress = reader.string();
          break;
        case 2:
          message.NftContractMinter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      NftContractAddress: isSet(object.NftContractAddress) ? String(object.NftContractAddress) : "",
      NftContractMinter: isSet(object.NftContractMinter) ? String(object.NftContractMinter) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.NftContractAddress !== undefined && (obj.NftContractAddress = message.NftContractAddress);
    message.NftContractMinter !== undefined && (obj.NftContractMinter = message.NftContractMinter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.NftContractAddress = object.NftContractAddress ?? "";
    message.NftContractMinter = object.NftContractMinter ?? "";
    return message;
  },
};

function createBaseEntityDoc(): EntityDoc {
  return {};
}

export const EntityDoc = {
  encode(_: EntityDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityDoc();
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

  fromJSON(_: any): EntityDoc {
    return {};
  },

  toJSON(_: EntityDoc): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EntityDoc>, I>>(_: I): EntityDoc {
    const message = createBaseEntityDoc();
    return message;
  },
};

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
