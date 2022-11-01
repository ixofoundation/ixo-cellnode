/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/coin";

export const protobufPackage = "project";

/** UpdateProjectStatusDoc contains details required to update a project's status. */
export interface UpdateProjectStatusDoc {
  status: string;
  ethFundingTxnId: string;
}

/** CreateAgentDoc contains details required to create an agent. */
export interface CreateAgentDoc {
  agentDid: string;
  role: string;
}

/** UpdateAgentDoc contains details required to update an agent. */
export interface UpdateAgentDoc {
  did: string;
  status: string;
  role: string;
}

/** CreateClaimDoc contains details required to create a claim on a project. */
export interface CreateClaimDoc {
  claimId: string;
  claimTemplateId: string;
}

/** CreateEvaluationDoc contains details required to create an evaluation for a specific claim on a project. */
export interface CreateEvaluationDoc {
  claimId: string;
  status: string;
}

/** WithdrawFundsDoc contains details required to withdraw funds from a specific project. */
export interface WithdrawFundsDoc {
  projectDid: string;
  recipientDid: string;
  amount: string;
  isRefund: boolean;
}

/** ProjectDoc defines a project (or entity) type with all of its parameters. */
export interface ProjectDoc {
  txHash: string;
  projectDid: string;
  senderDid: string;
  pubKey: string;
  status: string;
  data: Uint8Array;
}

/** WithdrawalInfoDoc contains details required to withdraw from a specific project. */
export interface WithdrawalInfoDoc {
  projectDid: string;
  recipientDid: string;
  amount?: Coin;
}

/** Params defines the parameters for the project module. */
export interface Params {
  ixoDid: string;
  projectMinimumInitialFunding: Coin[];
  oracleFeePercentage: string;
  nodeFeePercentage: string;
}

/** Claim contains details required to start a claim on a project. */
export interface Claim {
  id: string;
  templateId: string;
  claimerDid: string;
  status: string;
}

/** GenesisAccountMap is a type used at genesis that maps a specific project's account names to the accounts' addresses. */
export interface GenesisAccountMap {
  map: { [key: string]: string };
}

export interface GenesisAccountMap_MapEntry {
  key: string;
  value: string;
}

/** AccountMap maps a specific project's account names to the accounts' addresses. */
export interface AccountMap {
  map: { [key: string]: string };
}

export interface AccountMap_MapEntry {
  key: string;
  value: string;
}

/** WithdrawalInfoDocs contains a list of type WithdrawalInfoDoc. */
export interface WithdrawalInfoDocs {
  docsList: WithdrawalInfoDoc[];
}

/** Claims contains a list of type Claim. */
export interface Claims {
  claimsList: Claim[];
}

function createBaseUpdateProjectStatusDoc(): UpdateProjectStatusDoc {
  return { status: "", ethFundingTxnId: "" };
}

