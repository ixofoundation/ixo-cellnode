/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { AccordedRight, Context, LinkedEntity, LinkedResource, Service } from "../iid/iid";
import { Verification } from "../iid/tx";

export const protobufPackage = "entity";

/** MsgCreateEntity defines a message for creating a project. */
export interface MsgCreateEntity {
  /** An Entity Type as defined by the implementer */
  entityType: string;
  /** Status of the Entity as defined by the implementer and interpreted by Client applications */
  entityStatus: number;
  /** the list of controller DIDs */
  controller: string[];
  /** JSON-LD contexts */
  context: Context[];
  /** Verification Methods and Verification Relationships */
  verification: Verification[];
  /** Service endpoints */
  service: Service[];
  /** Legal or Electronic Rights and associated Object Capabilities */
  accordedRight: AccordedRight[];
  /** Digital resources associated with the Subject */
  linkedResource: LinkedResource[];
  /** DID of a linked Entity and its relationship with the Subject */
  linkedEntity: LinkedEntity[];
  /** Operational status of the Entity */
  deactivated: boolean;
  /** Start Date of the Entity as defined by the implementer and interpreted by Client applications */
  startDate?: Date;
  /** End Date of the Entity as defined by the implementer and interpreted by Client applications */
  endDate?: Date;
  /** State of the Entity as defined by the implementer and interpreted by Client applications */
  stage: string;
  /** DID of the operator through which the Entity was created */
  relayerNode: string;
  /** Public proof that the Entity is verified */
  verificationStatus: string;
  /** Content ID or Hash of public Verifiable Credentials associated with the  subject */
  verifiableCredential: string[];
  /** Owner of the Entity NFT | The ownersdid used to sign this transaction. */
  ownerDid: string;
  /** The ownersdid address used to sign this transaction. */
  ownerAddress: string;
  /** Extention data */
  data: Uint8Array;
}

/** MsgCreateProjectResponse defines the Msg/CreateProject response type. */
export interface MsgCreateEntityResponse {
  entityId: string;
  entityType: string;
  entityStatus: number;
}

/** MsgUpdateEntityStatus defines a message for updating a entity's current status. */
export interface MsgUpdateEntity {
  /** The status of the entity. Should represent an enum in the client. */
  status: number;
  /** Whether this entity is enabled ot not, basically a soft delete. */
  deactivated: boolean;
  /** refer to iid module for more information */
  startDate?: Date;
  /** refer to iid module for more information */
  endDate?: Date;
  /** refer to iid module meta data for more information */
  stage: string;
  /** refer to iid module for more information */
  relayerNode: string;
  /** refer to iid module for more information */
  verifiableCredential: string;
  /** The ownersdid used to sign this transaction. */
  controllerDid: string;
  /** The ownersdid used to sign this transaction. */
  controllerAddress: string;
}

/** MsgUpdateProjectStatusResponse defines the Msg/UpdateEntityStatus response type. */
export interface MsgUpdateEntityResponse {
}

export interface MsgUpdateEntityConfig {
  nftContractAddress: string;
  signer: string;
}

/** MsgUpdateProjectStatusResponse defines the Msg/UpdateEntityStatus response type. */
export interface MsgUpdateEntityConfigResponse {
}

export interface MsgTransferEntity {
  entityDid: string;
  /** The ownersdid used to sign this transaction. */
  controllerDid: string;
  /** The ownersdid used to sign this transaction. */
  controllerAddress: string;
  recipientDid: string;
}

/** MsgUpdateProjectStatusResponse defines the Msg/UpdateEntityStatus response type. */
export interface MsgTransferEntityResponse {
}

function createBaseMsgCreateEntity(): MsgCreateEntity {
  return {
    entityType: "",
    entityStatus: 0,
    controller: [],
    context: [],
    verification: [],
    service: [],
    accordedRight: [],
    linkedResource: [],
    linkedEntity: [],
    deactivated: false,
    startDate: undefined,
    endDate: undefined,
    stage: "",
    relayerNode: "",
    verificationStatus: "",
    verifiableCredential: [],
    ownerDid: "",
    ownerAddress: "",
    data: new Uint8Array(),
  };
}

