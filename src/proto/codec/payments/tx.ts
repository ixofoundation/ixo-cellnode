/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/coin";
import { Any } from "../google/protobuf/any";
import { DistributionShare, PaymentTemplate } from "./payments";

export const protobufPackage = "payments";

/** MsgSetPaymentContractAuthorisation defines a message for authorising or deauthorising a payment contract. */
export interface MsgSetPaymentContractAuthorisation {
  paymentContractId: string;
  payerDid: string;
  authorised: boolean;
  payerAddress: string;
}

/** MsgSetPaymentContractAuthorisationResponse defines the Msg/SetPaymentContractAuthorisation response type. */
export interface MsgSetPaymentContractAuthorisationResponse {
}

/** MsgCreatePaymentTemplate defines a message for creating a payment template. */
export interface MsgCreatePaymentTemplate {
  creatorDid: string;
  paymentTemplate?: PaymentTemplate;
  creatorAddress: string;
}

/** MsgCreatePaymentTemplateResponse defines the Msg/CreatePaymentTemplate response type. */
export interface MsgCreatePaymentTemplateResponse {
}

/** MsgCreatePaymentContract defines a message for creating a payment contract. */
export interface MsgCreatePaymentContract {
  creatorDid: string;
  paymentTemplateId: string;
  paymentContractId: string;
  payer: string;
  recipients: DistributionShare[];
  canDeauthorise: boolean;
  discountId: string;
  creatorAddress: string;
}

/** MsgCreatePaymentContractResponse defines the Msg/CreatePaymentContract response type. */
export interface MsgCreatePaymentContractResponse {
}

/** MsgCreateSubscription defines a message for creating a subscription. */
export interface MsgCreateSubscription {
  creatorDid: string;
  subscriptionId: string;
  paymentContractId: string;
  maxPeriods: string;
  period?: Any;
  creatorAddress: string;
}

/** MsgCreateSubscriptionResponse defines the Msg/CreateSubscription response type. */
export interface MsgCreateSubscriptionResponse {
}

/** MsgGrantDiscount defines a message for granting a discount to a payer on a specific payment contract. */
export interface MsgGrantDiscount {
  senderDid: string;
  paymentContractId: string;
  discountId: string;
  recipient: string;
  senderAddress: string;
}

/** MsgGrantDiscountResponse defines the Msg/GrantDiscount response type. */
export interface MsgGrantDiscountResponse {
}

/** MsgRevokeDiscount defines a message for revoking a discount previously granted to a payer. */
export interface MsgRevokeDiscount {
  senderDid: string;
  paymentContractId: string;
  holder: string;
  senderAddress: string;
}

/** MsgRevokeDiscountResponse defines the Msg/RevokeDiscount response type. */
export interface MsgRevokeDiscountResponse {
}

/** MsgEffectPayment defines a message for putting a specific payment contract into effect. */
export interface MsgEffectPayment {
  senderDid: string;
  paymentContractId: string;
  partialPaymentAmount: Coin[];
  senderAddress: string;
}

/** MsgEffectPaymentResponse defines the Msg/EffectPayment response type. */
export interface MsgEffectPaymentResponse {
}

function createBaseMsgSetPaymentContractAuthorisation(): MsgSetPaymentContractAuthorisation {
  return { paymentContractId: "", payerDid: "", authorised: false, payerAddress: "" };
}

