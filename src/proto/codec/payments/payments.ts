/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/coin";
import { Any } from "../google/protobuf/any";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "payments";

/** PaymentTemplate contains details about a payment, with no info about the payer or payee. */
export interface PaymentTemplate {
  id: string;
  paymentAmount: Coin[];
  paymentMinimum: Coin[];
  paymentMaximum: Coin[];
  discounts: Discount[];
}

/** Discount contains details about a discount which can be granted to payers. */
export interface Discount {
  id: string;
  percent: string;
}

/** DistributionShare specifies the share of a specific payment an address will receive. */
export interface DistributionShare {
  address: string;
  percentage: string;
}

/**
 * PaymentContract specifies an agreement between a payer and payee/s which can be invoked
 * once or multiple times to effect payment/s.
 */
export interface PaymentContract {
  id: string;
  paymentTemplateId: string;
  creator: string;
  payer: string;
  recipients: DistributionShare[];
  cumulativePay: Coin[];
  currentRemainder: Coin[];
  canDeauthorise: boolean;
  authorised: boolean;
  discountId: string;
}

/** Subscription specifies details of a payment to be effected periodically. */
export interface Subscription {
  id: string;
  paymentContractId: string;
  periodsSoFar: string;
  maxPeriods: string;
  periodsAccumulated: string;
  period?: Any;
}

/**
 * BlockPeriod implements the Period interface and specifies a period in terms of number
 * of blocks.
 */
export interface BlockPeriod {
  periodLength: Long;
  periodStartBlock: Long;
}

/** TimePeriod implements the Period interface and specifies a period in terms of time. */
export interface TimePeriod {
  periodDurationNs?: Duration;
  periodStartTime?: Date;
}

/**
 * TestPeriod implements the Period interface and is identical to BlockPeriod, except it
 * ignores the context in periodEnded() and periodStarted().
 */
export interface TestPeriod {
  periodLength: Long;
  periodStartBlock: Long;
}

function createBasePaymentTemplate(): PaymentTemplate {
  return { id: "", paymentAmount: [], paymentMinimum: [], paymentMaximum: [], discounts: [] };
}

