/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "legacydid";

/** Digital identity credential issued to an ixo DID */
export interface DidCredential {
  credType: string[];
  issuer: string;
  issued: string;
  claim?: Claim;
}

/** The claim section of a credential, indicating if the DID is KYC validated */
export interface Claim {
  id: string;
  KYCValidated: boolean;
}

/** An ixo DID with public and private keys, based on the Sovrin DID spec */
export interface IxoDid {
  did: string;
  verifyKey: string;
  encryptionPublicKey: string;
  secret?: Secret;
}

/** The private section of an ixo DID, based on the Sovrin DID spec */
export interface Secret {
  seed: string;
  signKey: string;
  encryptionPrivateKey: string;
}

function createBaseDidCredential(): DidCredential {
  return { credType: [], issuer: "", issued: "", claim: undefined };
}

export const DidCredential = {
  encode(message: DidCredential, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.credType) {
      writer.uint32(10).string(v!);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.issued !== "") {
      writer.uint32(26).string(message.issued);
    }
    if (message.claim !== undefined) {
      Claim.encode(message.claim, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DidCredential {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDidCredential();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credType.push(reader.string());
          break;
        case 2:
          message.issuer = reader.string();
          break;
        case 3:
          message.issued = reader.string();
          break;
        case 4:
          message.claim = Claim.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DidCredential {
    return {
      credType: Array.isArray(object?.credType) ? object.credType.map((e: any) => String(e)) : [],
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      issued: isSet(object.issued) ? String(object.issued) : "",
      claim: isSet(object.claim) ? Claim.fromJSON(object.claim) : undefined,
    };
  },

  toJSON(message: DidCredential): unknown {
    const obj: any = {};
    if (message.credType) {
      obj.credType = message.credType.map((e) => e);
    } else {
      obj.credType = [];
    }
    message.issuer !== undefined && (obj.issuer = message.issuer);
    message.issued !== undefined && (obj.issued = message.issued);
    message.claim !== undefined && (obj.claim = message.claim ? Claim.toJSON(message.claim) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DidCredential>, I>>(object: I): DidCredential {
    const message = createBaseDidCredential();
    message.credType = object.credType?.map((e) => e) || [];
    message.issuer = object.issuer ?? "";
    message.issued = object.issued ?? "";
    message.claim = (object.claim !== undefined && object.claim !== null) ? Claim.fromPartial(object.claim) : undefined;
    return message;
  },
};

function createBaseClaim(): Claim {
  return { id: "", KYCValidated: false };
}

export const Claim = {
  encode(message: Claim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.KYCValidated === true) {
      writer.uint32(16).bool(message.KYCValidated);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Claim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.KYCValidated = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Claim {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      KYCValidated: isSet(object.KYCValidated) ? Boolean(object.KYCValidated) : false,
    };
  },

  toJSON(message: Claim): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.KYCValidated !== undefined && (obj.KYCValidated = message.KYCValidated);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Claim>, I>>(object: I): Claim {
    const message = createBaseClaim();
    message.id = object.id ?? "";
    message.KYCValidated = object.KYCValidated ?? false;
    return message;
  },
};

function createBaseIxoDid(): IxoDid {
  return { did: "", verifyKey: "", encryptionPublicKey: "", secret: undefined };
}

export const IxoDid = {
  encode(message: IxoDid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.verifyKey !== "") {
      writer.uint32(18).string(message.verifyKey);
    }
    if (message.encryptionPublicKey !== "") {
      writer.uint32(26).string(message.encryptionPublicKey);
    }
    if (message.secret !== undefined) {
      Secret.encode(message.secret, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IxoDid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIxoDid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        case 2:
          message.verifyKey = reader.string();
          break;
        case 3:
          message.encryptionPublicKey = reader.string();
          break;
        case 4:
          message.secret = Secret.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IxoDid {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      verifyKey: isSet(object.verifyKey) ? String(object.verifyKey) : "",
      encryptionPublicKey: isSet(object.encryptionPublicKey) ? String(object.encryptionPublicKey) : "",
      secret: isSet(object.secret) ? Secret.fromJSON(object.secret) : undefined,
    };
  },

  toJSON(message: IxoDid): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    message.verifyKey !== undefined && (obj.verifyKey = message.verifyKey);
    message.encryptionPublicKey !== undefined && (obj.encryptionPublicKey = message.encryptionPublicKey);
    message.secret !== undefined && (obj.secret = message.secret ? Secret.toJSON(message.secret) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IxoDid>, I>>(object: I): IxoDid {
    const message = createBaseIxoDid();
    message.did = object.did ?? "";
    message.verifyKey = object.verifyKey ?? "";
    message.encryptionPublicKey = object.encryptionPublicKey ?? "";
    message.secret = (object.secret !== undefined && object.secret !== null)
      ? Secret.fromPartial(object.secret)
      : undefined;
    return message;
  },
};

function createBaseSecret(): Secret {
  return { seed: "", signKey: "", encryptionPrivateKey: "" };
}

export const Secret = {
  encode(message: Secret, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seed !== "") {
      writer.uint32(10).string(message.seed);
    }
    if (message.signKey !== "") {
      writer.uint32(18).string(message.signKey);
    }
    if (message.encryptionPrivateKey !== "") {
      writer.uint32(26).string(message.encryptionPrivateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Secret {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecret();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seed = reader.string();
          break;
        case 2:
          message.signKey = reader.string();
          break;
        case 3:
          message.encryptionPrivateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Secret {
    return {
      seed: isSet(object.seed) ? String(object.seed) : "",
      signKey: isSet(object.signKey) ? String(object.signKey) : "",
      encryptionPrivateKey: isSet(object.encryptionPrivateKey) ? String(object.encryptionPrivateKey) : "",
    };
  },

  toJSON(message: Secret): unknown {
    const obj: any = {};
    message.seed !== undefined && (obj.seed = message.seed);
    message.signKey !== undefined && (obj.signKey = message.signKey);
    message.encryptionPrivateKey !== undefined && (obj.encryptionPrivateKey = message.encryptionPrivateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Secret>, I>>(object: I): Secret {
    const message = createBaseSecret();
    message.seed = object.seed ?? "";
    message.signKey = object.signKey ?? "";
    message.encryptionPrivateKey = object.encryptionPrivateKey ?? "";
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