export const MsgSetPaymentContractAuthorisation = {
  encode(message: MsgSetPaymentContractAuthorisation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paymentContractId !== "") {
      writer.uint32(10).string(message.paymentContractId);
    }
    if (message.payerDid !== "") {
      writer.uint32(18).string(message.payerDid);
    }
    if (message.authorised === true) {
      writer.uint32(24).bool(message.authorised);
    }
    if (message.payerAddress !== "") {
      writer.uint32(34).string(message.payerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPaymentContractAuthorisation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPaymentContractAuthorisation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentContractId = reader.string();
          break;
        case 2:
          message.payerDid = reader.string();
          break;
        case 3:
          message.authorised = reader.bool();
          break;
        case 4:
          message.payerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPaymentContractAuthorisation {
    return {
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      payerDid: isSet(object.payerDid) ? String(object.payerDid) : "",
      authorised: isSet(object.authorised) ? Boolean(object.authorised) : false,
      payerAddress: isSet(object.payerAddress) ? String(object.payerAddress) : "",
    };
  },

  toJSON(message: MsgSetPaymentContractAuthorisation): unknown {
    const obj: any = {};
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.payerDid !== undefined && (obj.payerDid = message.payerDid);
    message.authorised !== undefined && (obj.authorised = message.authorised);
    message.payerAddress !== undefined && (obj.payerAddress = message.payerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPaymentContractAuthorisation>, I>>(
    object: I,
  ): MsgSetPaymentContractAuthorisation {
    const message = createBaseMsgSetPaymentContractAuthorisation();
    message.paymentContractId = object.paymentContractId ?? "";
    message.payerDid = object.payerDid ?? "";
    message.authorised = object.authorised ?? false;
    message.payerAddress = object.payerAddress ?? "";
    return message;
  },
};

function createBaseMsgSetPaymentContractAuthorisationResponse(): MsgSetPaymentContractAuthorisationResponse {
  return {};
}

export const MsgSetPaymentContractAuthorisationResponse = {
  encode(_: MsgSetPaymentContractAuthorisationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPaymentContractAuthorisationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPaymentContractAuthorisationResponse();
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

  fromJSON(_: any): MsgSetPaymentContractAuthorisationResponse {
    return {};
  },

  toJSON(_: MsgSetPaymentContractAuthorisationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPaymentContractAuthorisationResponse>, I>>(
    _: I,
  ): MsgSetPaymentContractAuthorisationResponse {
    const message = createBaseMsgSetPaymentContractAuthorisationResponse();
    return message;
  },
};

function createBaseMsgCreatePaymentTemplate(): MsgCreatePaymentTemplate {
  return { creatorDid: "", paymentTemplate: undefined, creatorAddress: "" };
}

export const MsgCreatePaymentTemplate = {
  encode(message: MsgCreatePaymentTemplate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creatorDid !== "") {
      writer.uint32(10).string(message.creatorDid);
    }
    if (message.paymentTemplate !== undefined) {
      PaymentTemplate.encode(message.paymentTemplate, writer.uint32(18).fork()).ldelim();
    }
    if (message.creatorAddress !== "") {
      writer.uint32(26).string(message.creatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePaymentTemplate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePaymentTemplate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creatorDid = reader.string();
          break;
        case 2:
          message.paymentTemplate = PaymentTemplate.decode(reader, reader.uint32());
          break;
        case 3:
          message.creatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePaymentTemplate {
    return {
      creatorDid: isSet(object.creatorDid) ? String(object.creatorDid) : "",
      paymentTemplate: isSet(object.paymentTemplate) ? PaymentTemplate.fromJSON(object.paymentTemplate) : undefined,
      creatorAddress: isSet(object.creatorAddress) ? String(object.creatorAddress) : "",
    };
  },

  toJSON(message: MsgCreatePaymentTemplate): unknown {
    const obj: any = {};
    message.creatorDid !== undefined && (obj.creatorDid = message.creatorDid);
    message.paymentTemplate !== undefined &&
      (obj.paymentTemplate = message.paymentTemplate ? PaymentTemplate.toJSON(message.paymentTemplate) : undefined);
    message.creatorAddress !== undefined && (obj.creatorAddress = message.creatorAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePaymentTemplate>, I>>(object: I): MsgCreatePaymentTemplate {
    const message = createBaseMsgCreatePaymentTemplate();
    message.creatorDid = object.creatorDid ?? "";
    message.paymentTemplate = (object.paymentTemplate !== undefined && object.paymentTemplate !== null)
      ? PaymentTemplate.fromPartial(object.paymentTemplate)
      : undefined;
    message.creatorAddress = object.creatorAddress ?? "";
    return message;
  },
};

function createBaseMsgCreatePaymentTemplateResponse(): MsgCreatePaymentTemplateResponse {
  return {};
}

export const MsgCreatePaymentTemplateResponse = {
  encode(_: MsgCreatePaymentTemplateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePaymentTemplateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePaymentTemplateResponse();
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

  fromJSON(_: any): MsgCreatePaymentTemplateResponse {
    return {};
  },

  toJSON(_: MsgCreatePaymentTemplateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePaymentTemplateResponse>, I>>(
    _: I,
  ): MsgCreatePaymentTemplateResponse {
    const message = createBaseMsgCreatePaymentTemplateResponse();
    return message;
  },
};

function createBaseMsgCreatePaymentContract(): MsgCreatePaymentContract {
  return {
    creatorDid: "",
    paymentTemplateId: "",
    paymentContractId: "",
    payer: "",
    recipients: [],
    canDeauthorise: false,
    discountId: "",
    creatorAddress: "",
  };
}

export const MsgCreatePaymentContract = {
  encode(message: MsgCreatePaymentContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creatorDid !== "") {
      writer.uint32(10).string(message.creatorDid);
    }
    if (message.paymentTemplateId !== "") {
      writer.uint32(18).string(message.paymentTemplateId);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(26).string(message.paymentContractId);
    }
    if (message.payer !== "") {
      writer.uint32(34).string(message.payer);
    }
    for (const v of message.recipients) {
      DistributionShare.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.canDeauthorise === true) {
      writer.uint32(48).bool(message.canDeauthorise);
    }
    if (message.discountId !== "") {
      writer.uint32(58).string(message.discountId);
    }
    if (message.creatorAddress !== "") {
      writer.uint32(66).string(message.creatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePaymentContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePaymentContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creatorDid = reader.string();
          break;
        case 2:
          message.paymentTemplateId = reader.string();
          break;
        case 3:
          message.paymentContractId = reader.string();
          break;
        case 4:
          message.payer = reader.string();
          break;
        case 5:
          message.recipients.push(DistributionShare.decode(reader, reader.uint32()));
          break;
        case 6:
          message.canDeauthorise = reader.bool();
          break;
        case 7:
          message.discountId = reader.string();
          break;
        case 8:
          message.creatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePaymentContract {
    return {
      creatorDid: isSet(object.creatorDid) ? String(object.creatorDid) : "",
      paymentTemplateId: isSet(object.paymentTemplateId) ? String(object.paymentTemplateId) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      payer: isSet(object.payer) ? String(object.payer) : "",
      recipients: Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => DistributionShare.fromJSON(e))
        : [],
      canDeauthorise: isSet(object.canDeauthorise) ? Boolean(object.canDeauthorise) : false,
      discountId: isSet(object.discountId) ? String(object.discountId) : "",
      creatorAddress: isSet(object.creatorAddress) ? String(object.creatorAddress) : "",
    };
  },

  toJSON(message: MsgCreatePaymentContract): unknown {
    const obj: any = {};
    message.creatorDid !== undefined && (obj.creatorDid = message.creatorDid);
    message.paymentTemplateId !== undefined && (obj.paymentTemplateId = message.paymentTemplateId);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.payer !== undefined && (obj.payer = message.payer);
    if (message.recipients) {
      obj.recipients = message.recipients.map((e) => e ? DistributionShare.toJSON(e) : undefined);
    } else {
      obj.recipients = [];
    }
    message.canDeauthorise !== undefined && (obj.canDeauthorise = message.canDeauthorise);
    message.discountId !== undefined && (obj.discountId = message.discountId);
    message.creatorAddress !== undefined && (obj.creatorAddress = message.creatorAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePaymentContract>, I>>(object: I): MsgCreatePaymentContract {
    const message = createBaseMsgCreatePaymentContract();
    message.creatorDid = object.creatorDid ?? "";
    message.paymentTemplateId = object.paymentTemplateId ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.payer = object.payer ?? "";
    message.recipients = object.recipients?.map((e) => DistributionShare.fromPartial(e)) || [];
    message.canDeauthorise = object.canDeauthorise ?? false;
    message.discountId = object.discountId ?? "";
    message.creatorAddress = object.creatorAddress ?? "";
    return message;
  },
};

function createBaseMsgCreatePaymentContractResponse(): MsgCreatePaymentContractResponse {
  return {};
}

export const MsgCreatePaymentContractResponse = {
  encode(_: MsgCreatePaymentContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePaymentContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePaymentContractResponse();
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

  fromJSON(_: any): MsgCreatePaymentContractResponse {
    return {};
  },

  toJSON(_: MsgCreatePaymentContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePaymentContractResponse>, I>>(
    _: I,
  ): MsgCreatePaymentContractResponse {
    const message = createBaseMsgCreatePaymentContractResponse();
    return message;
  },
};

function createBaseMsgCreateSubscription(): MsgCreateSubscription {
  return {
    creatorDid: "",
    subscriptionId: "",
    paymentContractId: "",
    maxPeriods: "",
    period: undefined,
    creatorAddress: "",
  };
}

export const MsgCreateSubscription = {
  encode(message: MsgCreateSubscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creatorDid !== "") {
      writer.uint32(10).string(message.creatorDid);
    }
    if (message.subscriptionId !== "") {
      writer.uint32(18).string(message.subscriptionId);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(26).string(message.paymentContractId);
    }
    if (message.maxPeriods !== "") {
      writer.uint32(34).string(message.maxPeriods);
    }
    if (message.period !== undefined) {
      Any.encode(message.period, writer.uint32(42).fork()).ldelim();
    }
    if (message.creatorAddress !== "") {
      writer.uint32(50).string(message.creatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSubscription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creatorDid = reader.string();
          break;
        case 2:
          message.subscriptionId = reader.string();
          break;
        case 3:
          message.paymentContractId = reader.string();
          break;
        case 4:
          message.maxPeriods = reader.string();
          break;
        case 5:
          message.period = Any.decode(reader, reader.uint32());
          break;
        case 6:
          message.creatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSubscription {
    return {
      creatorDid: isSet(object.creatorDid) ? String(object.creatorDid) : "",
      subscriptionId: isSet(object.subscriptionId) ? String(object.subscriptionId) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      maxPeriods: isSet(object.maxPeriods) ? String(object.maxPeriods) : "",
      period: isSet(object.period) ? Any.fromJSON(object.period) : undefined,
      creatorAddress: isSet(object.creatorAddress) ? String(object.creatorAddress) : "",
    };
  },

  toJSON(message: MsgCreateSubscription): unknown {
    const obj: any = {};
    message.creatorDid !== undefined && (obj.creatorDid = message.creatorDid);
    message.subscriptionId !== undefined && (obj.subscriptionId = message.subscriptionId);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.maxPeriods !== undefined && (obj.maxPeriods = message.maxPeriods);
    message.period !== undefined && (obj.period = message.period ? Any.toJSON(message.period) : undefined);
    message.creatorAddress !== undefined && (obj.creatorAddress = message.creatorAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSubscription>, I>>(object: I): MsgCreateSubscription {
    const message = createBaseMsgCreateSubscription();
    message.creatorDid = object.creatorDid ?? "";
    message.subscriptionId = object.subscriptionId ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.maxPeriods = object.maxPeriods ?? "";
    message.period = (object.period !== undefined && object.period !== null)
      ? Any.fromPartial(object.period)
      : undefined;
    message.creatorAddress = object.creatorAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateSubscriptionResponse(): MsgCreateSubscriptionResponse {
  return {};
}

export const MsgCreateSubscriptionResponse = {
  encode(_: MsgCreateSubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSubscriptionResponse();
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

  fromJSON(_: any): MsgCreateSubscriptionResponse {
    return {};
  },

  toJSON(_: MsgCreateSubscriptionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSubscriptionResponse>, I>>(_: I): MsgCreateSubscriptionResponse {
    const message = createBaseMsgCreateSubscriptionResponse();
    return message;
  },
};

function createBaseMsgGrantDiscount(): MsgGrantDiscount {
  return { senderDid: "", paymentContractId: "", discountId: "", recipient: "", senderAddress: "" };
}

export const MsgGrantDiscount = {
  encode(message: MsgGrantDiscount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.senderDid !== "") {
      writer.uint32(10).string(message.senderDid);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(18).string(message.paymentContractId);
    }
    if (message.discountId !== "") {
      writer.uint32(26).string(message.discountId);
    }
    if (message.recipient !== "") {
      writer.uint32(34).string(message.recipient);
    }
    if (message.senderAddress !== "") {
      writer.uint32(42).string(message.senderAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrantDiscount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrantDiscount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.senderDid = reader.string();
          break;
        case 2:
          message.paymentContractId = reader.string();
          break;
        case 3:
          message.discountId = reader.string();
          break;
        case 4:
          message.recipient = reader.string();
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

  fromJSON(object: any): MsgGrantDiscount {
    return {
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      discountId: isSet(object.discountId) ? String(object.discountId) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      senderAddress: isSet(object.senderAddress) ? String(object.senderAddress) : "",
    };
  },

  toJSON(message: MsgGrantDiscount): unknown {
    const obj: any = {};
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.discountId !== undefined && (obj.discountId = message.discountId);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.senderAddress !== undefined && (obj.senderAddress = message.senderAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgGrantDiscount>, I>>(object: I): MsgGrantDiscount {
    const message = createBaseMsgGrantDiscount();
    message.senderDid = object.senderDid ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.discountId = object.discountId ?? "";
    message.recipient = object.recipient ?? "";
    message.senderAddress = object.senderAddress ?? "";
    return message;
  },
};

function createBaseMsgGrantDiscountResponse(): MsgGrantDiscountResponse {
  return {};
}

export const MsgGrantDiscountResponse = {
  encode(_: MsgGrantDiscountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrantDiscountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrantDiscountResponse();
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

  fromJSON(_: any): MsgGrantDiscountResponse {
    return {};
  },

  toJSON(_: MsgGrantDiscountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgGrantDiscountResponse>, I>>(_: I): MsgGrantDiscountResponse {
    const message = createBaseMsgGrantDiscountResponse();
    return message;
  },
};

function createBaseMsgRevokeDiscount(): MsgRevokeDiscount {
  return { senderDid: "", paymentContractId: "", holder: "", senderAddress: "" };
}

export const MsgRevokeDiscount = {
  encode(message: MsgRevokeDiscount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.senderDid !== "") {
      writer.uint32(10).string(message.senderDid);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(18).string(message.paymentContractId);
    }
    if (message.holder !== "") {
      writer.uint32(26).string(message.holder);
    }
    if (message.senderAddress !== "") {
      writer.uint32(34).string(message.senderAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeDiscount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeDiscount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.senderDid = reader.string();
          break;
        case 2:
          message.paymentContractId = reader.string();
          break;
        case 3:
          message.holder = reader.string();
          break;
        case 4:
          message.senderAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeDiscount {
    return {
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      holder: isSet(object.holder) ? String(object.holder) : "",
      senderAddress: isSet(object.senderAddress) ? String(object.senderAddress) : "",
    };
  },

  toJSON(message: MsgRevokeDiscount): unknown {
    const obj: any = {};
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.holder !== undefined && (obj.holder = message.holder);
    message.senderAddress !== undefined && (obj.senderAddress = message.senderAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeDiscount>, I>>(object: I): MsgRevokeDiscount {
    const message = createBaseMsgRevokeDiscount();
    message.senderDid = object.senderDid ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.holder = object.holder ?? "";
    message.senderAddress = object.senderAddress ?? "";
    return message;
  },
};

function createBaseMsgRevokeDiscountResponse(): MsgRevokeDiscountResponse {
  return {};
}

export const MsgRevokeDiscountResponse = {
  encode(_: MsgRevokeDiscountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeDiscountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeDiscountResponse();
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

  fromJSON(_: any): MsgRevokeDiscountResponse {
    return {};
  },

  toJSON(_: MsgRevokeDiscountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeDiscountResponse>, I>>(_: I): MsgRevokeDiscountResponse {
    const message = createBaseMsgRevokeDiscountResponse();
    return message;
  },
};

function createBaseMsgEffectPayment(): MsgEffectPayment {
  return { senderDid: "", paymentContractId: "", partialPaymentAmount: [], senderAddress: "" };
}

export const MsgEffectPayment = {
  encode(message: MsgEffectPayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.senderDid !== "") {
      writer.uint32(10).string(message.senderDid);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(18).string(message.paymentContractId);
    }
    for (const v of message.partialPaymentAmount) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.senderAddress !== "") {
      writer.uint32(34).string(message.senderAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEffectPayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEffectPayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.senderDid = reader.string();
          break;
        case 2:
          message.paymentContractId = reader.string();
          break;
        case 6:
          message.partialPaymentAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.senderAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEffectPayment {
    return {
      senderDid: isSet(object.senderDid) ? String(object.senderDid) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      partialPaymentAmount: Array.isArray(object?.partialPaymentAmount)
        ? object.partialPaymentAmount.map((e: any) => Coin.fromJSON(e))
        : [],
      senderAddress: isSet(object.senderAddress) ? String(object.senderAddress) : "",
    };
  },

  toJSON(message: MsgEffectPayment): unknown {
    const obj: any = {};
    message.senderDid !== undefined && (obj.senderDid = message.senderDid);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    if (message.partialPaymentAmount) {
      obj.partialPaymentAmount = message.partialPaymentAmount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.partialPaymentAmount = [];
    }
    message.senderAddress !== undefined && (obj.senderAddress = message.senderAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEffectPayment>, I>>(object: I): MsgEffectPayment {
    const message = createBaseMsgEffectPayment();
    message.senderDid = object.senderDid ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.partialPaymentAmount = object.partialPaymentAmount?.map((e) => Coin.fromPartial(e)) || [];
    message.senderAddress = object.senderAddress ?? "";
    return message;
  },
};

function createBaseMsgEffectPaymentResponse(): MsgEffectPaymentResponse {
  return {};
}

export const MsgEffectPaymentResponse = {
  encode(_: MsgEffectPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEffectPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEffectPaymentResponse();
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

  fromJSON(_: any): MsgEffectPaymentResponse {
    return {};
  },

  toJSON(_: MsgEffectPaymentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEffectPaymentResponse>, I>>(_: I): MsgEffectPaymentResponse {
    const message = createBaseMsgEffectPaymentResponse();
    return message;
  },
};

/** Msg defines the payments Msg service. */
export interface Msg {
  /** SetPaymentContractAuthorisation defines a method for authorising or deauthorising a payment contract. */
  SetPaymentContractAuthorisation(
    request: MsgSetPaymentContractAuthorisation,
  ): Promise<MsgSetPaymentContractAuthorisationResponse>;
  /** CreatePaymentTemplate defines a method for creating a payment template. */
  CreatePaymentTemplate(request: MsgCreatePaymentTemplate): Promise<MsgCreatePaymentTemplateResponse>;
  /** CreatePaymentContract defines a method for creating a payment contract. */
  CreatePaymentContract(request: MsgCreatePaymentContract): Promise<MsgCreatePaymentContractResponse>;
  /** CreateSubscription defines a method for creating a subscription. */
  CreateSubscription(request: MsgCreateSubscription): Promise<MsgCreateSubscriptionResponse>;
  /** GrantDiscount defines a method for granting a discount to a payer on a specific payment contract. */
  GrantDiscount(request: MsgGrantDiscount): Promise<MsgGrantDiscountResponse>;
  /** RevokeDiscount defines a method for revoking a discount previously granted to a payer. */
  RevokeDiscount(request: MsgRevokeDiscount): Promise<MsgRevokeDiscountResponse>;
  /** EffectPayment defines a method for putting a specific payment contract into effect. */
  EffectPayment(request: MsgEffectPayment): Promise<MsgEffectPaymentResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "payments.Msg";
    this.rpc = rpc;
    this.SetPaymentContractAuthorisation = this.SetPaymentContractAuthorisation.bind(this);
    this.CreatePaymentTemplate = this.CreatePaymentTemplate.bind(this);
    this.CreatePaymentContract = this.CreatePaymentContract.bind(this);
    this.CreateSubscription = this.CreateSubscription.bind(this);
    this.GrantDiscount = this.GrantDiscount.bind(this);
    this.RevokeDiscount = this.RevokeDiscount.bind(this);
    this.EffectPayment = this.EffectPayment.bind(this);
  }
  SetPaymentContractAuthorisation(
    request: MsgSetPaymentContractAuthorisation,
  ): Promise<MsgSetPaymentContractAuthorisationResponse> {
    const data = MsgSetPaymentContractAuthorisation.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetPaymentContractAuthorisation", data);
    return promise.then((data) => MsgSetPaymentContractAuthorisationResponse.decode(new _m0.Reader(data)));
  }

  CreatePaymentTemplate(request: MsgCreatePaymentTemplate): Promise<MsgCreatePaymentTemplateResponse> {
    const data = MsgCreatePaymentTemplate.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreatePaymentTemplate", data);
    return promise.then((data) => MsgCreatePaymentTemplateResponse.decode(new _m0.Reader(data)));
  }

  CreatePaymentContract(request: MsgCreatePaymentContract): Promise<MsgCreatePaymentContractResponse> {
    const data = MsgCreatePaymentContract.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreatePaymentContract", data);
    return promise.then((data) => MsgCreatePaymentContractResponse.decode(new _m0.Reader(data)));
  }

  CreateSubscription(request: MsgCreateSubscription): Promise<MsgCreateSubscriptionResponse> {
    const data = MsgCreateSubscription.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSubscription", data);
    return promise.then((data) => MsgCreateSubscriptionResponse.decode(new _m0.Reader(data)));
  }

  GrantDiscount(request: MsgGrantDiscount): Promise<MsgGrantDiscountResponse> {
    const data = MsgGrantDiscount.encode(request).finish();
    const promise = this.rpc.request(this.service, "GrantDiscount", data);
    return promise.then((data) => MsgGrantDiscountResponse.decode(new _m0.Reader(data)));
  }

  RevokeDiscount(request: MsgRevokeDiscount): Promise<MsgRevokeDiscountResponse> {
    const data = MsgRevokeDiscount.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeDiscount", data);
    return promise.then((data) => MsgRevokeDiscountResponse.decode(new _m0.Reader(data)));
  }

  EffectPayment(request: MsgEffectPayment): Promise<MsgEffectPaymentResponse> {
    const data = MsgEffectPayment.encode(request).finish();
    const promise = this.rpc.request(this.service, "EffectPayment", data);
    return promise.then((data) => MsgEffectPaymentResponse.decode(new _m0.Reader(data)));
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
