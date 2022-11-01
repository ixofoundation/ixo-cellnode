/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  CreateAgentDoc,
  CreateClaimDoc,
  CreateEvaluationDoc,
  UpdateAgentDoc,
  UpdateProjectStatusDoc,
  WithdrawFundsDoc,
} from "./project";

export const protobufPackage = "project";

/** MsgCreateProject defines a message for creating a project. */
export interface MsgCreateProject {
  txHash: string;
  senderDid: string;
  projectDid: string;
  pubKey: string;
  data: Uint8Array;
  projectAddress: string;
}

/** MsgCreateProjectResponse defines the Msg/CreateProject response type. */
export interface MsgCreateProjectResponse {
}

/** MsgUpdateProjectStatus defines a message for updating a project's current status. */
export interface MsgUpdateProjectStatus {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data?: UpdateProjectStatusDoc;
  projectAddress: string;
}

/** MsgUpdateProjectStatusResponse defines the Msg/UpdateProjectStatus response type. */
export interface MsgUpdateProjectStatusResponse {
}

/** MsgCreateAgent defines a message for creating an agent on a project. */
export interface MsgCreateAgent {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data?: CreateAgentDoc;
  projectAddress: string;
}

/** MsgCreateAgentResponse defines the Msg/CreateAgent response type. */
export interface MsgCreateAgentResponse {
}

/** MsgUpdateAgent defines a message for updating an agent on a project. */
export interface MsgUpdateAgent {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data?: UpdateAgentDoc;
  projectAddress: string;
}

/** MsgUpdateAgentResponse defines the Msg/UpdateAgent response type. */
export interface MsgUpdateAgentResponse {
}

/** MsgCreateClaim defines a message for creating a claim on a project. */
export interface MsgCreateClaim {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data?: CreateClaimDoc;
  projectAddress: string;
}

/** MsgCreateClaimResponse defines the Msg/CreateClaim response type. */
export interface MsgCreateClaimResponse {
}

/** MsgCreateEvaluation defines a message for creating an evaluation for a specific claim on a project. */
export interface MsgCreateEvaluation {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data?: CreateEvaluationDoc;
  projectAddress: string;
}

/** MsgCreateEvaluationResponse defines the Msg/CreateEvaluation response type. */
export interface MsgCreateEvaluationResponse {
}

/** MsgWithdrawFunds defines a message for project agents to withdraw their funds from a project. */
export interface MsgWithdrawFunds {
  senderDid: string;
  data?: WithdrawFundsDoc;
  senderAddress: string;
}

/** MsgWithdrawFundsResponse defines the Msg/WithdrawFunds response type. */
export interface MsgWithdrawFundsResponse {
}

/** MsgUpdateProjectDoc defines a message for updating a project's data. */
export interface MsgUpdateProjectDoc {
  txHash: string;
  senderDid: string;
  projectDid: string;
  data: Uint8Array;
  projectAddress: string;
}

/** MsgUpdateProjectDocResponse defines the Msg/UpdateProjectDoc response type. */
export interface MsgUpdateProjectDocResponse {
}

function createBaseMsgCreateProject(): MsgCreateProject {
  return { txHash: "", senderDid: "", projectDid: "", pubKey: "", data: new Uint8Array(), projectAddress: "" };
}