export const PaymentTemplate = {
  encode(message: PaymentTemplate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.paymentAmount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.paymentMinimum) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.paymentMaximum) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.discounts) {
      Discount.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentTemplate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentTemplate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.paymentAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.paymentMinimum.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.paymentMaximum.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.discounts.push(Discount.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentTemplate {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      paymentAmount: Array.isArray(object?.paymentAmount) ? object.paymentAmount.map((e: any) => Coin.fromJSON(e)) : [],
      paymentMinimum: Array.isArray(object?.paymentMinimum)
        ? object.paymentMinimum.map((e: any) => Coin.fromJSON(e))
        : [],
      paymentMaximum: Array.isArray(object?.paymentMaximum)
        ? object.paymentMaximum.map((e: any) => Coin.fromJSON(e))
        : [],
      discounts: Array.isArray(object?.discounts) ? object.discounts.map((e: any) => Discount.fromJSON(e)) : [],
    };
  },

  toJSON(message: PaymentTemplate): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.paymentAmount) {
      obj.paymentAmount = message.paymentAmount.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.paymentAmount = [];
    }
    if (message.paymentMinimum) {
      obj.paymentMinimum = message.paymentMinimum.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.paymentMinimum = [];
    }
    if (message.paymentMaximum) {
      obj.paymentMaximum = message.paymentMaximum.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.paymentMaximum = [];
    }
    if (message.discounts) {
      obj.discounts = message.discounts.map((e) => e ? Discount.toJSON(e) : undefined);
    } else {
      obj.discounts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentTemplate>, I>>(object: I): PaymentTemplate {
    const message = createBasePaymentTemplate();
    message.id = object.id ?? "";
    message.paymentAmount = object.paymentAmount?.map((e) => Coin.fromPartial(e)) || [];
    message.paymentMinimum = object.paymentMinimum?.map((e) => Coin.fromPartial(e)) || [];
    message.paymentMaximum = object.paymentMaximum?.map((e) => Coin.fromPartial(e)) || [];
    message.discounts = object.discounts?.map((e) => Discount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDiscount(): Discount {
  return { id: "", percent: "" };
}

export const Discount = {
  encode(message: Discount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.percent !== "") {
      writer.uint32(18).string(message.percent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Discount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDiscount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.percent = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Discount {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      percent: isSet(object.percent) ? String(object.percent) : "",
    };
  },

  toJSON(message: Discount): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.percent !== undefined && (obj.percent = message.percent);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Discount>, I>>(object: I): Discount {
    const message = createBaseDiscount();
    message.id = object.id ?? "";
    message.percent = object.percent ?? "";
    return message;
  },
};

function createBaseDistributionShare(): DistributionShare {
  return { address: "", percentage: "" };
}

export const DistributionShare = {
  encode(message: DistributionShare, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.percentage !== "") {
      writer.uint32(18).string(message.percentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributionShare {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionShare();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.percentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistributionShare {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      percentage: isSet(object.percentage) ? String(object.percentage) : "",
    };
  },

  toJSON(message: DistributionShare): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.percentage !== undefined && (obj.percentage = message.percentage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistributionShare>, I>>(object: I): DistributionShare {
    const message = createBaseDistributionShare();
    message.address = object.address ?? "";
    message.percentage = object.percentage ?? "";
    return message;
  },
};

function createBasePaymentContract(): PaymentContract {
  return {
    id: "",
    paymentTemplateId: "",
    creator: "",
    payer: "",
    recipients: [],
    cumulativePay: [],
    currentRemainder: [],
    canDeauthorise: false,
    authorised: false,
    discountId: "",
  };
}

export const PaymentContract = {
  encode(message: PaymentContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.paymentTemplateId !== "") {
      writer.uint32(18).string(message.paymentTemplateId);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.payer !== "") {
      writer.uint32(34).string(message.payer);
    }
    for (const v of message.recipients) {
      DistributionShare.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.cumulativePay) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.currentRemainder) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.canDeauthorise === true) {
      writer.uint32(64).bool(message.canDeauthorise);
    }
    if (message.authorised === true) {
      writer.uint32(72).bool(message.authorised);
    }
    if (message.discountId !== "") {
      writer.uint32(82).string(message.discountId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.paymentTemplateId = reader.string();
          break;
        case 3:
          message.creator = reader.string();
          break;
        case 4:
          message.payer = reader.string();
          break;
        case 5:
          message.recipients.push(DistributionShare.decode(reader, reader.uint32()));
          break;
        case 6:
          message.cumulativePay.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.currentRemainder.push(Coin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.canDeauthorise = reader.bool();
          break;
        case 9:
          message.authorised = reader.bool();
          break;
        case 10:
          message.discountId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentContract {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      paymentTemplateId: isSet(object.paymentTemplateId) ? String(object.paymentTemplateId) : "",
      creator: isSet(object.creator) ? String(object.creator) : "",
      payer: isSet(object.payer) ? String(object.payer) : "",
      recipients: Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => DistributionShare.fromJSON(e))
        : [],
      cumulativePay: Array.isArray(object?.cumulativePay) ? object.cumulativePay.map((e: any) => Coin.fromJSON(e)) : [],
      currentRemainder: Array.isArray(object?.currentRemainder)
        ? object.currentRemainder.map((e: any) => Coin.fromJSON(e))
        : [],
      canDeauthorise: isSet(object.canDeauthorise) ? Boolean(object.canDeauthorise) : false,
      authorised: isSet(object.authorised) ? Boolean(object.authorised) : false,
      discountId: isSet(object.discountId) ? String(object.discountId) : "",
    };
  },

  toJSON(message: PaymentContract): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.paymentTemplateId !== undefined && (obj.paymentTemplateId = message.paymentTemplateId);
    message.creator !== undefined && (obj.creator = message.creator);
    message.payer !== undefined && (obj.payer = message.payer);
    if (message.recipients) {
      obj.recipients = message.recipients.map((e) => e ? DistributionShare.toJSON(e) : undefined);
    } else {
      obj.recipients = [];
    }
    if (message.cumulativePay) {
      obj.cumulativePay = message.cumulativePay.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.cumulativePay = [];
    }
    if (message.currentRemainder) {
      obj.currentRemainder = message.currentRemainder.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.currentRemainder = [];
    }
    message.canDeauthorise !== undefined && (obj.canDeauthorise = message.canDeauthorise);
    message.authorised !== undefined && (obj.authorised = message.authorised);
    message.discountId !== undefined && (obj.discountId = message.discountId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentContract>, I>>(object: I): PaymentContract {
    const message = createBasePaymentContract();
    message.id = object.id ?? "";
    message.paymentTemplateId = object.paymentTemplateId ?? "";
    message.creator = object.creator ?? "";
    message.payer = object.payer ?? "";
    message.recipients = object.recipients?.map((e) => DistributionShare.fromPartial(e)) || [];
    message.cumulativePay = object.cumulativePay?.map((e) => Coin.fromPartial(e)) || [];
    message.currentRemainder = object.currentRemainder?.map((e) => Coin.fromPartial(e)) || [];
    message.canDeauthorise = object.canDeauthorise ?? false;
    message.authorised = object.authorised ?? false;
    message.discountId = object.discountId ?? "";
    return message;
  },
};

function createBaseSubscription(): Subscription {
  return { id: "", paymentContractId: "", periodsSoFar: "", maxPeriods: "", periodsAccumulated: "", period: undefined };
}

export const Subscription = {
  encode(message: Subscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.paymentContractId !== "") {
      writer.uint32(18).string(message.paymentContractId);
    }
    if (message.periodsSoFar !== "") {
      writer.uint32(26).string(message.periodsSoFar);
    }
    if (message.maxPeriods !== "") {
      writer.uint32(34).string(message.maxPeriods);
    }
    if (message.periodsAccumulated !== "") {
      writer.uint32(42).string(message.periodsAccumulated);
    }
    if (message.period !== undefined) {
      Any.encode(message.period, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Subscription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.paymentContractId = reader.string();
          break;
        case 3:
          message.periodsSoFar = reader.string();
          break;
        case 4:
          message.maxPeriods = reader.string();
          break;
        case 5:
          message.periodsAccumulated = reader.string();
          break;
        case 6:
          message.period = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Subscription {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      paymentContractId: isSet(object.paymentContractId) ? String(object.paymentContractId) : "",
      periodsSoFar: isSet(object.periodsSoFar) ? String(object.periodsSoFar) : "",
      maxPeriods: isSet(object.maxPeriods) ? String(object.maxPeriods) : "",
      periodsAccumulated: isSet(object.periodsAccumulated) ? String(object.periodsAccumulated) : "",
      period: isSet(object.period) ? Any.fromJSON(object.period) : undefined,
    };
  },

  toJSON(message: Subscription): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.paymentContractId !== undefined && (obj.paymentContractId = message.paymentContractId);
    message.periodsSoFar !== undefined && (obj.periodsSoFar = message.periodsSoFar);
    message.maxPeriods !== undefined && (obj.maxPeriods = message.maxPeriods);
    message.periodsAccumulated !== undefined && (obj.periodsAccumulated = message.periodsAccumulated);
    message.period !== undefined && (obj.period = message.period ? Any.toJSON(message.period) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Subscription>, I>>(object: I): Subscription {
    const message = createBaseSubscription();
    message.id = object.id ?? "";
    message.paymentContractId = object.paymentContractId ?? "";
    message.periodsSoFar = object.periodsSoFar ?? "";
    message.maxPeriods = object.maxPeriods ?? "";
    message.periodsAccumulated = object.periodsAccumulated ?? "";
    message.period = (object.period !== undefined && object.period !== null)
      ? Any.fromPartial(object.period)
      : undefined;
    return message;
  },
};

function createBaseBlockPeriod(): BlockPeriod {
  return { periodLength: Long.ZERO, periodStartBlock: Long.ZERO };
}

export const BlockPeriod = {
  encode(message: BlockPeriod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.periodLength.isZero()) {
      writer.uint32(8).int64(message.periodLength);
    }
    if (!message.periodStartBlock.isZero()) {
      writer.uint32(16).int64(message.periodStartBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockPeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockPeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.periodLength = reader.int64() as Long;
          break;
        case 2:
          message.periodStartBlock = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockPeriod {
    return {
      periodLength: isSet(object.periodLength) ? Long.fromValue(object.periodLength) : Long.ZERO,
      periodStartBlock: isSet(object.periodStartBlock) ? Long.fromValue(object.periodStartBlock) : Long.ZERO,
    };
  },

  toJSON(message: BlockPeriod): unknown {
    const obj: any = {};
    message.periodLength !== undefined && (obj.periodLength = (message.periodLength || Long.ZERO).toString());
    message.periodStartBlock !== undefined &&
      (obj.periodStartBlock = (message.periodStartBlock || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockPeriod>, I>>(object: I): BlockPeriod {
    const message = createBaseBlockPeriod();
    message.periodLength = (object.periodLength !== undefined && object.periodLength !== null)
      ? Long.fromValue(object.periodLength)
      : Long.ZERO;
    message.periodStartBlock = (object.periodStartBlock !== undefined && object.periodStartBlock !== null)
      ? Long.fromValue(object.periodStartBlock)
      : Long.ZERO;
    return message;
  },
};

function createBaseTimePeriod(): TimePeriod {
  return { periodDurationNs: undefined, periodStartTime: undefined };
}

export const TimePeriod = {
  encode(message: TimePeriod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.periodDurationNs !== undefined) {
      Duration.encode(message.periodDurationNs, writer.uint32(10).fork()).ldelim();
    }
    if (message.periodStartTime !== undefined) {
      Timestamp.encode(toTimestamp(message.periodStartTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimePeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimePeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.periodDurationNs = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.periodStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimePeriod {
    return {
      periodDurationNs: isSet(object.periodDurationNs) ? Duration.fromJSON(object.periodDurationNs) : undefined,
      periodStartTime: isSet(object.periodStartTime) ? fromJsonTimestamp(object.periodStartTime) : undefined,
    };
  },

  toJSON(message: TimePeriod): unknown {
    const obj: any = {};
    message.periodDurationNs !== undefined &&
      (obj.periodDurationNs = message.periodDurationNs ? Duration.toJSON(message.periodDurationNs) : undefined);
    message.periodStartTime !== undefined && (obj.periodStartTime = message.periodStartTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimePeriod>, I>>(object: I): TimePeriod {
    const message = createBaseTimePeriod();
    message.periodDurationNs = (object.periodDurationNs !== undefined && object.periodDurationNs !== null)
      ? Duration.fromPartial(object.periodDurationNs)
      : undefined;
    message.periodStartTime = object.periodStartTime ?? undefined;
    return message;
  },
};

function createBaseTestPeriod(): TestPeriod {
  return { periodLength: Long.ZERO, periodStartBlock: Long.ZERO };
}

export const TestPeriod = {
  encode(message: TestPeriod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.periodLength.isZero()) {
      writer.uint32(8).int64(message.periodLength);
    }
    if (!message.periodStartBlock.isZero()) {
      writer.uint32(16).int64(message.periodStartBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TestPeriod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestPeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.periodLength = reader.int64() as Long;
          break;
        case 2:
          message.periodStartBlock = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TestPeriod {
    return {
      periodLength: isSet(object.periodLength) ? Long.fromValue(object.periodLength) : Long.ZERO,
      periodStartBlock: isSet(object.periodStartBlock) ? Long.fromValue(object.periodStartBlock) : Long.ZERO,
    };
  },

  toJSON(message: TestPeriod): unknown {
    const obj: any = {};
    message.periodLength !== undefined && (obj.periodLength = (message.periodLength || Long.ZERO).toString());
    message.periodStartBlock !== undefined &&
      (obj.periodStartBlock = (message.periodStartBlock || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TestPeriod>, I>>(object: I): TestPeriod {
    const message = createBaseTestPeriod();
    message.periodLength = (object.periodLength !== undefined && object.periodLength !== null)
      ? Long.fromValue(object.periodLength)
      : Long.ZERO;
    message.periodStartBlock = (object.periodStartBlock !== undefined && object.periodStartBlock !== null)
      ? Long.fromValue(object.periodStartBlock)
      : Long.ZERO;
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
