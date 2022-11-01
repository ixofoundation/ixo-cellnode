/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmwasm.wasm.v1beta1";

/** AccessType permission types */
export enum AccessType {
  /** ACCESS_TYPE_UNSPECIFIED - AccessTypeUnspecified placeholder for empty value */
  ACCESS_TYPE_UNSPECIFIED = 0,
  /** ACCESS_TYPE_NOBODY - AccessTypeNobody forbidden */
  ACCESS_TYPE_NOBODY = 1,
  /** ACCESS_TYPE_ONLY_ADDRESS - AccessTypeOnlyAddress restricted to an address */
  ACCESS_TYPE_ONLY_ADDRESS = 2,
  /** ACCESS_TYPE_EVERYBODY - AccessTypeEverybody unrestricted */
  ACCESS_TYPE_EVERYBODY = 3,
  UNRECOGNIZED = -1,
}

export function accessTypeFromJSON(object: any): AccessType {
  switch (object) {
    case 0:
    case "ACCESS_TYPE_UNSPECIFIED":
      return AccessType.ACCESS_TYPE_UNSPECIFIED;
    case 1:
    case "ACCESS_TYPE_NOBODY":
      return AccessType.ACCESS_TYPE_NOBODY;
    case 2:
    case "ACCESS_TYPE_ONLY_ADDRESS":
      return AccessType.ACCESS_TYPE_ONLY_ADDRESS;
    case 3:
    case "ACCESS_TYPE_EVERYBODY":
      return AccessType.ACCESS_TYPE_EVERYBODY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessType.UNRECOGNIZED;
  }
}

export function accessTypeToJSON(object: AccessType): string {
  switch (object) {
    case AccessType.ACCESS_TYPE_UNSPECIFIED:
      return "ACCESS_TYPE_UNSPECIFIED";
    case AccessType.ACCESS_TYPE_NOBODY:
      return "ACCESS_TYPE_NOBODY";
    case AccessType.ACCESS_TYPE_ONLY_ADDRESS:
      return "ACCESS_TYPE_ONLY_ADDRESS";
    case AccessType.ACCESS_TYPE_EVERYBODY:
      return "ACCESS_TYPE_EVERYBODY";
    default:
      return "UNKNOWN";
  }
}

/** ContractCodeHistoryOperationType actions that caused a code change */
export enum ContractCodeHistoryOperationType {
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED - ContractCodeHistoryOperationTypeUnspecified placeholder for empty value */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT - ContractCodeHistoryOperationTypeInit on chain contract instantiation */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE - ContractCodeHistoryOperationTypeMigrate code migration */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS - ContractCodeHistoryOperationTypeGenesis based on genesis data */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
  UNRECOGNIZED = -1,
}

export function contractCodeHistoryOperationTypeFromJSON(object: any): ContractCodeHistoryOperationType {
  switch (object) {
    case 0:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED;
    case 1:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT;
    case 2:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE;
    case 3:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContractCodeHistoryOperationType.UNRECOGNIZED;
  }
}

export function contractCodeHistoryOperationTypeToJSON(object: ContractCodeHistoryOperationType): string {
  switch (object) {
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
    default:
      return "UNKNOWN";
  }
}

/** AccessTypeParam */
export interface AccessTypeParam {
  value: AccessType;
}

/** AccessConfig access control type. */
export interface AccessConfig {
  permission: AccessType;
  address: string;
}

/** Params defines the set of wasm parameters. */
export interface Params {
  codeUploadAccess?: AccessConfig;
  instantiateDefaultPermission: AccessType;
  maxWasmCodeSize: Long;
}

/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfo {
  /** CodeHash is the unique identifier created by wasmvm */
  codeHash: Uint8Array;
  /** Creator address who initially stored the code */
  creator: string;
  /**
   * Source is a valid absolute HTTPS URI to the contract's source code,
   * optional
   */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
  /** InstantiateConfig access control to apply on contract creation, optional */
  instantiateConfig?: AccessConfig;
}

/** ContractInfo stores a WASM contract instance */
export interface ContractInfo {
  /** CodeID is the reference to the stored Wasm code */
  codeId: Long;
  /** Creator address who initially instantiated the contract */
  creator: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Label is optional metadata to be stored with a contract instance. */
  label: string;
  /**
   * Created Tx position when the contract was instantiated.
   * This data should kept internal and not be exposed via query results. Just
   * use for sorting
   */
  created?: AbsoluteTxPosition;
  ibcPortId: string;
  /**
   * Extension is an extension point to store custom metadata within the
   * persistence model.
   */
  extension?: Any;
}

/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntry {
  operation: ContractCodeHistoryOperationType;
  /** CodeID is the reference to the stored WASM code */
  codeId: Long;
  /** Updated Tx position when the operation was executed. */
  updated?: AbsoluteTxPosition;
  msg: Uint8Array;
}

