/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  AccordedRight,
  Context,
  IidDocument,
  IidMetadata,
  LinkedEntity,
  LinkedResource,
  Service,
  VerificationMethod,
} from "./iid";

export const protobufPackage = "iid";

/**
 * Verification is a message that allows to assign a verification method
 * to one or more verification relationships
 */
export interface Verification {
  /**
   * verificationRelationships defines which relationships
   * are allowed to use the verification method
   */
  relationships: string[];
  /** public key associated with the did document. */
  method?: VerificationMethod;
  /** additional contexts (json ld schemas) */
  context: string[];
}

/** MsgCreateDidDocument defines a SDK message for creating a new did. */
export interface MsgCreateIidDocument {
  /** the did */
  id: string;
  /** the list of controller DIDs */
  controllers: string[];
  context: Context[];
  /** the list of verification methods and relationships */
  verifications: Verification[];
  services: Service[];
  accordedRight: AccordedRight[];
  linkedResource: LinkedResource[];
  linkedEntity: LinkedEntity[];
  /** address of the account signing the message */
  signer: string;
}

export interface MsgCreateIidDocumentResponse {
}

/** MsgUpdateDidDocument replace an existing did document with a new version */
export interface MsgUpdateIidDocument {
  /** the did document to replace */
  doc?: IidDocument;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgUpdateIidDocumentResponse {
}

export interface MsgAddVerification {
  /** the did */
  id: string;
  /** the verification to add */
  verification?: Verification;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddVerificationResponse {
}

export interface MsgSetVerificationRelationships {
  /** the did */
  id: string;
  /** the verification method id */
  methodId: string;
  /** the list of relationships to set */
  relationships: string[];
  /** address of the account signing the message */
  signer: string;
}

export interface MsgSetVerificationRelationshipsResponse {
}

export interface MsgRevokeVerification {
  /** the did */
  id: string;
  /** the verification method id */
  methodId: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgRevokeVerificationResponse {
}

export interface MsgAddService {
  /** the did */
  id: string;
  /** the service data to add */
  serviceData?: Service;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddServiceResponse {
}

export interface MsgDeleteService {
  /** the did */
  id: string;
  /** the service id */
  serviceId: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteServiceResponse {
}

export interface MsgAddController {
  /** the did of the document */
  id: string;
  /** the did to add as a controller of the did document */
  controllerDid: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddControllerResponse {
}

export interface MsgDeleteController {
  /** the did of the document */
  id: string;
  /** the did to remove from the list of controllers of the did document */
  controllerDid: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteControllerResponse {
}

export interface MsgAddLinkedResource {
  /** the did */
  id: string;
  /** the verification to add */
  linkedResource?: LinkedResource;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteLinkedResource {
  /** the did */
  id: string;
  /** the service id */
  resourceId: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddLinkedEntity {
  /** the iid */
  id: string;
  /** the entity to add */
  linkedEntity?: LinkedEntity;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteLinkedEntity {
  /** the iid */
  id: string;
  /** the entity id */
  entityId: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddAccordedRight {
  /** the did */
  id: string;
  /** the Accorded right to add */
  accordedRight?: AccordedRight;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteAccordedRight {
  /** the did */
  id: string;
  /** the service id */
  rightId: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddIidContext {
  /** the did */
  id: string;
  /** the context to add */
  context?: Context;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeactivateIID {
  /** the did */
  id: string;
  state: boolean;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgDeleteIidContext {
  /** the did */
  id: string;
  /** the context key */
  contextKey: string;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgUpdateIidMeta {
  /** the did */
  id: string;
  /** the context to add */
  meta?: IidMetadata;
  /** address of the account signing the message */
  signer: string;
}

export interface MsgAddLinkedResourceResponse {
}

export interface MsgDeleteLinkedResourceResponse {
}

export interface MsgAddLinkedEntityResponse {
}

export interface MsgDeleteLinkedEntityResponse {
}

export interface MsgAddAccordedRightResponse {
}

export interface MsgDeleteAccordedRightResponse {
}

export interface MsgAddIidContextResponse {
}

export interface MsgDeleteIidContextResponse {
}

export interface MsgUpdateIidMetaResponse {
}

export interface MsgDeactivateIIDResponse {
}

function createBaseVerification(): Verification {
  return { relationships: [], method: undefined, context: [] };
}

export const Verification = {
  encode(message: Verification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.relationships) {
      writer.uint32(10).string(v!);
    }
    if (message.method !== undefined) {
      VerificationMethod.encode(message.method, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.context) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Verification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.relationships.push(reader.string());
          break;
        case 2:
          message.method = VerificationMethod.decode(reader, reader.uint32());
          break;
        case 3:
          message.context.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Verification {
    return {
      relationships: Array.isArray(object?.relationships) ? object.relationships.map((e: any) => String(e)) : [],
      method: isSet(object.method) ? VerificationMethod.fromJSON(object.method) : undefined,
      context: Array.isArray(object?.context) ? object.context.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Verification): unknown {
    const obj: any = {};
    if (message.relationships) {
      obj.relationships = message.relationships.map((e) => e);
    } else {
      obj.relationships = [];
    }
    message.method !== undefined &&
      (obj.method = message.method ? VerificationMethod.toJSON(message.method) : undefined);
    if (message.context) {
      obj.context = message.context.map((e) => e);
    } else {
      obj.context = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Verification>, I>>(object: I): Verification {
    const message = createBaseVerification();
    message.relationships = object.relationships?.map((e) => e) || [];
    message.method = (object.method !== undefined && object.method !== null)
      ? VerificationMethod.fromPartial(object.method)
      : undefined;
    message.context = object.context?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgCreateIidDocument(): MsgCreateIidDocument {
  return {
    id: "",
    controllers: [],
    context: [],
    verifications: [],
    services: [],
    accordedRight: [],
    linkedResource: [],
    linkedEntity: [],
    signer: "",
  };
}

export const MsgCreateIidDocument = {
  encode(message: MsgCreateIidDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.controllers) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.context) {
      Context.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.verifications) {
      Verification.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.services) {
      Service.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.accordedRight) {
      AccordedRight.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.linkedResource) {
      LinkedResource.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.linkedEntity) {
      LinkedEntity.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(74).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateIidDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateIidDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.controllers.push(reader.string());
          break;
        case 3:
          message.context.push(Context.decode(reader, reader.uint32()));
          break;
        case 4:
          message.verifications.push(Verification.decode(reader, reader.uint32()));
          break;
        case 5:
          message.services.push(Service.decode(reader, reader.uint32()));
          break;
        case 6:
          message.accordedRight.push(AccordedRight.decode(reader, reader.uint32()));
          break;
        case 7:
          message.linkedResource.push(LinkedResource.decode(reader, reader.uint32()));
          break;
        case 8:
          message.linkedEntity.push(LinkedEntity.decode(reader, reader.uint32()));
          break;
        case 9:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateIidDocument {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      controllers: Array.isArray(object?.controllers) ? object.controllers.map((e: any) => String(e)) : [],
      context: Array.isArray(object?.context) ? object.context.map((e: any) => Context.fromJSON(e)) : [],
      verifications: Array.isArray(object?.verifications)
        ? object.verifications.map((e: any) => Verification.fromJSON(e))
        : [],
      services: Array.isArray(object?.services) ? object.services.map((e: any) => Service.fromJSON(e)) : [],
      accordedRight: Array.isArray(object?.accordedRight)
        ? object.accordedRight.map((e: any) => AccordedRight.fromJSON(e))
        : [],
      linkedResource: Array.isArray(object?.linkedResource)
        ? object.linkedResource.map((e: any) => LinkedResource.fromJSON(e))
        : [],
      linkedEntity: Array.isArray(object?.linkedEntity)
        ? object.linkedEntity.map((e: any) => LinkedEntity.fromJSON(e))
        : [],
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgCreateIidDocument): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.controllers) {
      obj.controllers = message.controllers.map((e) => e);
    } else {
      obj.controllers = [];
    }
    if (message.context) {
      obj.context = message.context.map((e) => e ? Context.toJSON(e) : undefined);
    } else {
      obj.context = [];
    }
    if (message.verifications) {
      obj.verifications = message.verifications.map((e) => e ? Verification.toJSON(e) : undefined);
    } else {
      obj.verifications = [];
    }
    if (message.services) {
      obj.services = message.services.map((e) => e ? Service.toJSON(e) : undefined);
    } else {
      obj.services = [];
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
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateIidDocument>, I>>(object: I): MsgCreateIidDocument {
    const message = createBaseMsgCreateIidDocument();
    message.id = object.id ?? "";
    message.controllers = object.controllers?.map((e) => e) || [];
    message.context = object.context?.map((e) => Context.fromPartial(e)) || [];
    message.verifications = object.verifications?.map((e) => Verification.fromPartial(e)) || [];
    message.services = object.services?.map((e) => Service.fromPartial(e)) || [];
    message.accordedRight = object.accordedRight?.map((e) => AccordedRight.fromPartial(e)) || [];
    message.linkedResource = object.linkedResource?.map((e) => LinkedResource.fromPartial(e)) || [];
    message.linkedEntity = object.linkedEntity?.map((e) => LinkedEntity.fromPartial(e)) || [];
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgCreateIidDocumentResponse(): MsgCreateIidDocumentResponse {
  return {};
}

export const MsgCreateIidDocumentResponse = {
  encode(_: MsgCreateIidDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateIidDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateIidDocumentResponse();
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

  fromJSON(_: any): MsgCreateIidDocumentResponse {
    return {};
  },

  toJSON(_: MsgCreateIidDocumentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateIidDocumentResponse>, I>>(_: I): MsgCreateIidDocumentResponse {
    const message = createBaseMsgCreateIidDocumentResponse();
    return message;
  },
};

function createBaseMsgUpdateIidDocument(): MsgUpdateIidDocument {
  return { doc: undefined, signer: "" };
}

export const MsgUpdateIidDocument = {
  encode(message: MsgUpdateIidDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.doc !== undefined) {
      IidDocument.encode(message.doc, writer.uint32(10).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIidDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIidDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.doc = IidDocument.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIidDocument {
    return {
      doc: isSet(object.doc) ? IidDocument.fromJSON(object.doc) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgUpdateIidDocument): unknown {
    const obj: any = {};
    message.doc !== undefined && (obj.doc = message.doc ? IidDocument.toJSON(message.doc) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIidDocument>, I>>(object: I): MsgUpdateIidDocument {
    const message = createBaseMsgUpdateIidDocument();
    message.doc = (object.doc !== undefined && object.doc !== null) ? IidDocument.fromPartial(object.doc) : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgUpdateIidDocumentResponse(): MsgUpdateIidDocumentResponse {
  return {};
}

export const MsgUpdateIidDocumentResponse = {
  encode(_: MsgUpdateIidDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIidDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIidDocumentResponse();
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

  fromJSON(_: any): MsgUpdateIidDocumentResponse {
    return {};
  },

  toJSON(_: MsgUpdateIidDocumentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIidDocumentResponse>, I>>(_: I): MsgUpdateIidDocumentResponse {
    const message = createBaseMsgUpdateIidDocumentResponse();
    return message;
  },
};

function createBaseMsgAddVerification(): MsgAddVerification {
  return { id: "", verification: undefined, signer: "" };
}

export const MsgAddVerification = {
  encode(message: MsgAddVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.verification !== undefined) {
      Verification.encode(message.verification, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddVerification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.verification = Verification.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddVerification {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      verification: isSet(object.verification) ? Verification.fromJSON(object.verification) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddVerification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.verification !== undefined &&
      (obj.verification = message.verification ? Verification.toJSON(message.verification) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddVerification>, I>>(object: I): MsgAddVerification {
    const message = createBaseMsgAddVerification();
    message.id = object.id ?? "";
    message.verification = (object.verification !== undefined && object.verification !== null)
      ? Verification.fromPartial(object.verification)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddVerificationResponse(): MsgAddVerificationResponse {
  return {};
}

export const MsgAddVerificationResponse = {
  encode(_: MsgAddVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddVerificationResponse();
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

  fromJSON(_: any): MsgAddVerificationResponse {
    return {};
  },

  toJSON(_: MsgAddVerificationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddVerificationResponse>, I>>(_: I): MsgAddVerificationResponse {
    const message = createBaseMsgAddVerificationResponse();
    return message;
  },
};

function createBaseMsgSetVerificationRelationships(): MsgSetVerificationRelationships {
  return { id: "", methodId: "", relationships: [], signer: "" };
}

export const MsgSetVerificationRelationships = {
  encode(message: MsgSetVerificationRelationships, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.methodId !== "") {
      writer.uint32(18).string(message.methodId);
    }
    for (const v of message.relationships) {
      writer.uint32(26).string(v!);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetVerificationRelationships {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetVerificationRelationships();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.methodId = reader.string();
          break;
        case 3:
          message.relationships.push(reader.string());
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetVerificationRelationships {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      methodId: isSet(object.methodId) ? String(object.methodId) : "",
      relationships: Array.isArray(object?.relationships) ? object.relationships.map((e: any) => String(e)) : [],
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgSetVerificationRelationships): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.methodId !== undefined && (obj.methodId = message.methodId);
    if (message.relationships) {
      obj.relationships = message.relationships.map((e) => e);
    } else {
      obj.relationships = [];
    }
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetVerificationRelationships>, I>>(
    object: I,
  ): MsgSetVerificationRelationships {
    const message = createBaseMsgSetVerificationRelationships();
    message.id = object.id ?? "";
    message.methodId = object.methodId ?? "";
    message.relationships = object.relationships?.map((e) => e) || [];
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgSetVerificationRelationshipsResponse(): MsgSetVerificationRelationshipsResponse {
  return {};
}

export const MsgSetVerificationRelationshipsResponse = {
  encode(_: MsgSetVerificationRelationshipsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetVerificationRelationshipsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetVerificationRelationshipsResponse();
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

  fromJSON(_: any): MsgSetVerificationRelationshipsResponse {
    return {};
  },

  toJSON(_: MsgSetVerificationRelationshipsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetVerificationRelationshipsResponse>, I>>(
    _: I,
  ): MsgSetVerificationRelationshipsResponse {
    const message = createBaseMsgSetVerificationRelationshipsResponse();
    return message;
  },
};

function createBaseMsgRevokeVerification(): MsgRevokeVerification {
  return { id: "", methodId: "", signer: "" };
}

export const MsgRevokeVerification = {
  encode(message: MsgRevokeVerification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.methodId !== "") {
      writer.uint32(18).string(message.methodId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeVerification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeVerification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.methodId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeVerification {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      methodId: isSet(object.methodId) ? String(object.methodId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRevokeVerification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.methodId !== undefined && (obj.methodId = message.methodId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeVerification>, I>>(object: I): MsgRevokeVerification {
    const message = createBaseMsgRevokeVerification();
    message.id = object.id ?? "";
    message.methodId = object.methodId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRevokeVerificationResponse(): MsgRevokeVerificationResponse {
  return {};
}

export const MsgRevokeVerificationResponse = {
  encode(_: MsgRevokeVerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeVerificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeVerificationResponse();
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

  fromJSON(_: any): MsgRevokeVerificationResponse {
    return {};
  },

  toJSON(_: MsgRevokeVerificationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeVerificationResponse>, I>>(_: I): MsgRevokeVerificationResponse {
    const message = createBaseMsgRevokeVerificationResponse();
    return message;
  },
};

function createBaseMsgAddService(): MsgAddService {
  return { id: "", serviceData: undefined, signer: "" };
}

export const MsgAddService = {
  encode(message: MsgAddService, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.serviceData !== undefined) {
      Service.encode(message.serviceData, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddService {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddService();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.serviceData = Service.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddService {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      serviceData: isSet(object.serviceData) ? Service.fromJSON(object.serviceData) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddService): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.serviceData !== undefined &&
      (obj.serviceData = message.serviceData ? Service.toJSON(message.serviceData) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddService>, I>>(object: I): MsgAddService {
    const message = createBaseMsgAddService();
    message.id = object.id ?? "";
    message.serviceData = (object.serviceData !== undefined && object.serviceData !== null)
      ? Service.fromPartial(object.serviceData)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddServiceResponse(): MsgAddServiceResponse {
  return {};
}

export const MsgAddServiceResponse = {
  encode(_: MsgAddServiceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddServiceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddServiceResponse();
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

  fromJSON(_: any): MsgAddServiceResponse {
    return {};
  },

  toJSON(_: MsgAddServiceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddServiceResponse>, I>>(_: I): MsgAddServiceResponse {
    const message = createBaseMsgAddServiceResponse();
    return message;
  },
};

function createBaseMsgDeleteService(): MsgDeleteService {
  return { id: "", serviceId: "", signer: "" };
}

export const MsgDeleteService = {
  encode(message: MsgDeleteService, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.serviceId !== "") {
      writer.uint32(18).string(message.serviceId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteService {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteService();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.serviceId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteService {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      serviceId: isSet(object.serviceId) ? String(object.serviceId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteService): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.serviceId !== undefined && (obj.serviceId = message.serviceId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteService>, I>>(object: I): MsgDeleteService {
    const message = createBaseMsgDeleteService();
    message.id = object.id ?? "";
    message.serviceId = object.serviceId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteServiceResponse(): MsgDeleteServiceResponse {
  return {};
}

export const MsgDeleteServiceResponse = {
  encode(_: MsgDeleteServiceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteServiceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteServiceResponse();
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

  fromJSON(_: any): MsgDeleteServiceResponse {
    return {};
  },

  toJSON(_: MsgDeleteServiceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteServiceResponse>, I>>(_: I): MsgDeleteServiceResponse {
    const message = createBaseMsgDeleteServiceResponse();
    return message;
  },
};

function createBaseMsgAddController(): MsgAddController {
  return { id: "", controllerDid: "", signer: "" };
}

export const MsgAddController = {
  encode(message: MsgAddController, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.controllerDid !== "") {
      writer.uint32(18).string(message.controllerDid);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddController {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddController();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.controllerDid = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddController {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      controllerDid: isSet(object.controllerDid) ? String(object.controllerDid) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddController): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.controllerDid !== undefined && (obj.controllerDid = message.controllerDid);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddController>, I>>(object: I): MsgAddController {
    const message = createBaseMsgAddController();
    message.id = object.id ?? "";
    message.controllerDid = object.controllerDid ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddControllerResponse(): MsgAddControllerResponse {
  return {};
}

export const MsgAddControllerResponse = {
  encode(_: MsgAddControllerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddControllerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddControllerResponse();
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

  fromJSON(_: any): MsgAddControllerResponse {
    return {};
  },

  toJSON(_: MsgAddControllerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddControllerResponse>, I>>(_: I): MsgAddControllerResponse {
    const message = createBaseMsgAddControllerResponse();
    return message;
  },
};

function createBaseMsgDeleteController(): MsgDeleteController {
  return { id: "", controllerDid: "", signer: "" };
}

export const MsgDeleteController = {
  encode(message: MsgDeleteController, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.controllerDid !== "") {
      writer.uint32(18).string(message.controllerDid);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteController {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteController();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.controllerDid = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteController {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      controllerDid: isSet(object.controllerDid) ? String(object.controllerDid) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteController): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.controllerDid !== undefined && (obj.controllerDid = message.controllerDid);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteController>, I>>(object: I): MsgDeleteController {
    const message = createBaseMsgDeleteController();
    message.id = object.id ?? "";
    message.controllerDid = object.controllerDid ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteControllerResponse(): MsgDeleteControllerResponse {
  return {};
}

export const MsgDeleteControllerResponse = {
  encode(_: MsgDeleteControllerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteControllerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteControllerResponse();
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

  fromJSON(_: any): MsgDeleteControllerResponse {
    return {};
  },

  toJSON(_: MsgDeleteControllerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteControllerResponse>, I>>(_: I): MsgDeleteControllerResponse {
    const message = createBaseMsgDeleteControllerResponse();
    return message;
  },
};

function createBaseMsgAddLinkedResource(): MsgAddLinkedResource {
  return { id: "", linkedResource: undefined, signer: "" };
}

export const MsgAddLinkedResource = {
  encode(message: MsgAddLinkedResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.linkedResource !== undefined) {
      LinkedResource.encode(message.linkedResource, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLinkedResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLinkedResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.linkedResource = LinkedResource.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddLinkedResource {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      linkedResource: isSet(object.linkedResource) ? LinkedResource.fromJSON(object.linkedResource) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddLinkedResource): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.linkedResource !== undefined &&
      (obj.linkedResource = message.linkedResource ? LinkedResource.toJSON(message.linkedResource) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddLinkedResource>, I>>(object: I): MsgAddLinkedResource {
    const message = createBaseMsgAddLinkedResource();
    message.id = object.id ?? "";
    message.linkedResource = (object.linkedResource !== undefined && object.linkedResource !== null)
      ? LinkedResource.fromPartial(object.linkedResource)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteLinkedResource(): MsgDeleteLinkedResource {
  return { id: "", resourceId: "", signer: "" };
}

export const MsgDeleteLinkedResource = {
  encode(message: MsgDeleteLinkedResource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.resourceId !== "") {
      writer.uint32(18).string(message.resourceId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteLinkedResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteLinkedResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.resourceId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteLinkedResource {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resourceId: isSet(object.resourceId) ? String(object.resourceId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteLinkedResource): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resourceId !== undefined && (obj.resourceId = message.resourceId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteLinkedResource>, I>>(object: I): MsgDeleteLinkedResource {
    const message = createBaseMsgDeleteLinkedResource();
    message.id = object.id ?? "";
    message.resourceId = object.resourceId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddLinkedEntity(): MsgAddLinkedEntity {
  return { id: "", linkedEntity: undefined, signer: "" };
}

export const MsgAddLinkedEntity = {
  encode(message: MsgAddLinkedEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.linkedEntity !== undefined) {
      LinkedEntity.encode(message.linkedEntity, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLinkedEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLinkedEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.linkedEntity = LinkedEntity.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddLinkedEntity {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      linkedEntity: isSet(object.linkedEntity) ? LinkedEntity.fromJSON(object.linkedEntity) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddLinkedEntity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.linkedEntity !== undefined &&
      (obj.linkedEntity = message.linkedEntity ? LinkedEntity.toJSON(message.linkedEntity) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddLinkedEntity>, I>>(object: I): MsgAddLinkedEntity {
    const message = createBaseMsgAddLinkedEntity();
    message.id = object.id ?? "";
    message.linkedEntity = (object.linkedEntity !== undefined && object.linkedEntity !== null)
      ? LinkedEntity.fromPartial(object.linkedEntity)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteLinkedEntity(): MsgDeleteLinkedEntity {
  return { id: "", entityId: "", signer: "" };
}

export const MsgDeleteLinkedEntity = {
  encode(message: MsgDeleteLinkedEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.entityId !== "") {
      writer.uint32(18).string(message.entityId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteLinkedEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteLinkedEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.entityId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteLinkedEntity {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      entityId: isSet(object.entityId) ? String(object.entityId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteLinkedEntity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.entityId !== undefined && (obj.entityId = message.entityId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteLinkedEntity>, I>>(object: I): MsgDeleteLinkedEntity {
    const message = createBaseMsgDeleteLinkedEntity();
    message.id = object.id ?? "";
    message.entityId = object.entityId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddAccordedRight(): MsgAddAccordedRight {
  return { id: "", accordedRight: undefined, signer: "" };
}

export const MsgAddAccordedRight = {
  encode(message: MsgAddAccordedRight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.accordedRight !== undefined) {
      AccordedRight.encode(message.accordedRight, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAccordedRight {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAccordedRight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.accordedRight = AccordedRight.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddAccordedRight {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      accordedRight: isSet(object.accordedRight) ? AccordedRight.fromJSON(object.accordedRight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddAccordedRight): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.accordedRight !== undefined &&
      (obj.accordedRight = message.accordedRight ? AccordedRight.toJSON(message.accordedRight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddAccordedRight>, I>>(object: I): MsgAddAccordedRight {
    const message = createBaseMsgAddAccordedRight();
    message.id = object.id ?? "";
    message.accordedRight = (object.accordedRight !== undefined && object.accordedRight !== null)
      ? AccordedRight.fromPartial(object.accordedRight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteAccordedRight(): MsgDeleteAccordedRight {
  return { id: "", rightId: "", signer: "" };
}

export const MsgDeleteAccordedRight = {
  encode(message: MsgDeleteAccordedRight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.rightId !== "") {
      writer.uint32(18).string(message.rightId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteAccordedRight {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteAccordedRight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.rightId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteAccordedRight {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      rightId: isSet(object.rightId) ? String(object.rightId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteAccordedRight): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.rightId !== undefined && (obj.rightId = message.rightId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteAccordedRight>, I>>(object: I): MsgDeleteAccordedRight {
    const message = createBaseMsgDeleteAccordedRight();
    message.id = object.id ?? "";
    message.rightId = object.rightId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddIidContext(): MsgAddIidContext {
  return { id: "", context: undefined, signer: "" };
}

export const MsgAddIidContext = {
  encode(message: MsgAddIidContext, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIidContext {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIidContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.context = Context.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddIidContext {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      context: isSet(object.context) ? Context.fromJSON(object.context) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAddIidContext): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.context !== undefined && (obj.context = message.context ? Context.toJSON(message.context) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIidContext>, I>>(object: I): MsgAddIidContext {
    const message = createBaseMsgAddIidContext();
    message.id = object.id ?? "";
    message.context = (object.context !== undefined && object.context !== null)
      ? Context.fromPartial(object.context)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeactivateIID(): MsgDeactivateIID {
  return { id: "", state: false, signer: "" };
}

export const MsgDeactivateIID = {
  encode(message: MsgDeactivateIID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.state === true) {
      writer.uint32(16).bool(message.state);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateIID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateIID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.state = reader.bool();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateIID {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      state: isSet(object.state) ? Boolean(object.state) : false,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeactivateIID): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = message.state);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeactivateIID>, I>>(object: I): MsgDeactivateIID {
    const message = createBaseMsgDeactivateIID();
    message.id = object.id ?? "";
    message.state = object.state ?? false;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgDeleteIidContext(): MsgDeleteIidContext {
  return { id: "", contextKey: "", signer: "" };
}

export const MsgDeleteIidContext = {
  encode(message: MsgDeleteIidContext, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.contextKey !== "") {
      writer.uint32(18).string(message.contextKey);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteIidContext {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteIidContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.contextKey = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteIidContext {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      contextKey: isSet(object.contextKey) ? String(object.contextKey) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgDeleteIidContext): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.contextKey !== undefined && (obj.contextKey = message.contextKey);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteIidContext>, I>>(object: I): MsgDeleteIidContext {
    const message = createBaseMsgDeleteIidContext();
    message.id = object.id ?? "";
    message.contextKey = object.contextKey ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgUpdateIidMeta(): MsgUpdateIidMeta {
  return { id: "", meta: undefined, signer: "" };
}

export const MsgUpdateIidMeta = {
  encode(message: MsgUpdateIidMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.meta !== undefined) {
      IidMetadata.encode(message.meta, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIidMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIidMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.meta = IidMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIidMeta {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      meta: isSet(object.meta) ? IidMetadata.fromJSON(object.meta) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgUpdateIidMeta): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.meta !== undefined && (obj.meta = message.meta ? IidMetadata.toJSON(message.meta) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIidMeta>, I>>(object: I): MsgUpdateIidMeta {
    const message = createBaseMsgUpdateIidMeta();
    message.id = object.id ?? "";
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? IidMetadata.fromPartial(object.meta)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAddLinkedResourceResponse(): MsgAddLinkedResourceResponse {
  return {};
}

export const MsgAddLinkedResourceResponse = {
  encode(_: MsgAddLinkedResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLinkedResourceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLinkedResourceResponse();
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

  fromJSON(_: any): MsgAddLinkedResourceResponse {
    return {};
  },

  toJSON(_: MsgAddLinkedResourceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddLinkedResourceResponse>, I>>(_: I): MsgAddLinkedResourceResponse {
    const message = createBaseMsgAddLinkedResourceResponse();
    return message;
  },
};

function createBaseMsgDeleteLinkedResourceResponse(): MsgDeleteLinkedResourceResponse {
  return {};
}

export const MsgDeleteLinkedResourceResponse = {
  encode(_: MsgDeleteLinkedResourceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteLinkedResourceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteLinkedResourceResponse();
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

  fromJSON(_: any): MsgDeleteLinkedResourceResponse {
    return {};
  },

  toJSON(_: MsgDeleteLinkedResourceResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteLinkedResourceResponse>, I>>(_: I): MsgDeleteLinkedResourceResponse {
    const message = createBaseMsgDeleteLinkedResourceResponse();
    return message;
  },
};

function createBaseMsgAddLinkedEntityResponse(): MsgAddLinkedEntityResponse {
  return {};
}

export const MsgAddLinkedEntityResponse = {
  encode(_: MsgAddLinkedEntityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddLinkedEntityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLinkedEntityResponse();
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

  fromJSON(_: any): MsgAddLinkedEntityResponse {
    return {};
  },

  toJSON(_: MsgAddLinkedEntityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddLinkedEntityResponse>, I>>(_: I): MsgAddLinkedEntityResponse {
    const message = createBaseMsgAddLinkedEntityResponse();
    return message;
  },
};

function createBaseMsgDeleteLinkedEntityResponse(): MsgDeleteLinkedEntityResponse {
  return {};
}

export const MsgDeleteLinkedEntityResponse = {
  encode(_: MsgDeleteLinkedEntityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteLinkedEntityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteLinkedEntityResponse();
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

  fromJSON(_: any): MsgDeleteLinkedEntityResponse {
    return {};
  },

  toJSON(_: MsgDeleteLinkedEntityResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteLinkedEntityResponse>, I>>(_: I): MsgDeleteLinkedEntityResponse {
    const message = createBaseMsgDeleteLinkedEntityResponse();
    return message;
  },
};

function createBaseMsgAddAccordedRightResponse(): MsgAddAccordedRightResponse {
  return {};
}

export const MsgAddAccordedRightResponse = {
  encode(_: MsgAddAccordedRightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddAccordedRightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAccordedRightResponse();
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

  fromJSON(_: any): MsgAddAccordedRightResponse {
    return {};
  },

  toJSON(_: MsgAddAccordedRightResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddAccordedRightResponse>, I>>(_: I): MsgAddAccordedRightResponse {
    const message = createBaseMsgAddAccordedRightResponse();
    return message;
  },
};

function createBaseMsgDeleteAccordedRightResponse(): MsgDeleteAccordedRightResponse {
  return {};
}

export const MsgDeleteAccordedRightResponse = {
  encode(_: MsgDeleteAccordedRightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteAccordedRightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteAccordedRightResponse();
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

  fromJSON(_: any): MsgDeleteAccordedRightResponse {
    return {};
  },

  toJSON(_: MsgDeleteAccordedRightResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteAccordedRightResponse>, I>>(_: I): MsgDeleteAccordedRightResponse {
    const message = createBaseMsgDeleteAccordedRightResponse();
    return message;
  },
};

function createBaseMsgAddIidContextResponse(): MsgAddIidContextResponse {
  return {};
}

export const MsgAddIidContextResponse = {
  encode(_: MsgAddIidContextResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddIidContextResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddIidContextResponse();
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

  fromJSON(_: any): MsgAddIidContextResponse {
    return {};
  },

  toJSON(_: MsgAddIidContextResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddIidContextResponse>, I>>(_: I): MsgAddIidContextResponse {
    const message = createBaseMsgAddIidContextResponse();
    return message;
  },
};

function createBaseMsgDeleteIidContextResponse(): MsgDeleteIidContextResponse {
  return {};
}

export const MsgDeleteIidContextResponse = {
  encode(_: MsgDeleteIidContextResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteIidContextResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteIidContextResponse();
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

  fromJSON(_: any): MsgDeleteIidContextResponse {
    return {};
  },

  toJSON(_: MsgDeleteIidContextResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteIidContextResponse>, I>>(_: I): MsgDeleteIidContextResponse {
    const message = createBaseMsgDeleteIidContextResponse();
    return message;
  },
};

function createBaseMsgUpdateIidMetaResponse(): MsgUpdateIidMetaResponse {
  return {};
}

export const MsgUpdateIidMetaResponse = {
  encode(_: MsgUpdateIidMetaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIidMetaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIidMetaResponse();
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

  fromJSON(_: any): MsgUpdateIidMetaResponse {
    return {};
  },

  toJSON(_: MsgUpdateIidMetaResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateIidMetaResponse>, I>>(_: I): MsgUpdateIidMetaResponse {
    const message = createBaseMsgUpdateIidMetaResponse();
    return message;
  },
};

function createBaseMsgDeactivateIIDResponse(): MsgDeactivateIIDResponse {
  return {};
}

export const MsgDeactivateIIDResponse = {
  encode(_: MsgDeactivateIIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateIIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateIIDResponse();
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

  fromJSON(_: any): MsgDeactivateIIDResponse {
    return {};
  },

  toJSON(_: MsgDeactivateIIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeactivateIIDResponse>, I>>(_: I): MsgDeactivateIIDResponse {
    const message = createBaseMsgDeactivateIIDResponse();
    return message;
  },
};

/** Msg defines the identity Msg service. */
export interface Msg {
  /** CreateDidDocument defines a method for creating a new identity. */
  CreateIidDocument(request: MsgCreateIidDocument): Promise<MsgCreateIidDocumentResponse>;
  /** UpdateDidDocument defines a method for updating an identity. */
  UpdateIidDocument(request: MsgUpdateIidDocument): Promise<MsgUpdateIidDocumentResponse>;
  /** AddVerificationMethod adds a new verification method */
  AddVerification(request: MsgAddVerification): Promise<MsgAddVerificationResponse>;
  /** RevokeVerification remove the verification method and all associated verification Relations */
  RevokeVerification(request: MsgRevokeVerification): Promise<MsgRevokeVerificationResponse>;
  /** SetVerificationRelationships overwrite current verification relationships */
  SetVerificationRelationships(
    request: MsgSetVerificationRelationships,
  ): Promise<MsgSetVerificationRelationshipsResponse>;
  /** AddService add a new service */
  AddService(request: MsgAddService): Promise<MsgAddServiceResponse>;
  /** DeleteService delete an existing service */
  DeleteService(request: MsgDeleteService): Promise<MsgDeleteServiceResponse>;
  /** AddService add a new service */
  AddController(request: MsgAddController): Promise<MsgAddControllerResponse>;
  /** DeleteService delete an existing service */
  DeleteController(request: MsgDeleteController): Promise<MsgDeleteControllerResponse>;
  /** Add / Delete Linked Resource */
  AddLinkedResource(request: MsgAddLinkedResource): Promise<MsgAddLinkedResourceResponse>;
  DeleteLinkedResource(request: MsgDeleteLinkedResource): Promise<MsgDeleteLinkedResourceResponse>;
  /** Add / Delete Linked Entity */
  AddLinkedEntity(request: MsgAddLinkedEntity): Promise<MsgAddLinkedEntityResponse>;
  DeleteLinkedEntity(request: MsgDeleteLinkedEntity): Promise<MsgDeleteLinkedEntityResponse>;
  /** Add / Delete Accorded Right */
  AddAccordedRight(request: MsgAddAccordedRight): Promise<MsgAddAccordedRightResponse>;
  DeleteAccordedRight(request: MsgDeleteAccordedRight): Promise<MsgDeleteAccordedRightResponse>;
  /** Add / Delete Context */
  AddIidContext(request: MsgAddIidContext): Promise<MsgAddIidContextResponse>;
  DeactivateIID(request: MsgDeactivateIID): Promise<MsgDeactivateIIDResponse>;
  DeleteIidContext(request: MsgDeleteIidContext): Promise<MsgDeleteIidContextResponse>;
  /** Update META */
  UpdateMetaData(request: MsgUpdateIidMeta): Promise<MsgUpdateIidMetaResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "iid.Msg";
    this.rpc = rpc;
    this.CreateIidDocument = this.CreateIidDocument.bind(this);
    this.UpdateIidDocument = this.UpdateIidDocument.bind(this);
    this.AddVerification = this.AddVerification.bind(this);
    this.RevokeVerification = this.RevokeVerification.bind(this);
    this.SetVerificationRelationships = this.SetVerificationRelationships.bind(this);
    this.AddService = this.AddService.bind(this);
    this.DeleteService = this.DeleteService.bind(this);
    this.AddController = this.AddController.bind(this);
    this.DeleteController = this.DeleteController.bind(this);
    this.AddLinkedResource = this.AddLinkedResource.bind(this);
    this.DeleteLinkedResource = this.DeleteLinkedResource.bind(this);
    this.AddLinkedEntity = this.AddLinkedEntity.bind(this);
    this.DeleteLinkedEntity = this.DeleteLinkedEntity.bind(this);
    this.AddAccordedRight = this.AddAccordedRight.bind(this);
    this.DeleteAccordedRight = this.DeleteAccordedRight.bind(this);
    this.AddIidContext = this.AddIidContext.bind(this);
    this.DeactivateIID = this.DeactivateIID.bind(this);
    this.DeleteIidContext = this.DeleteIidContext.bind(this);
    this.UpdateMetaData = this.UpdateMetaData.bind(this);
  }
  CreateIidDocument(request: MsgCreateIidDocument): Promise<MsgCreateIidDocumentResponse> {
    const data = MsgCreateIidDocument.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateIidDocument", data);
    return promise.then((data) => MsgCreateIidDocumentResponse.decode(new _m0.Reader(data)));
  }

  UpdateIidDocument(request: MsgUpdateIidDocument): Promise<MsgUpdateIidDocumentResponse> {
    const data = MsgUpdateIidDocument.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateIidDocument", data);
    return promise.then((data) => MsgUpdateIidDocumentResponse.decode(new _m0.Reader(data)));
  }

  AddVerification(request: MsgAddVerification): Promise<MsgAddVerificationResponse> {
    const data = MsgAddVerification.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddVerification", data);
    return promise.then((data) => MsgAddVerificationResponse.decode(new _m0.Reader(data)));
  }

  RevokeVerification(request: MsgRevokeVerification): Promise<MsgRevokeVerificationResponse> {
    const data = MsgRevokeVerification.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeVerification", data);
    return promise.then((data) => MsgRevokeVerificationResponse.decode(new _m0.Reader(data)));
  }

  SetVerificationRelationships(
    request: MsgSetVerificationRelationships,
  ): Promise<MsgSetVerificationRelationshipsResponse> {
    const data = MsgSetVerificationRelationships.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetVerificationRelationships", data);
    return promise.then((data) => MsgSetVerificationRelationshipsResponse.decode(new _m0.Reader(data)));
  }

  AddService(request: MsgAddService): Promise<MsgAddServiceResponse> {
    const data = MsgAddService.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddService", data);
    return promise.then((data) => MsgAddServiceResponse.decode(new _m0.Reader(data)));
  }

  DeleteService(request: MsgDeleteService): Promise<MsgDeleteServiceResponse> {
    const data = MsgDeleteService.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteService", data);
    return promise.then((data) => MsgDeleteServiceResponse.decode(new _m0.Reader(data)));
  }

  AddController(request: MsgAddController): Promise<MsgAddControllerResponse> {
    const data = MsgAddController.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddController", data);
    return promise.then((data) => MsgAddControllerResponse.decode(new _m0.Reader(data)));
  }

  DeleteController(request: MsgDeleteController): Promise<MsgDeleteControllerResponse> {
    const data = MsgDeleteController.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteController", data);
    return promise.then((data) => MsgDeleteControllerResponse.decode(new _m0.Reader(data)));
  }

  AddLinkedResource(request: MsgAddLinkedResource): Promise<MsgAddLinkedResourceResponse> {
    const data = MsgAddLinkedResource.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddLinkedResource", data);
    return promise.then((data) => MsgAddLinkedResourceResponse.decode(new _m0.Reader(data)));
  }

  DeleteLinkedResource(request: MsgDeleteLinkedResource): Promise<MsgDeleteLinkedResourceResponse> {
    const data = MsgDeleteLinkedResource.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteLinkedResource", data);
    return promise.then((data) => MsgDeleteLinkedResourceResponse.decode(new _m0.Reader(data)));
  }

  AddLinkedEntity(request: MsgAddLinkedEntity): Promise<MsgAddLinkedEntityResponse> {
    const data = MsgAddLinkedEntity.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddLinkedEntity", data);
    return promise.then((data) => MsgAddLinkedEntityResponse.decode(new _m0.Reader(data)));
  }

  DeleteLinkedEntity(request: MsgDeleteLinkedEntity): Promise<MsgDeleteLinkedEntityResponse> {
    const data = MsgDeleteLinkedEntity.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteLinkedEntity", data);
    return promise.then((data) => MsgDeleteLinkedEntityResponse.decode(new _m0.Reader(data)));
  }

  AddAccordedRight(request: MsgAddAccordedRight): Promise<MsgAddAccordedRightResponse> {
    const data = MsgAddAccordedRight.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddAccordedRight", data);
    return promise.then((data) => MsgAddAccordedRightResponse.decode(new _m0.Reader(data)));
  }

  DeleteAccordedRight(request: MsgDeleteAccordedRight): Promise<MsgDeleteAccordedRightResponse> {
    const data = MsgDeleteAccordedRight.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteAccordedRight", data);
    return promise.then((data) => MsgDeleteAccordedRightResponse.decode(new _m0.Reader(data)));
  }

  AddIidContext(request: MsgAddIidContext): Promise<MsgAddIidContextResponse> {
    const data = MsgAddIidContext.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddIidContext", data);
    return promise.then((data) => MsgAddIidContextResponse.decode(new _m0.Reader(data)));
  }

  DeactivateIID(request: MsgDeactivateIID): Promise<MsgDeactivateIIDResponse> {
    const data = MsgDeactivateIID.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeactivateIID", data);
    return promise.then((data) => MsgDeactivateIIDResponse.decode(new _m0.Reader(data)));
  }

  DeleteIidContext(request: MsgDeleteIidContext): Promise<MsgDeleteIidContextResponse> {
    const data = MsgDeleteIidContext.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteIidContext", data);
    return promise.then((data) => MsgDeleteIidContextResponse.decode(new _m0.Reader(data)));
  }

  UpdateMetaData(request: MsgUpdateIidMeta): Promise<MsgUpdateIidMetaResponse> {
    const data = MsgUpdateIidMeta.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateMetaData", data);
    return promise.then((data) => MsgUpdateIidMetaResponse.decode(new _m0.Reader(data)));
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