export const MsgCreateEntity = {
  encode(message: MsgCreateEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entityType !== "") {
      writer.uint32(10).string(message.entityType);
    }
    if (message.entityStatus !== 0) {
      writer.uint32(16).int32(message.entityStatus);
    }
    for (const v of message.controller) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.context) {
      Context.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.verification) {
      Verification.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.service) {
      Service.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.accordedRight) {
      AccordedRight.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.linkedResource) {
      LinkedResource.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.linkedEntity) {
      LinkedEntity.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.deactivated === true) {
      writer.uint32(80).bool(message.deactivated);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(90).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(98).fork()).ldelim();
    }
    if (message.stage !== "") {
      writer.uint32(106).string(message.stage);
    }
    if (message.relayerNode !== "") {
      writer.uint32(114).string(message.relayerNode);
    }
    if (message.verificationStatus !== "") {
      writer.uint32(122).string(message.verificationStatus);
    }
    for (const v of message.verifiableCredential) {
      writer.uint32(130).string(v!);
    }
    if (message.ownerDid !== "") {
      writer.uint32(138).string(message.ownerDid);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(146).string(message.ownerAddress);
    }
    if (message.data.length !== 0) {
      writer.uint32(154).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entityType = reader.string();
          break;
        case 2:
          message.entityStatus = reader.int32();
          break;
        case 3:
          message.controller.push(reader.string());
          break;
        case 4:
          message.context.push(Context.decode(reader, reader.uint32()));
          break;
        case 5:
          message.verification.push(Verification.decode(reader, reader.uint32()));
          break;
        case 6:
          message.service.push(Service.decode(reader, reader.uint32()));
          break;
        case 7:
          message.accordedRight.push(AccordedRight.decode(reader, reader.uint32()));
          break;
        case 8:
          message.linkedResource.push(LinkedResource.decode(reader, reader.uint32()));
          break;
        case 9:
          message.linkedEntity.push(LinkedEntity.decode(reader, reader.uint32()));
          break;
        case 10:
          message.deactivated = reader.bool();
          break;
        case 11:
          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 12:
          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 13:
          message.stage = reader.string();
          break;
        case 14:
          message.relayerNode = reader.string();
          break;
        case 15:
          message.verificationStatus = reader.string();
          break;
        case 16:
          message.verifiableCredential.push(reader.string());
          break;
        case 17:
          message.ownerDid = reader.string();
          break;
        case 18:
          message.ownerAddress = reader.string();
          break;
        case 19:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateEntity {
    return {
      entityType: isSet(object.entityType) ? String(object.entityType) : "",
      entityStatus: isSet(object.entityStatus) ? Number(object.entityStatus) : 0,
      controller: Array.isArray(object?.controller) ? object.controller.map((e: any) => String(e)) : [],
      context: Array.isArray(object?.context) ? object.context.map((e: any) => Context.fromJSON(e)) : [],
      verification: Array.isArray(object?.verification)
        ? object.verification.map((e: any) => Verification.fromJSON(e))
        : [],
      service: Array.isArray(object?.service) ? object.service.map((e: any) => Service.fromJSON(e)) : [],
      accordedRight: Array.isArray(object?.accordedRight)
        ? object.accordedRight.map((e: any) => AccordedRight.fromJSON(e))
        : [],
      linkedResource: Array.isArray(object?.linkedResource)
        ? object.linkedResource.map((e: any) => LinkedResource.fromJSON(e))
        : [],
      linkedEntity: Array.isArray(object?.linkedEntity)
        ? object.linkedEntity.map((e: any) => LinkedEntity.fromJSON(e))
        : [],
      deactivated: isSet(object.deactivated) ? Boolean(object.deactivated) : false,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      stage: isSet(object.stage) ? String(object.stage) : "",
      relayerNode: isSet(object.relayerNode) ? String(object.relayerNode) : "",
      verificationStatus: isSet(object.verificationStatus) ? String(object.verificationStatus) : "",
      verifiableCredential: Array.isArray(object?.verifiableCredential)
        ? object.verifiableCredential.map((e: any) => String(e))
        : [],
      ownerDid: isSet(object.ownerDid) ? String(object.ownerDid) : "",
      ownerAddress: isSet(object.ownerAddress) ? String(object.ownerAddress) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: MsgCreateEntity): unknown {
    const obj: any = {};
    message.entityType !== undefined && (obj.entityType = message.entityType);
    message.entityStatus !== undefined && (obj.entityStatus = Math.round(message.entityStatus));
    if (message.controller) {
      obj.controller = message.controller.map((e) => e);
    } else {
      obj.controller = [];
    }
    if (message.context) {
      obj.context = message.context.map((e) => e ? Context.toJSON(e) : undefined);
    } else {
      obj.context = [];
    }
    if (message.verification) {
      obj.verification = message.verification.map((e) => e ? Verification.toJSON(e) : undefined);
    } else {
      obj.verification = [];
    }
    if (message.service) {
      obj.service = message.service.map((e) => e ? Service.toJSON(e) : undefined);
    } else {
      obj.service = [];
    }
    if (message.accordedRight) {
      obj.accordedRight = message.accordedRight.map((e) => e ? AccordedRight.toJSON(e) : undefined);
    } else {
      obj.accordedRight = [];
    }
    if (message.linkedResource) {
      obj.linkedResource = message.linkedResource.map((e) => e ? LinkedResource.toJSON(e) : undefined);
    } else {
      obj.linkedResource = [];
    }
    if (message.linkedEntity) {
      obj.linkedEntity = message.linkedEntity.map((e) => e ? LinkedEntity.toJSON(e) : undefined);
    } else {
      obj.linkedEntity = [];
    }
    message.deactivated !== undefined && (obj.deactivated = message.deactivated);
    message.startDate !== undefined && (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined && (obj.endDate = message.endDate.toISOString());
    message.stage !== undefined && (obj.stage = message.stage);
    message.relayerNode !== undefined && (obj.relayerNode = message.relayerNode);
    message.verificationStatus !== undefined && (obj.verificationStatus = message.verificationStatus);
    if (message.verifiableCredential) {
      obj.verifiableCredential = message.verifiableCredential.map((e) => e);
    } else {
      obj.verifiableCredential = [];
    }
    message.ownerDid !== undefined && (obj.ownerDid = message.ownerDid);
    message.ownerAddress !== undefined && (obj.ownerAddress = message.ownerAddress);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateEntity>, I>>(object: I): MsgCreateEntity {
    const message = createBaseMsgCreateEntity();
    message.entityType = object.entityType ?? "";
    message.entityStatus = object.entityStatus ?? 0;
    message.controller = object.controller?.map((e) => e) || [];
    message.context = object.context?.map((e) => Context.fromPartial(e)) || [];
    message.verification = object.verification?.map((e) => Verification.fromPartial(e)) || [];
    message.service = object.service?.map((e) => Service.fromPartial(e)) || [];
    message.accordedRight = object.accordedRight?.map((e) => AccordedRight.fromPartial(e)) || [];
    message.linkedResource = object.linkedResource?.map((e) => LinkedResource.fromPartial(e)) || [];
    message.linkedEntity = object.linkedEntity?.map((e) => LinkedEntity.fromPartial(e)) || [];
    message.deactivated = object.deactivated ?? false;
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.stage = object.stage ?? "";
    message.relayerNode = object.relayerNode ?? "";
    message.verificationStatus = object.verificationStatus ?? "";
    message.verifiableCredential = object.verifiableCredential?.map((e) => e) || [];
    message.ownerDid = object.ownerDid ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgCreateEntityResponse(): MsgCreateEntityResponse {
  return { entityId: "", entityType: "", entityStatus: 0 };
}

export const MsgCreateEntityResponse = {
  encode(message: MsgCreateEntityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entityId !== "") {
      writer.uint32(10).string(message.entityId);
    }
    if (message.entityType !== "") {
      writer.uint32(18).string(message.entityType);
    }
    if (message.entityStatus !== 0) {
      writer.uint32(24).int32(message.entityStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateEntityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateEntityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entityId = reader.string();
          break;
        case 2:
          message.entityType = reader.string();
          break;
        case 3:
          message.entityStatus = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateEntityResponse {
    return {
      entityId: isSet(object.entityId) ? String(object.entityId) : "",
      entityType: isSet(object.entityType) ? String(object.entityType) : "",
      entityStatus: isSet(object.entityStatus) ? Number(object.entityStatus) : 0,
    };
  },

  toJSON(message: MsgCreateEntityResponse): unknown {
    const obj: any = {};
    message.entityId !== undefined && (obj.entityId = message.entityId);
    message.entityType !== undefined && (obj.entityType = message.entityType);
    message.entityStatus !== undefined && (obj.entityStatus = Math.round(message.entityStatus));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateEntityResponse>, I>>(object: I): MsgCreateEntityResponse {
    const message = createBaseMsgCreateEntityResponse();
    message.entityId = object.entityId ?? "";
    message.entityType = object.entityType ?? "";
    message.entityStatus = object.entityStatus ?? 0;
    return message;
  },
};

function createBaseMsgUpdateEntity(): MsgUpdateEntity {
  return {
    status: 0,
    deactivated: false,
    startDate: undefined,
    endDate: undefined,
    stage: "",
    relayerNode: "",
    verifiableCredential: "",
    controllerDid: "",
    controllerAddress: "",
  };
}

export const MsgUpdateEntity = {
  encode(message: MsgUpdateEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.deactivated === true) {
      writer.uint32(16).bool(message.deactivated);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.stage !== "") {
      writer.uint32(42).string(message.stage);
    }
    if (message.relayerNode !== "") {
      writer.uint32(50).string(message.relayerNode);
    }
    if (message.verifiableCredential !== "") {
      writer.uint32(58).string(message.verifiableCredential);
    }
    if (message.controllerDid !== "") {
      writer.uint32(66).string(message.controllerDid);
    }
    if (message.controllerAddress !== "") {
      writer.uint32(74).string(message.controllerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32();
          break;
        case 2:
          message.deactivated = reader.bool();
          break;
        case 3:
          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.stage = reader.string();
          break;
        case 6:
          message.relayerNode = reader.string();
          break;
        case 7:
          message.verifiableCredential = reader.string();
          break;
        case 8:
          message.controllerDid = reader.string();
          break;
        case 9:
          message.controllerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateEntity {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      deactivated: isSet(object.deactivated) ? Boolean(object.deactivated) : false,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      stage: isSet(object.stage) ? String(object.stage) : "",
      relayerNode: isSet(object.relayerNode) ? String(object.relayerNode) : "",
      verifiableCredential: isSet(object.verifiableCredential) ? String(object.verifiableCredential) : "",
      controllerDid: isSet(object.controllerDid) ? String(object.controllerDid) : "",
      controllerAddress: isSet(object.controllerAddress) ? String(object.controllerAddress) : "",
    };
  },

  toJSON(message: MsgUpdateEntity): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = Math.round(message.status));
    message.deactivated !== undefined && (obj.deactivated = message.deactivated);
    message.startDate !== undefined && (obj.startDate = message.startDate.toISOString());
    message.endDate !== undefined && (obj.endDate = message.endDate.toISOString());
    message.stage !== undefined && (obj.stage = message.stage);
    message.relayerNode !== undefined && (obj.relayerNode = message.relayerNode);
    message.verifiableCredential !== undefined && (obj.verifiableCredential = message.verifiableCredential);
    message.controllerDid !== undefined && (obj.controllerDid = message.controllerDid);
    message.controllerAddress !== undefined && (obj.controllerAddress = message.controllerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateEntity>, I>>(object: I): MsgUpdateEntity {
    const message = createBaseMsgUpdateEntity();
    message.status = object.status ?? 0;
    message.deactivated = object.deactivated ?? false;
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.stage = object.stage ?? "";
    message.relayerNode = object.relayerNode ?? "";
    message.verifiableCredential = object.verifiableCredential ?? "";
    message.controllerDid = object.controllerDid ?? "";
    message.controllerAddress = object.controllerAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateEntityResponse(): MsgUpdateEntityResponse {
  return {};
}

export const MsgUpdateEntityResponse = {
  encode(_: MsgUpdateEntityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateEntityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEntityResponse();
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

  fromJSON(_: any): MsgUpdateEntityResponse {
    return {};
  },

  toJSON(_: MsgUpdateEntityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateEntityResponse>, I>>(_: I): MsgUpdateEntityResponse {
    const message = createBaseMsgUpdateEntityResponse();
    return message;
  },
};

function createBaseMsgUpdateEntityConfig(): MsgUpdateEntityConfig {
  return { nftContractAddress: "", signer: "" };
}

export const MsgUpdateEntityConfig = {
  encode(message: MsgUpdateEntityConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nftContractAddress !== "") {
      writer.uint32(10).string(message.nftContractAddress);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateEntityConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEntityConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftContractAddress = reader.string();
          break;
        case 2:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateEntityConfig {
    return {
      nftContractAddress: isSet(object.nftContractAddress) ? String(object.nftContractAddress) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgUpdateEntityConfig): unknown {
    const obj: any = {};
    message.nftContractAddress !== undefined && (obj.nftContractAddress = message.nftContractAddress);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateEntityConfig>, I>>(object: I): MsgUpdateEntityConfig {
    const message = createBaseMsgUpdateEntityConfig();
    message.nftContractAddress = object.nftContractAddress ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgUpdateEntityConfigResponse(): MsgUpdateEntityConfigResponse {
  return {};
}

export const MsgUpdateEntityConfigResponse = {
  encode(_: MsgUpdateEntityConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateEntityConfigResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEntityConfigResponse();
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

  fromJSON(_: any): MsgUpdateEntityConfigResponse {
    return {};
  },

  toJSON(_: MsgUpdateEntityConfigResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateEntityConfigResponse>, I>>(_: I): MsgUpdateEntityConfigResponse {
    const message = createBaseMsgUpdateEntityConfigResponse();
    return message;
  },
};

function createBaseMsgTransferEntity(): MsgTransferEntity {
  return { entityDid: "", controllerDid: "", controllerAddress: "", recipientDid: "" };
}

export const MsgTransferEntity = {
  encode(message: MsgTransferEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entityDid !== "") {
      writer.uint32(10).string(message.entityDid);
    }
    if (message.controllerDid !== "") {
      writer.uint32(18).string(message.controllerDid);
    }
    if (message.controllerAddress !== "") {
      writer.uint32(26).string(message.controllerAddress);
    }
    if (message.recipientDid !== "") {
      writer.uint32(34).string(message.recipientDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entityDid = reader.string();
          break;
        case 2:
          message.controllerDid = reader.string();
          break;
        case 3:
          message.controllerAddress = reader.string();
          break;
        case 4:
          message.recipientDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferEntity {
    return {
      entityDid: isSet(object.entityDid) ? String(object.entityDid) : "",
      controllerDid: isSet(object.controllerDid) ? String(object.controllerDid) : "",
      controllerAddress: isSet(object.controllerAddress) ? String(object.controllerAddress) : "",
      recipientDid: isSet(object.recipientDid) ? String(object.recipientDid) : "",
    };
  },

  toJSON(message: MsgTransferEntity): unknown {
    const obj: any = {};
    message.entityDid !== undefined && (obj.entityDid = message.entityDid);
    message.controllerDid !== undefined && (obj.controllerDid = message.controllerDid);
    message.controllerAddress !== undefined && (obj.controllerAddress = message.controllerAddress);
    message.recipientDid !== undefined && (obj.recipientDid = message.recipientDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferEntity>, I>>(object: I): MsgTransferEntity {
    const message = createBaseMsgTransferEntity();
    message.entityDid = object.entityDid ?? "";
    message.controllerDid = object.controllerDid ?? "";
    message.controllerAddress = object.controllerAddress ?? "";
    message.recipientDid = object.recipientDid ?? "";
    return message;
  },
};

function createBaseMsgTransferEntityResponse(): MsgTransferEntityResponse {
  return {};
}

export const MsgTransferEntityResponse = {
  encode(_: MsgTransferEntityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferEntityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferEntityResponse();
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

  fromJSON(_: any): MsgTransferEntityResponse {
    return {};
  },

  toJSON(_: MsgTransferEntityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferEntityResponse>, I>>(_: I): MsgTransferEntityResponse {
    const message = createBaseMsgTransferEntityResponse();
    return message;
  },
};

/** Msg defines the project Msg service. */
export interface Msg {
  /** CreateProject defines a method for creating a project. */
  CreateEntity(request: MsgCreateEntity): Promise<MsgCreateEntityResponse>;
  /** // UpdateEntityStatus defines a method for updating a entity's current status. */
  UpdateEntity(request: MsgUpdateEntity): Promise<MsgUpdateEntityResponse>;
  UpdateEntityConfig(request: MsgUpdateEntityConfig): Promise<MsgUpdateEntityConfigResponse>;
  TransferEntity(request: MsgTransferEntity): Promise<MsgTransferEntityResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "entity.Msg";
    this.rpc = rpc;
    this.CreateEntity = this.CreateEntity.bind(this);
    this.UpdateEntity = this.UpdateEntity.bind(this);
    this.UpdateEntityConfig = this.UpdateEntityConfig.bind(this);
    this.TransferEntity = this.TransferEntity.bind(this);
  }
  CreateEntity(request: MsgCreateEntity): Promise<MsgCreateEntityResponse> {
    const data = MsgCreateEntity.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateEntity", data);
    return promise.then((data) => MsgCreateEntityResponse.decode(new _m0.Reader(data)));
  }

  UpdateEntity(request: MsgUpdateEntity): Promise<MsgUpdateEntityResponse> {
    const data = MsgUpdateEntity.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateEntity", data);
    return promise.then((data) => MsgUpdateEntityResponse.decode(new _m0.Reader(data)));
  }

  UpdateEntityConfig(request: MsgUpdateEntityConfig): Promise<MsgUpdateEntityConfigResponse> {
    const data = MsgUpdateEntityConfig.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateEntityConfig", data);
    return promise.then((data) => MsgUpdateEntityConfigResponse.decode(new _m0.Reader(data)));
  }

  TransferEntity(request: MsgTransferEntity): Promise<MsgTransferEntityResponse> {
    const data = MsgTransferEntity.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferEntity", data);
    return promise.then((data) => MsgTransferEntityResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