/**
 * AbsoluteTxPosition is a unique transaction position that allows for global
 * ordering of transactions.
 */
export interface AbsoluteTxPosition {
  /** BlockHeight is the block the contract was created at */
  blockHeight: Long;
  /**
   * TxIndex is a monotonic counter within the block (actual transaction index,
   * or gas consumed)
   */
  txIndex: Long;
}

/** Model is a struct that holds a KV pair */
export interface Model {
  /** hex-encode key to read it better (this is often ascii) */
  key: Uint8Array;
  /** base64-encode raw value */
  value: Uint8Array;
}

const baseAccessTypeParam: object = { value: 0 };

export const AccessTypeParam = {
  encode(message: AccessTypeParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessTypeParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccessTypeParam } as AccessTypeParam;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccessTypeParam {
    const message = { ...baseAccessTypeParam } as AccessTypeParam;
    message.value =
      object.value !== undefined && object.value !== null ? accessTypeFromJSON(object.value) : 0;
    return message;
  },

  toJSON(message: AccessTypeParam): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = accessTypeToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccessTypeParam>, I>>(object: I): AccessTypeParam {
    const message = { ...baseAccessTypeParam } as AccessTypeParam;
    message.value = object.value ?? 0;
    return message;
  },
};

const baseAccessConfig: object = { permission: 0, address: "" };