export const UpdateProjectStatusDoc = {
  encode(message: UpdateProjectStatusDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.ethFundingTxnId !== "") {
      writer.uint32(18).string(message.ethFundingTxnId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectStatusDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProjectStatusDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        case 2:
          message.ethFundingTxnId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectStatusDoc {
    return {
      status: isSet(object.status) ? String(object.status) : "",
      ethFundingTxnId: isSet(object.ethFundingTxnId) ? String(object.ethFundingTxnId) : "",
    };
  },

  toJSON(message: UpdateProjectStatusDoc): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.ethFundingTxnId !== undefined && (obj.ethFundingTxnId = message.ethFundingTxnId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateProjectStatusDoc>, I>>(object: I): UpdateProjectStatusDoc {
    const message = createBaseUpdateProjectStatusDoc();
    message.status = object.status ?? "";
    message.ethFundingTxnId = object.ethFundingTxnId ?? "";
    return message;
  },
};

function createBaseCreateAgentDoc(): CreateAgentDoc {
  return { agentDid: "", role: "" };
}

export const CreateAgentDoc = {
  encode(message: CreateAgentDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.agentDid !== "") {
      writer.uint32(10).string(message.agentDid);
    }
    if (message.role !== "") {
      writer.uint32(18).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAgentDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateAgentDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.agentDid = reader.string();
          break;
        case 2:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAgentDoc {
    return {
      agentDid: isSet(object.agentDid) ? String(object.agentDid) : "",
      role: isSet(object.role) ? String(object.role) : "",
    };
  },

  toJSON(message: CreateAgentDoc): unknown {
    const obj: any = {};
    message.agentDid !== undefined && (obj.agentDid = message.agentDid);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateAgentDoc>, I>>(object: I): CreateAgentDoc {
    const message = createBaseCreateAgentDoc();
    message.agentDid = object.agentDid ?? "";
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseUpdateAgentDoc(): UpdateAgentDoc {
  return { did: "", status: "", role: "" };
}

export const UpdateAgentDoc = {
  encode(message: UpdateAgentDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAgentDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAgentDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAgentDoc {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      status: isSet(object.status) ? String(object.status) : "",
      role: isSet(object.role) ? String(object.role) : "",
    };
  },

  toJSON(message: UpdateAgentDoc): unknown {
    const obj: any = {};
    message.did !== undefined && (obj.did = message.did);
    message.status !== undefined && (obj.status = message.status);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateAgentDoc>, I>>(object: I): UpdateAgentDoc {
    const message = createBaseUpdateAgentDoc();
    message.did = object.did ?? "";
    message.status = object.status ?? "";
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseCreateClaimDoc(): CreateClaimDoc {
  return { claimId: "", claimTemplateId: "" };
}

export const CreateClaimDoc = {
  encode(message: CreateClaimDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.claimId !== "") {
      writer.uint32(10).string(message.claimId);
    }
    if (message.claimTemplateId !== "") {
      writer.uint32(18).string(message.claimTemplateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateClaimDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateClaimDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimId = reader.string();
          break;
        case 2:
          message.claimTemplateId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateClaimDoc {
    return {
      claimId: isSet(object.claimId) ? String(object.claimId) : "",
      claimTemplateId: isSet(object.claimTemplateId) ? String(object.claimTemplateId) : "",
    };
  },

  toJSON(message: CreateClaimDoc): unknown {
    const obj: any = {};
    message.claimId !== undefined && (obj.claimId = message.claimId);
    message.claimTemplateId !== undefined && (obj.claimTemplateId = message.claimTemplateId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateClaimDoc>, I>>(object: I): CreateClaimDoc {
    const message = createBaseCreateClaimDoc();
    message.claimId = object.claimId ?? "";
    message.claimTemplateId = object.claimTemplateId ?? "";
    return message;
  },
};

function createBaseCreateEvaluationDoc(): CreateEvaluationDoc {
  return { claimId: "", status: "" };
}

export const CreateEvaluationDoc = {
  encode(message: CreateEvaluationDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.claimId !== "") {
      writer.uint32(10).string(message.claimId);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateEvaluationDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEvaluationDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimId = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateEvaluationDoc {
    return {
      claimId: isSet(object.claimId) ? String(object.claimId) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: CreateEvaluationDoc): unknown {
    const obj: any = {};
    message.claimId !== undefined && (obj.claimId = message.claimId);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateEvaluationDoc>, I>>(object: I): CreateEvaluationDoc {
    const message = createBaseCreateEvaluationDoc();
    message.claimId = object.claimId ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseWithdrawFundsDoc(): WithdrawFundsDoc {
  return { projectDid: "", recipientDid: "", amount: "", isRefund: false };
}

export const WithdrawFundsDoc = {
  encode(message: WithdrawFundsDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDid !== "") {
      writer.uint32(10).string(message.projectDid);
    }
    if (message.recipientDid !== "") {
      writer.uint32(18).string(message.recipientDid);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.isRefund === true) {
      writer.uint32(32).bool(message.isRefund);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawFundsDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawFundsDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDid = reader.string();
          break;
        case 2:
          message.recipientDid = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.isRefund = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawFundsDoc {
    return {
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      recipientDid: isSet(object.recipientDid) ? String(object.recipientDid) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      isRefund: isSet(object.isRefund) ? Boolean(object.isRefund) : false,
    };
  },

  toJSON(message: WithdrawFundsDoc): unknown {
    const obj: any = {};
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.recipientDid !== undefined && (obj.recipientDid = message.recipientDid);
    message.amount !== undefined && (obj.amount = message.amount);
    message.isRefund !== undefined && (obj.isRefund = message.isRefund);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawFundsDoc>, I>>(object: I): WithdrawFundsDoc {
    const message = createBaseWithdrawFundsDoc();
    message.projectDid = object.projectDid ?? "";
    message.recipientDid = object.recipientDid ?? "";
    message.amount = object.amount ?? "";
    message.isRefund = object.isRefund ?? false;
    return message;
  },
};

function createBaseProjectDoc(): ProjectDoc {
  return { txHash: "", projectDid: "", senderDid: "", pubKey: "", status: "", data: new Uint8Array() };
}

export const ProjectDoc = {
  encode(message: ProjectDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (message.projectDid !== "") {
      writer.uint32(18).string(message.projectDid);
    }
    if (message.senderDid !== "") {
      writer.uint32(26).string(message.senderDid);
    }
    if (message.pubKey !== "") {
      writer.uint32(34).string(message.pubKey);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.projectDid = reader.string();
          break;
        case 3:
          message.senderDid = reader.string();
          break;
        case 4:
          message.pubKey = reader.string();
          break;
        case 5:
          message.status = reader.string();
          break;
        case 6:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProjectDoc {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      status: isSet(object.status) ? String(object.status) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: ProjectDoc): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    message.status !== undefined && (obj.status = message.status);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProjectDoc>, I>>(object: I): ProjectDoc {
    const message = createBaseProjectDoc();
    message.txHash = object.txHash ?? "";
    message.projectDid = object.projectDid ?? "";
    message.senderDid = object.senderDid ?? "";
    message.pubKey = object.pubKey ?? "";
    message.status = object.status ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseWithdrawalInfoDoc(): WithdrawalInfoDoc {
  return { projectDid: "", recipientDid: "", amount: undefined };
}

export const WithdrawalInfoDoc = {
  encode(message: WithdrawalInfoDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectDid !== "") {
      writer.uint32(10).string(message.projectDid);
    }
    if (message.recipientDid !== "") {
      writer.uint32(18).string(message.recipientDid);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawalInfoDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawalInfoDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectDid = reader.string();
          break;
        case 2:
          message.recipientDid = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawalInfoDoc {
    return {
      projectDid: isSet(object.projectDid) ? String(object.projectDid) : "",
      recipientDid: isSet(object.recipientDid) ? String(object.recipientDid) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: WithdrawalInfoDoc): unknown {
    const obj: any = {};
    message.projectDid !== undefined && (obj.projectDid = message.projectDid);
    message.recipientDid !== undefined && (obj.recipientDid = message.recipientDid);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawalInfoDoc>, I>>(object: I): WithdrawalInfoDoc {
    const message = createBaseWithdrawalInfoDoc();
    message.projectDid = object.projectDid ?? "";
    message.recipientDid = object.recipientDid ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return { ixoDid: "", projectMinimumInitialFunding: [], oracleFeePercentage: "", nodeFeePercentage: "" };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ixoDid !== "") {
      writer.uint32(10).string(message.ixoDid);
    }
    for (const v of message.projectMinimumInitialFunding) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.oracleFeePercentage !== "") {
      writer.uint32(26).string(message.oracleFeePercentage);
    }
    if (message.nodeFeePercentage !== "") {
      writer.uint32(34).string(message.nodeFeePercentage);
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
          message.ixoDid = reader.string();
          break;
        case 2:
          message.projectMinimumInitialFunding.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.oracleFeePercentage = reader.string();
          break;
        case 4:
          message.nodeFeePercentage = reader.string();
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
      ixoDid: isSet(object.ixoDid) ? String(object.ixoDid) : "",
      projectMinimumInitialFunding: Array.isArray(object?.projectMinimumInitialFunding)
        ? object.projectMinimumInitialFunding.map((e: any) => Coin.fromJSON(e))
        : [],
      oracleFeePercentage: isSet(object.oracleFeePercentage) ? String(object.oracleFeePercentage) : "",
      nodeFeePercentage: isSet(object.nodeFeePercentage) ? String(object.nodeFeePercentage) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.ixoDid !== undefined && (obj.ixoDid = message.ixoDid);
    if (message.projectMinimumInitialFunding) {
      obj.projectMinimumInitialFunding = message.projectMinimumInitialFunding.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.projectMinimumInitialFunding = [];
    }
    message.oracleFeePercentage !== undefined && (obj.oracleFeePercentage = message.oracleFeePercentage);
    message.nodeFeePercentage !== undefined && (obj.nodeFeePercentage = message.nodeFeePercentage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.ixoDid = object.ixoDid ?? "";
    message.projectMinimumInitialFunding = object.projectMinimumInitialFunding?.map((e) => Coin.fromPartial(e)) || [];
    message.oracleFeePercentage = object.oracleFeePercentage ?? "";
    message.nodeFeePercentage = object.nodeFeePercentage ?? "";
    return message;
  },
};

function createBaseClaim(): Claim {
  return { id: "", templateId: "", claimerDid: "", status: "" };
}

export const Claim = {
  encode(message: Claim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.templateId !== "") {
      writer.uint32(18).string(message.templateId);
    }
    if (message.claimerDid !== "") {
      writer.uint32(26).string(message.claimerDid);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
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
          message.templateId = reader.string();
          break;
        case 3:
          message.claimerDid = reader.string();
          break;
        case 4:
          message.status = reader.string();
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
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      claimerDid: isSet(object.claimerDid) ? String(object.claimerDid) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: Claim): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.claimerDid !== undefined && (obj.claimerDid = message.claimerDid);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Claim>, I>>(object: I): Claim {
    const message = createBaseClaim();
    message.id = object.id ?? "";
    message.templateId = object.templateId ?? "";
    message.claimerDid = object.claimerDid ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseGenesisAccountMap(): GenesisAccountMap {
  return { map: {} };
}

export const GenesisAccountMap = {
  encode(message: GenesisAccountMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.map).forEach(([key, value]) => {
      GenesisAccountMap_MapEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAccountMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccountMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GenesisAccountMap_MapEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.map[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisAccountMap {
    return {
      map: isObject(object.map)
        ? Object.entries(object.map).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GenesisAccountMap): unknown {
    const obj: any = {};
    obj.map = {};
    if (message.map) {
      Object.entries(message.map).forEach(([k, v]) => {
        obj.map[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisAccountMap>, I>>(object: I): GenesisAccountMap {
    const message = createBaseGenesisAccountMap();
    message.map = Object.entries(object.map ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGenesisAccountMap_MapEntry(): GenesisAccountMap_MapEntry {
  return { key: "", value: "" };
}

export const GenesisAccountMap_MapEntry = {
  encode(message: GenesisAccountMap_MapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAccountMap_MapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccountMap_MapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisAccountMap_MapEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: GenesisAccountMap_MapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisAccountMap_MapEntry>, I>>(object: I): GenesisAccountMap_MapEntry {
    const message = createBaseGenesisAccountMap_MapEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAccountMap(): AccountMap {
  return { map: {} };
}

export const AccountMap = {
  encode(message: AccountMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.map).forEach(([key, value]) => {
      AccountMap_MapEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = AccountMap_MapEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.map[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountMap {
    return {
      map: isObject(object.map)
        ? Object.entries(object.map).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: AccountMap): unknown {
    const obj: any = {};
    obj.map = {};
    if (message.map) {
      Object.entries(message.map).forEach(([k, v]) => {
        obj.map[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountMap>, I>>(object: I): AccountMap {
    const message = createBaseAccountMap();
    message.map = Object.entries(object.map ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAccountMap_MapEntry(): AccountMap_MapEntry {
  return { key: "", value: "" };
}

export const AccountMap_MapEntry = {
  encode(message: AccountMap_MapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountMap_MapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountMap_MapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountMap_MapEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: AccountMap_MapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccountMap_MapEntry>, I>>(object: I): AccountMap_MapEntry {
    const message = createBaseAccountMap_MapEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseWithdrawalInfoDocs(): WithdrawalInfoDocs {
  return { docsList: [] };
}

export const WithdrawalInfoDocs = {
  encode(message: WithdrawalInfoDocs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.docsList) {
      WithdrawalInfoDoc.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawalInfoDocs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawalInfoDocs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.docsList.push(WithdrawalInfoDoc.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawalInfoDocs {
    return {
      docsList: Array.isArray(object?.docsList) ? object.docsList.map((e: any) => WithdrawalInfoDoc.fromJSON(e)) : [],
    };
  },

  toJSON(message: WithdrawalInfoDocs): unknown {
    const obj: any = {};
    if (message.docsList) {
      obj.docsList = message.docsList.map((e) => e ? WithdrawalInfoDoc.toJSON(e) : undefined);
    } else {
      obj.docsList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawalInfoDocs>, I>>(object: I): WithdrawalInfoDocs {
    const message = createBaseWithdrawalInfoDocs();
    message.docsList = object.docsList?.map((e) => WithdrawalInfoDoc.fromPartial(e)) || [];
    return message;
  },
};

function createBaseClaims(): Claims {
  return { claimsList: [] };
}

export const Claims = {
  encode(message: Claims, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.claimsList) {
      Claim.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Claims {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaims();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimsList.push(Claim.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Claims {
    return {
      claimsList: Array.isArray(object?.claimsList) ? object.claimsList.map((e: any) => Claim.fromJSON(e)) : [],
    };
  },

  toJSON(message: Claims): unknown {
    const obj: any = {};
    if (message.claimsList) {
      obj.claimsList = message.claimsList.map((e) => e ? Claim.toJSON(e) : undefined);
    } else {
      obj.claimsList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Claims>, I>>(object: I): Claims {
    const message = createBaseClaims();
    message.claimsList = object.claimsList?.map((e) => Claim.fromPartial(e)) || [];
    return message;
  },
};

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
