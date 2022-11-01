/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Batch, Bond, Params } from "./bonds";

export const protobufPackage = "bonds";

/** GenesisState defines the bonds module's genesis state. */
export interface GenesisState {
  bonds: Bond[];
  batches: Batch[];
  params?: Params;
}

function createBaseGenesisState(): GenesisState {
  return { bonds: [], batches: [], params: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bonds) {
      Bond.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.batches) {
      Batch.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bonds.push(Bond.decode(reader, reader.uint32()));
          break;
        case 2:
          message.batches.push(Batch.decode(reader, reader.uint32()));
          break;
        case 3:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      bonds: Array.isArray(object?.bonds) ? object.bonds.map((e: any) => Bond.fromJSON(e)) : [],
      batches: Array.isArray(object?.batches) ? object.batches.map((e: any) => Batch.fromJSON(e)) : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.bonds) {
      obj.bonds = message.bonds.map((e) => e ? Bond.toJSON(e) : undefined);
    } else {
      obj.bonds = [];
    }
    if (message.batches) {
      obj.batches = message.batches.map((e) => e ? Batch.toJSON(e) : undefined);
    } else {
      obj.batches = [];
    }
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.bonds = object.bonds?.map((e) => Bond.fromPartial(e)) || [];
    message.batches = object.batches?.map((e) => Batch.fromPartial(e)) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
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