export const AccessConfig = {
  encode(message: AccessConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.permission !== 0) {
      writer.uint32(8).int32(message.permission);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccessConfig } as AccessConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permission = reader.int32() as any;
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccessConfig {
    const message = { ...baseAccessConfig } as AccessConfig;
    message.permission =
      object.permission !== undefined && object.permission !== null
        ? accessTypeFromJSON(object.permission)
        : 0;
    message.address = object.address !== undefined && object.address !== null ? String(object.address) : "";
    return message;
  },

  toJSON(message: AccessConfig): unknown {
    const obj: any = {};
    message.permission !== undefined && (obj.permission = accessTypeToJSON(message.permission));
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccessConfig>, I>>(object: I): AccessConfig {
    const message = { ...baseAccessConfig } as AccessConfig;
    message.permission = object.permission ?? 0;
    message.address = object.address ?? "";
    return message;
  },
};

const baseParams: object = { instantiateDefaultPermission: 0, maxWasmCodeSize: Long.UZERO };

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.codeUploadAccess !== undefined) {
      AccessConfig.encode(message.codeUploadAccess, writer.uint32(10).fork()).ldelim();
    }
    if (message.instantiateDefaultPermission !== 0) {
      writer.uint32(16).int32(message.instantiateDefaultPermission);
    }
    if (!message.maxWasmCodeSize.isZero()) {
      writer.uint32(24).uint64(message.maxWasmCodeSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeUploadAccess = AccessConfig.decode(reader, reader.uint32());
          break;
        case 2:
          message.instantiateDefaultPermission = reader.int32() as any;
          break;
        case 3:
          message.maxWasmCodeSize = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    message.codeUploadAccess =
      object.codeUploadAccess !== undefined && object.codeUploadAccess !== null
        ? AccessConfig.fromJSON(object.codeUploadAccess)
        : undefined;
    message.instantiateDefaultPermission =
      object.instantiateDefaultPermission !== undefined && object.instantiateDefaultPermission !== null
        ? accessTypeFromJSON(object.instantiateDefaultPermission)
        : 0;
    message.maxWasmCodeSize =
      object.maxWasmCodeSize !== undefined && object.maxWasmCodeSize !== null
        ? Long.fromString(object.maxWasmCodeSize)
        : Long.UZERO;
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.codeUploadAccess !== undefined &&
      (obj.codeUploadAccess = message.codeUploadAccess
        ? AccessConfig.toJSON(message.codeUploadAccess)
        : undefined);
    message.instantiateDefaultPermission !== undefined &&
      (obj.instantiateDefaultPermission = accessTypeToJSON(message.instantiateDefaultPermission));
    message.maxWasmCodeSize !== undefined &&
      (obj.maxWasmCodeSize = (message.maxWasmCodeSize || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = { ...baseParams } as Params;
    message.codeUploadAccess =
      object.codeUploadAccess !== undefined && object.codeUploadAccess !== null
        ? AccessConfig.fromPartial(object.codeUploadAccess)
        : undefined;
    message.instantiateDefaultPermission = object.instantiateDefaultPermission ?? 0;
    message.maxWasmCodeSize =
      object.maxWasmCodeSize !== undefined && object.maxWasmCodeSize !== null
        ? Long.fromValue(object.maxWasmCodeSize)
        : Long.UZERO;
    return message;
  },
};

const baseCodeInfo: object = { creator: "", source: "", builder: "" };

export const CodeInfo = {
  encode(message: CodeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.codeHash.length !== 0) {
      writer.uint32(10).bytes(message.codeHash);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(34).string(message.builder);
    }
    if (message.instantiateConfig !== undefined) {
      AccessConfig.encode(message.instantiateConfig, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCodeInfo } as CodeInfo;
    message.codeHash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeHash = reader.bytes();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.builder = reader.string();
          break;
        case 5:
          message.instantiateConfig = AccessConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeInfo {
    const message = { ...baseCodeInfo } as CodeInfo;
    message.codeHash =
      object.codeHash !== undefined && object.codeHash !== null
        ? bytesFromBase64(object.codeHash)
        : new Uint8Array();
    message.creator = object.creator !== undefined && object.creator !== null ? String(object.creator) : "";
    message.source = object.source !== undefined && object.source !== null ? String(object.source) : "";
    message.builder = object.builder !== undefined && object.builder !== null ? String(object.builder) : "";
    message.instantiateConfig =
      object.instantiateConfig !== undefined && object.instantiateConfig !== null
        ? AccessConfig.fromJSON(object.instantiateConfig)
        : undefined;
    return message;
  },

  toJSON(message: CodeInfo): unknown {
    const obj: any = {};
    message.codeHash !== undefined &&
      (obj.codeHash = base64FromBytes(message.codeHash !== undefined ? message.codeHash : new Uint8Array()));
    message.creator !== undefined && (obj.creator = message.creator);
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    message.instantiateConfig !== undefined &&
      (obj.instantiateConfig = message.instantiateConfig
        ? AccessConfig.toJSON(message.instantiateConfig)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodeInfo>, I>>(object: I): CodeInfo {
    const message = { ...baseCodeInfo } as CodeInfo;
    message.codeHash = object.codeHash ?? new Uint8Array();
    message.creator = object.creator ?? "";
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    message.instantiateConfig =
      object.instantiateConfig !== undefined && object.instantiateConfig !== null
        ? AccessConfig.fromPartial(object.instantiateConfig)
        : undefined;
    return message;
  },
};

const baseContractInfo: object = { codeId: Long.UZERO, creator: "", admin: "", label: "", ibcPortId: "" };

export const ContractInfo = {
  encode(message: ContractInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.codeId.isZero()) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.admin !== "") {
      writer.uint32(26).string(message.admin);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.created !== undefined) {
      AbsoluteTxPosition.encode(message.created, writer.uint32(42).fork()).ldelim();
    }
    if (message.ibcPortId !== "") {
      writer.uint32(50).string(message.ibcPortId);
    }
    if (message.extension !== undefined) {
      Any.encode(message.extension, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractInfo } as ContractInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64() as Long;
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.admin = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.created = AbsoluteTxPosition.decode(reader, reader.uint32());
          break;
        case 6:
          message.ibcPortId = reader.string();
          break;
        case 7:
          message.extension = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractInfo {
    const message = { ...baseContractInfo } as ContractInfo;
    message.codeId =
      object.codeId !== undefined && object.codeId !== null ? Long.fromString(object.codeId) : Long.UZERO;
    message.creator = object.creator !== undefined && object.creator !== null ? String(object.creator) : "";
    message.admin = object.admin !== undefined && object.admin !== null ? String(object.admin) : "";
    message.label = object.label !== undefined && object.label !== null ? String(object.label) : "";
    message.created =
      object.created !== undefined && object.created !== null
        ? AbsoluteTxPosition.fromJSON(object.created)
        : undefined;
    message.ibcPortId =
      object.ibcPortId !== undefined && object.ibcPortId !== null ? String(object.ibcPortId) : "";
    message.extension =
      object.extension !== undefined && object.extension !== null
        ? Any.fromJSON(object.extension)
        : undefined;
    return message;
  },

  toJSON(message: ContractInfo): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = (message.codeId || Long.UZERO).toString());
    message.creator !== undefined && (obj.creator = message.creator);
    message.admin !== undefined && (obj.admin = message.admin);
    message.label !== undefined && (obj.label = message.label);
    message.created !== undefined &&
      (obj.created = message.created ? AbsoluteTxPosition.toJSON(message.created) : undefined);
    message.ibcPortId !== undefined && (obj.ibcPortId = message.ibcPortId);
    message.extension !== undefined &&
      (obj.extension = message.extension ? Any.toJSON(message.extension) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractInfo>, I>>(object: I): ContractInfo {
    const message = { ...baseContractInfo } as ContractInfo;
    message.codeId =
      object.codeId !== undefined && object.codeId !== null ? Long.fromValue(object.codeId) : Long.UZERO;
    message.creator = object.creator ?? "";
    message.admin = object.admin ?? "";
    message.label = object.label ?? "";
    message.created =
      object.created !== undefined && object.created !== null
        ? AbsoluteTxPosition.fromPartial(object.created)
        : undefined;
    message.ibcPortId = object.ibcPortId ?? "";
    message.extension =
      object.extension !== undefined && object.extension !== null
        ? Any.fromPartial(object.extension)
        : undefined;
    return message;
  },
};

const baseContractCodeHistoryEntry: object = { operation: 0, codeId: Long.UZERO };

export const ContractCodeHistoryEntry = {
  encode(message: ContractCodeHistoryEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operation !== 0) {
      writer.uint32(8).int32(message.operation);
    }
    if (!message.codeId.isZero()) {
      writer.uint32(16).uint64(message.codeId);
    }
    if (message.updated !== undefined) {
      AbsoluteTxPosition.encode(message.updated, writer.uint32(26).fork()).ldelim();
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractCodeHistoryEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContractCodeHistoryEntry } as ContractCodeHistoryEntry;
    message.msg = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operation = reader.int32() as any;
          break;
        case 2:
          message.codeId = reader.uint64() as Long;
          break;
        case 3:
          message.updated = AbsoluteTxPosition.decode(reader, reader.uint32());
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractCodeHistoryEntry {
    const message = { ...baseContractCodeHistoryEntry } as ContractCodeHistoryEntry;
    message.operation =
      object.operation !== undefined && object.operation !== null
        ? contractCodeHistoryOperationTypeFromJSON(object.operation)
        : 0;
    message.codeId =
      object.codeId !== undefined && object.codeId !== null ? Long.fromString(object.codeId) : Long.UZERO;
    message.updated =
      object.updated !== undefined && object.updated !== null
        ? AbsoluteTxPosition.fromJSON(object.updated)
        : undefined;
    message.msg =
      object.msg !== undefined && object.msg !== null ? bytesFromBase64(object.msg) : new Uint8Array();
    return message;
  },

  toJSON(message: ContractCodeHistoryEntry): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = contractCodeHistoryOperationTypeToJSON(message.operation));
    message.codeId !== undefined && (obj.codeId = (message.codeId || Long.UZERO).toString());
    message.updated !== undefined &&
      (obj.updated = message.updated ? AbsoluteTxPosition.toJSON(message.updated) : undefined);
    message.msg !== undefined &&
      (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractCodeHistoryEntry>, I>>(
    object: I,
  ): ContractCodeHistoryEntry {
    const message = { ...baseContractCodeHistoryEntry } as ContractCodeHistoryEntry;
    message.operation = object.operation ?? 0;
    message.codeId =
      object.codeId !== undefined && object.codeId !== null ? Long.fromValue(object.codeId) : Long.UZERO;
    message.updated =
      object.updated !== undefined && object.updated !== null
        ? AbsoluteTxPosition.fromPartial(object.updated)
        : undefined;
    message.msg = object.msg ?? new Uint8Array();
    return message;
  },
};

const baseAbsoluteTxPosition: object = { blockHeight: Long.UZERO, txIndex: Long.UZERO };

export const AbsoluteTxPosition = {
  encode(message: AbsoluteTxPosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.blockHeight.isZero()) {
      writer.uint32(8).uint64(message.blockHeight);
    }
    if (!message.txIndex.isZero()) {
      writer.uint32(16).uint64(message.txIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AbsoluteTxPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAbsoluteTxPosition } as AbsoluteTxPosition;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.uint64() as Long;
          break;
        case 2:
          message.txIndex = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AbsoluteTxPosition {
    const message = { ...baseAbsoluteTxPosition } as AbsoluteTxPosition;
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromString(object.blockHeight)
        : Long.UZERO;
    message.txIndex =
      object.txIndex !== undefined && object.txIndex !== null ? Long.fromString(object.txIndex) : Long.UZERO;
    return message;
  },

  toJSON(message: AbsoluteTxPosition): unknown {
    const obj: any = {};
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.UZERO).toString());
    message.txIndex !== undefined && (obj.txIndex = (message.txIndex || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AbsoluteTxPosition>, I>>(object: I): AbsoluteTxPosition {
    const message = { ...baseAbsoluteTxPosition } as AbsoluteTxPosition;
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromValue(object.blockHeight)
        : Long.UZERO;
    message.txIndex =
      object.txIndex !== undefined && object.txIndex !== null ? Long.fromValue(object.txIndex) : Long.UZERO;
    return message;
  },
};

const baseModel: object = {};

export const Model = {
  encode(message: Model, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Model {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModel } as Model;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Model {
    const message = { ...baseModel } as Model;
    message.key =
      object.key !== undefined && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
    message.value =
      object.value !== undefined && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
    return message;
  },

  toJSON(message: Model): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Model>, I>>(object: I): Model {
    const message = { ...baseModel } as Model;
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