export const MsgCreateProject = {
  encode(message: MsgCreateProject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.pubKey !== "") {
      writer.uint32(34).string(message.pubKey);
    }
    if (message.data.length !== 0) {
      writer.uint32(42).bytes(message.data);
    }
    if (message.projectAddress !== "") {
      writer.uint32(50).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateProject {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateProject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.pubKey = reader.string();
          break;
        case 5:
          message.data = reader.bytes();
          break;
        case 6:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateProject {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgCreateProject): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateProject>, I>>(object: I): MsgCreateProject {
    const message = createBaseMsgCreateProject();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.pubKey = object.pubKey ?? "";
    message.data = object.data ?? new Uint8Array();
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateProjectResponse(): MsgCreateProjectResponse {
  return {};
}

export const MsgCreateProjectResponse = {
  encode(_: MsgCreateProjectResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateProjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateProjectResponse();
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

  fromJSON(_: any): MsgCreateProjectResponse {
    return {};
  },

  toJSON(_: MsgCreateProjectResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateProjectResponse>, I>>(_: I): MsgCreateProjectResponse {
    const message = createBaseMsgCreateProjectResponse();
    return message;
  },
};

function createBaseMsgUpdateProjectStatus(): MsgUpdateProjectStatus {
  return { txHash: "", senderDid: "", projectDid: "", data: undefined, projectAddress: "" };
}

export const MsgUpdateProjectStatus = {
  encode(message: MsgUpdateProjectStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data !== undefined) {
      UpdateProjectStatusDoc.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProjectStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProjectStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = UpdateProjectStatusDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateProjectStatus {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? UpdateProjectStatusDoc.fromJSON(object.data) : undefined,
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgUpdateProjectStatus): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined && (obj.data = message.data ? UpdateProjectStatusDoc.toJSON(message.data) : undefined);
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateProjectStatus>, I>>(object: I): MsgUpdateProjectStatus {
    const message = createBaseMsgUpdateProjectStatus();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? UpdateProjectStatusDoc.fromPartial(object.data)
      : undefined;
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateProjectStatusResponse(): MsgUpdateProjectStatusResponse {
  return {};
}

export const MsgUpdateProjectStatusResponse = {
  encode(_: MsgUpdateProjectStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProjectStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProjectStatusResponse();
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

  fromJSON(_: any): MsgUpdateProjectStatusResponse {
    return {};
  },

  toJSON(_: MsgUpdateProjectStatusResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateProjectStatusResponse>, I>>(_: I): MsgUpdateProjectStatusResponse {
    const message = createBaseMsgUpdateProjectStatusResponse();
    return message;
  },
};

function createBaseMsgCreateAgent(): MsgCreateAgent {
  return { txHash: "", senderDid: "", projectDid: "", data: undefined, projectAddress: "" };
}

export const MsgCreateAgent = {
  encode(message: MsgCreateAgent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data !== undefined) {
      CreateAgentDoc.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAgent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = CreateAgentDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateAgent {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? CreateAgentDoc.fromJSON(object.data) : undefined,
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgCreateAgent): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined && (obj.data = message.data ? CreateAgentDoc.toJSON(message.data) : undefined);
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAgent>, I>>(object: I): MsgCreateAgent {
    const message = createBaseMsgCreateAgent();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? CreateAgentDoc.fromPartial(object.data)
      : undefined;
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateAgentResponse(): MsgCreateAgentResponse {
  return {};
}

export const MsgCreateAgentResponse = {
  encode(_: MsgCreateAgentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAgentResponse();
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

  fromJSON(_: any): MsgCreateAgentResponse {
    return {};
  },

  toJSON(_: MsgCreateAgentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateAgentResponse>, I>>(_: I): MsgCreateAgentResponse {
    const message = createBaseMsgCreateAgentResponse();
    return message;
  },
};

function createBaseMsgUpdateAgent(): MsgUpdateAgent {
  return { txHash: "", senderDid: "", projectDid: "", data: undefined, projectAddress: "" };
}

export const MsgUpdateAgent = {
  encode(message: MsgUpdateAgent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data !== undefined) {
      UpdateAgentDoc.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAgent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAgent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = UpdateAgentDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateAgent {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? UpdateAgentDoc.fromJSON(object.data) : undefined,
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgUpdateAgent): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined && (obj.data = message.data ? UpdateAgentDoc.toJSON(message.data) : undefined);
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAgent>, I>>(object: I): MsgUpdateAgent {
    const message = createBaseMsgUpdateAgent();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? UpdateAgentDoc.fromPartial(object.data)
      : undefined;
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateAgentResponse(): MsgUpdateAgentResponse {
  return {};
}

export const MsgUpdateAgentResponse = {
  encode(_: MsgUpdateAgentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAgentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAgentResponse();
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

  fromJSON(_: any): MsgUpdateAgentResponse {
    return {};
  },

  toJSON(_: MsgUpdateAgentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAgentResponse>, I>>(_: I): MsgUpdateAgentResponse {
    const message = createBaseMsgUpdateAgentResponse();
    return message;
  },
};

function createBaseMsgCreateClaim(): MsgCreateClaim {
  return { txHash: "", senderDid: "", projectDid: "", data: undefined, projectAddress: "" };
}

export const MsgCreateClaim = {
  encode(message: MsgCreateClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data !== undefined) {
      CreateClaimDoc.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = CreateClaimDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateClaim {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? CreateClaimDoc.fromJSON(object.data) : undefined,
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgCreateClaim): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined && (obj.data = message.data ? CreateClaimDoc.toJSON(message.data) : undefined);
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateClaim>, I>>(object: I): MsgCreateClaim {
    const message = createBaseMsgCreateClaim();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? CreateClaimDoc.fromPartial(object.data)
      : undefined;
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateClaimResponse(): MsgCreateClaimResponse {
  return {};
}

export const MsgCreateClaimResponse = {
  encode(_: MsgCreateClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClaimResponse();
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

  fromJSON(_: any): MsgCreateClaimResponse {
    return {};
  },

  toJSON(_: MsgCreateClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateClaimResponse>, I>>(_: I): MsgCreateClaimResponse {
    const message = createBaseMsgCreateClaimResponse();
    return message;
  },
};

function createBaseMsgCreateEvaluation(): MsgCreateEvaluation {
  return { txHash: "", senderDid: "", projectDid: "", data: undefined, projectAddress: "" };
}

export const MsgCreateEvaluation = {
  encode(message: MsgCreateEvaluation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data !== undefined) {
      CreateEvaluationDoc.encode(message.data, writer.uint32(34).fork()).ldelim();
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateEvaluation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateEvaluation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = CreateEvaluationDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateEvaluation {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? CreateEvaluationDoc.fromJSON(object.data) : undefined,
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgCreateEvaluation): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined && (obj.data = message.data ? CreateEvaluationDoc.toJSON(message.data) : undefined);
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateEvaluation>, I>>(object: I): MsgCreateEvaluation {
    const message = createBaseMsgCreateEvaluation();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? CreateEvaluationDoc.fromPartial(object.data)
      : undefined;
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateEvaluationResponse(): MsgCreateEvaluationResponse {
  return {};
}

export const MsgCreateEvaluationResponse = {
  encode(_: MsgCreateEvaluationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateEvaluationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateEvaluationResponse();
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

  fromJSON(_: any): MsgCreateEvaluationResponse {
    return {};
  },

  toJSON(_: MsgCreateEvaluationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateEvaluationResponse>, I>>(_: I): MsgCreateEvaluationResponse {
    const message = createBaseMsgCreateEvaluationResponse();
    return message;
  },
};

function createBaseMsgWithdrawFunds(): MsgWithdrawFunds {
  return { senderDid: "", data: undefined, senderAddress: "" };
}

export const MsgWithdrawFunds = {
  encode(message: MsgWithdrawFunds, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.senderDid !== "") {
      writer.uint32(10).string(message.senderDid);
    }
    if (message.data !== undefined) {
      WithdrawFundsDoc.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.senderAddress !== "") {
      writer.uint32(42).string(message.senderAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawFunds {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawFunds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.senderDid = reader.string();
          break;
        case 2:
          message.data = WithdrawFundsDoc.decode(reader, reader.uint32());
          break;
        case 5:
          message.senderAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawFunds {
    return {
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      data: isSet(object.data) ? WithdrawFundsDoc.fromJSON(object.data) : undefined,
      senderAddress: isSet(object.senderAddress) ? String(object.senderAddress) : "",
    };
  },

  toJSON(message: MsgWithdrawFunds): unknown {
    const obj: any = {};
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.data !== undefined && (obj.data = message.data ? WithdrawFundsDoc.toJSON(message.data) : undefined);
    message.senderAddress !== undefined && (obj.senderAddress = message.senderAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawFunds>, I>>(object: I): MsgWithdrawFunds {
    const message = createBaseMsgWithdrawFunds();
    message.senderDid = object.senderDid ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? WithdrawFundsDoc.fromPartial(object.data)
      : undefined;
    message.senderAddress = object.senderAddress ?? "";
    return message;
  },
};

function createBaseMsgWithdrawFundsResponse(): MsgWithdrawFundsResponse {
  return {};
}

export const MsgWithdrawFundsResponse = {
  encode(_: MsgWithdrawFundsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawFundsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawFundsResponse();
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

  fromJSON(_: any): MsgWithdrawFundsResponse {
    return {};
  },

  toJSON(_: MsgWithdrawFundsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawFundsResponse>, I>>(_: I): MsgWithdrawFundsResponse {
    const message = createBaseMsgWithdrawFundsResponse();
    return message;
  },
};

function createBaseMsgUpdateProjectDoc(): MsgUpdateProjectDoc {
  return { txHash: "", senderDid: "", projectDid: "", data: new Uint8Array(), projectAddress: "" };
}

export const MsgUpdateProjectDoc = {
  encode(message: MsgUpdateProjectDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.senderDid !== "") {
      writer.uint32(18).string(message.senderDid);
    }
    if (message.projectDid !== "") {
      writer.uint32(26).string(message.projectDid);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.projectAddress !== "") {
      writer.uint32(42).string(message.projectAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProjectDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProjectDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.senderDid = reader.string();
          break;
        case 3:
          message.projectDid = reader.string();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.projectAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateProjectDoc {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      projectAddress: isSet(object.projectAddress) ? String(object.projectAddress) : "",
    };
  },

  toJSON(message: MsgUpdateProjectDoc): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.projectAddress !== undefined && (obj.projectAddress = message.projectAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateProjectDoc>, I>>(object: I): MsgUpdateProjectDoc {
    const message = createBaseMsgUpdateProjectDoc();
    message.txHash = object.txHash ?? "";
    message.senderDid = object.senderDid ?? "";
    message.projectDid = object.projectDid ?? "";
    message.data = object.data ?? new Uint8Array();
    message.projectAddress = object.projectAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateProjectDocResponse(): MsgUpdateProjectDocResponse {
  return {};
}

export const MsgUpdateProjectDocResponse = {
  encode(_: MsgUpdateProjectDocResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateProjectDocResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateProjectDocResponse();
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

  fromJSON(_: any): MsgUpdateProjectDocResponse {
    return {};
  },

  toJSON(_: MsgUpdateProjectDocResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateProjectDocResponse>, I>>(_: I): MsgUpdateProjectDocResponse {
    const message = createBaseMsgUpdateProjectDocResponse();
    return message;
  },
};

/** Msg defines the project Msg service. */
export interface Msg {
  /** CreateProject defines a method for creating a project. */
  CreateProject(request: MsgCreateProject): Promise<MsgCreateProjectResponse>;
  /** UpdateProjectStatus defines a method for updating a project's current status. */
  UpdateProjectStatus(request: MsgUpdateProjectStatus): Promise<MsgUpdateProjectStatusResponse>;
  /** CreateAgent defines a method for creating an agent on a project. */
  CreateAgent(request: MsgCreateAgent): Promise<MsgCreateAgentResponse>;
  /** UpdateAgent defines a method for updating an agent on a project. */
  UpdateAgent(request: MsgUpdateAgent): Promise<MsgUpdateAgentResponse>;
  /** CreateClaim defines a method for creating a claim on a project. */
  CreateClaim(request: MsgCreateClaim): Promise<MsgCreateClaimResponse>;
  /** CreateEvaluation defines a method for creating an evaluation for a specific claim on a project. */
  CreateEvaluation(request: MsgCreateEvaluation): Promise<MsgCreateEvaluationResponse>;
  /** WithdrawFunds defines a method for project agents to withdraw their funds from a project. */
  WithdrawFunds(request: MsgWithdrawFunds): Promise<MsgWithdrawFundsResponse>;
  /** UpdateProjectDoc defines a method for updating a project's data. */
  UpdateProjectDoc(request: MsgUpdateProjectDoc): Promise<MsgUpdateProjectDocResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "project.Msg";
    this.rpc = rpc;
    this.CreateProject = this.CreateProject.bind(this);
    this.UpdateProjectStatus = this.UpdateProjectStatus.bind(this);
    this.CreateAgent = this.CreateAgent.bind(this);
    this.UpdateAgent = this.UpdateAgent.bind(this);
    this.CreateClaim = this.CreateClaim.bind(this);
    this.CreateEvaluation = this.CreateEvaluation.bind(this);
    this.WithdrawFunds = this.WithdrawFunds.bind(this);
    this.UpdateProjectDoc = this.UpdateProjectDoc.bind(this);
  }
  CreateProject(request: MsgCreateProject): Promise<MsgCreateProjectResponse> {
    const data = MsgCreateProject.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateProject", data);
    return promise.then((data) => MsgCreateProjectResponse.decode(new _m0.Reader(data)));
  }

  UpdateProjectStatus(request: MsgUpdateProjectStatus): Promise<MsgUpdateProjectStatusResponse> {
    const data = MsgUpdateProjectStatus.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateProjectStatus", data);
    return promise.then((data) => MsgUpdateProjectStatusResponse.decode(new _m0.Reader(data)));
  }

  CreateAgent(request: MsgCreateAgent): Promise<MsgCreateAgentResponse> {
    const data = MsgCreateAgent.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateAgent", data);
    return promise.then((data) => MsgCreateAgentResponse.decode(new _m0.Reader(data)));
  }

  UpdateAgent(request: MsgUpdateAgent): Promise<MsgUpdateAgentResponse> {
    const data = MsgUpdateAgent.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateAgent", data);
    return promise.then((data) => MsgUpdateAgentResponse.decode(new _m0.Reader(data)));
  }

  CreateClaim(request: MsgCreateClaim): Promise<MsgCreateClaimResponse> {
    const data = MsgCreateClaim.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateClaim", data);
    return promise.then((data) => MsgCreateClaimResponse.decode(new _m0.Reader(data)));
  }

  CreateEvaluation(request: MsgCreateEvaluation): Promise<MsgCreateEvaluationResponse> {
    const data = MsgCreateEvaluation.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateEvaluation", data);
    return promise.then((data) => MsgCreateEvaluationResponse.decode(new _m0.Reader(data)));
  }

  WithdrawFunds(request: MsgWithdrawFunds): Promise<MsgWithdrawFundsResponse> {
    const data = MsgWithdrawFunds.encode(request).finish();
    const promise = this.rpc.request(this.service, "WithdrawFunds", data);
    return promise.then((data) => MsgWithdrawFundsResponse.decode(new _m0.Reader(data)));
  }

  UpdateProjectDoc(request: MsgUpdateProjectDoc): Promise<MsgUpdateProjectDocResponse> {
    const data = MsgUpdateProjectDoc.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateProjectDoc", data);
    return promise.then((data) => MsgUpdateProjectDocResponse.decode(new _m0.Reader(data)));
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
