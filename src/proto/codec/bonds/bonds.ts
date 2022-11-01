/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin, DecCoin } from "../cosmos/coin";

export const protobufPackage = "bonds";

/** FunctionParam is a key-value pair used for specifying a specific bond parameter. */
export interface FunctionParam {
  param: string;
  value: string;
}

/** BondDetails contains details about the current state of a given bond. */
export interface BondDetails {
  bondDid: string;
  spotPrice: DecCoin[];
  supply?: Coin;
  reserve: Coin[];
}

/** Bond defines a token bonding curve type with all of its parameters. */
export interface Bond {
  token: string;
  name: string;
  description: string;
  creatorDid: string;
  controllerDid: string;
  functionType: string;
  functionParameters: FunctionParam[];
  reserveTokens: string[];
  txFeePercentage: string;
  exitFeePercentage: string;
  feeAddress: string;
  reserveWithdrawalAddress: string;
  maxSupply?: Coin;
  orderQuantityLimits: Coin[];
  sanityRate: string;
  sanityMarginPercentage: string;
  currentSupply?: Coin;
  currentReserve: Coin[];
  availableReserve: Coin[];
  currentOutcomePaymentReserve: Coin[];
  allowSells: boolean;
  allowReserveWithdrawals: boolean;
  alphaBond: boolean;
  batchBlocks: string;
  outcomePayment: string;
  state: string;
  bondDid: string;
}

/**
 * BaseOrder defines a base order type. It contains all the necessary fields for specifying
 * the general details about a buy, sell, or swap order.
 */
export interface BaseOrder {
  accountDid: string;
  amount?: Coin;
  cancelled: boolean;
  cancelReason: string;
}

/**
 * BuyOrder defines a type for submitting a buy order on a bond, together with the maximum
 * amount of reserve tokens the buyer is willing to pay.
 */
export interface BuyOrder {
  baseOrder?: BaseOrder;
  maxPrices: Coin[];
}

/** SellOrder defines a type for submitting a sell order on a bond. */
export interface SellOrder {
  baseOrder?: BaseOrder;
}

/** SwapOrder defines a type for submitting a swap order between two tokens on a bond. */
export interface SwapOrder {
  baseOrder?: BaseOrder;
  toToken: string;
}

/** Batch holds a collection of outstanding buy, sell, and swap orders on a particular bond. */
export interface Batch {
  bondDid: string;
  blocksRemaining: string;
  nextPublicAlpha: string;
  totalBuyAmount?: Coin;
  totalSellAmount?: Coin;
  buyPrices: DecCoin[];
  sellPrices: DecCoin[];
  buys: BuyOrder[];
  sells: SellOrder[];
  swaps: SwapOrder[];
}

/** Params defines the parameters for the bonds module. */
export interface Params {
  reservedBondTokens: string[];
}

function createBaseFunctionParam(): FunctionParam {
  return { param: "", value: "" };
}

export const FunctionParam = {
  encode(message: FunctionParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.param !== "") {
      writer.uint32(10).string(message.param);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FunctionParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFunctionParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.param = reader.string();
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

  fromJSON(object: any): FunctionParam {
    return {
      param: isSet(object.param) ? String(object.param) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: FunctionParam): unknown {
    const obj: any = {};
    message.param !== undefined && (obj.param = message.param);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FunctionParam>, I>>(object: I): FunctionParam {
    const message = createBaseFunctionParam();
    message.param = object.param ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseBondDetails(): BondDetails {
  return { bondDid: "", spotPrice: [], supply: undefined, reserve: [] };
}

export const BondDetails = {
  encode(message: BondDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bondDid !== "") {
      writer.uint32(10).string(message.bondDid);
    }
    for (const v of message.spotPrice) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.supply !== undefined) {
      Coin.encode(message.supply, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.reserve) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BondDetails {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBondDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondDid = reader.string();
          break;
        case 2:
          message.spotPrice.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.supply = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.reserve.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BondDetails {
    return {
      bondDid: isSet(object.bondDid) ? String(object.bondDid) : "",
      spotPrice: Array.isArray(object?.spotPrice) ? object.spotPrice.map((e: any) => DecCoin.fromJSON(e)) : [],
      supply: isSet(object.supply) ? Coin.fromJSON(object.supply) : undefined,
      reserve: Array.isArray(object?.reserve) ? object.reserve.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: BondDetails): unknown {
    const obj: any = {};
    message.bondDid !== undefined && (obj.bondDid = message.bondDid);
    if (message.spotPrice) {
      obj.spotPrice = message.spotPrice.map((e) => e ? DecCoin.toJSON(e) : undefined);
    } else {
      obj.spotPrice = [];
    }
    message.supply !== undefined && (obj.supply = message.supply ? Coin.toJSON(message.supply) : undefined);
    if (message.reserve) {
      obj.reserve = message.reserve.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.reserve = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BondDetails>, I>>(object: I): BondDetails {
    const message = createBaseBondDetails();
    message.bondDid = object.bondDid ?? "";
    message.spotPrice = object.spotPrice?.map((e) => DecCoin.fromPartial(e)) || [];
    message.supply = (object.supply !== undefined && object.supply !== null)
      ? Coin.fromPartial(object.supply)
      : undefined;
    message.reserve = object.reserve?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBond(): Bond {
  return {
    token: "",
    name: "",
    description: "",
    creatorDid: "",
    controllerDid: "",
    functionType: "",
    functionParameters: [],
    reserveTokens: [],
    txFeePercentage: "",
    exitFeePercentage: "",
    feeAddress: "",
    reserveWithdrawalAddress: "",
    maxSupply: undefined,
    orderQuantityLimits: [],
    sanityRate: "",
    sanityMarginPercentage: "",
    currentSupply: undefined,
    currentReserve: [],
    availableReserve: [],
    currentOutcomePaymentReserve: [],
    allowSells: false,
    allowReserveWithdrawals: false,
    alphaBond: false,
    batchBlocks: "",
    outcomePayment: "",
    state: "",
    bondDid: "",
  };
}

export const Bond = {
  encode(message: Bond, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.creatorDid !== "") {
      writer.uint32(34).string(message.creatorDid);
    }
    if (message.controllerDid !== "") {
      writer.uint32(42).string(message.controllerDid);
    }
    if (message.functionType !== "") {
      writer.uint32(50).string(message.functionType);
    }
    for (const v of message.functionParameters) {
      FunctionParam.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.reserveTokens) {
      writer.uint32(66).string(v!);
    }
    if (message.txFeePercentage !== "") {
      writer.uint32(74).string(message.txFeePercentage);
    }
    if (message.exitFeePercentage !== "") {
      writer.uint32(82).string(message.exitFeePercentage);
    }
    if (message.feeAddress !== "") {
      writer.uint32(90).string(message.feeAddress);
    }
    if (message.reserveWithdrawalAddress !== "") {
      writer.uint32(98).string(message.reserveWithdrawalAddress);
    }
    if (message.maxSupply !== undefined) {
      Coin.encode(message.maxSupply, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.orderQuantityLimits) {
      Coin.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    if (message.sanityRate !== "") {
      writer.uint32(122).string(message.sanityRate);
    }
    if (message.sanityMarginPercentage !== "") {
      writer.uint32(130).string(message.sanityMarginPercentage);
    }
    if (message.currentSupply !== undefined) {
      Coin.encode(message.currentSupply, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.currentReserve) {
      Coin.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.availableReserve) {
      Coin.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    for (const v of message.currentOutcomePaymentReserve) {
      Coin.encode(v!, writer.uint32(162).fork()).ldelim();
    }
    if (message.allowSells === true) {
      writer.uint32(168).bool(message.allowSells);
    }
    if (message.allowReserveWithdrawals === true) {
      writer.uint32(176).bool(message.allowReserveWithdrawals);
    }
    if (message.alphaBond === true) {
      writer.uint32(184).bool(message.alphaBond);
    }
    if (message.batchBlocks !== "") {
      writer.uint32(194).string(message.batchBlocks);
    }
    if (message.outcomePayment !== "") {
      writer.uint32(202).string(message.outcomePayment);
    }
    if (message.state !== "") {
      writer.uint32(210).string(message.state);
    }
    if (message.bondDid !== "") {
      writer.uint32(218).string(message.bondDid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.creatorDid = reader.string();
          break;
        case 5:
          message.controllerDid = reader.string();
          break;
        case 6:
          message.functionType = reader.string();
          break;
        case 7:
          message.functionParameters.push(FunctionParam.decode(reader, reader.uint32()));
          break;
        case 8:
          message.reserveTokens.push(reader.string());
          break;
        case 9:
          message.txFeePercentage = reader.string();
          break;
        case 10:
          message.exitFeePercentage = reader.string();
          break;
        case 11:
          message.feeAddress = reader.string();
          break;
        case 12:
          message.reserveWithdrawalAddress = reader.string();
          break;
        case 13:
          message.maxSupply = Coin.decode(reader, reader.uint32());
          break;
        case 14:
          message.orderQuantityLimits.push(Coin.decode(reader, reader.uint32()));
          break;
        case 15:
          message.sanityRate = reader.string();
          break;
        case 16:
          message.sanityMarginPercentage = reader.string();
          break;
        case 17:
          message.currentSupply = Coin.decode(reader, reader.uint32());
          break;
        case 18:
          message.currentReserve.push(Coin.decode(reader, reader.uint32()));
          break;
        case 19:
          message.availableReserve.push(Coin.decode(reader, reader.uint32()));
          break;
        case 20:
          message.currentOutcomePaymentReserve.push(Coin.decode(reader, reader.uint32()));
          break;
        case 21:
          message.allowSells = reader.bool();
          break;
        case 22:
          message.allowReserveWithdrawals = reader.bool();
          break;
        case 23:
          message.alphaBond = reader.bool();
          break;
        case 24:
          message.batchBlocks = reader.string();
          break;
        case 25:
          message.outcomePayment = reader.string();
          break;
        case 26:
          message.state = reader.string();
          break;
        case 27:
          message.bondDid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bond {
    return {
      token: isSet(object.token) ? String(object.token) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      creatorDid: isSet(object.creatorDid) ? String(object.creatorDid) : "",
      controllerDid: isSet(object.controllerDid) ? String(object.controllerDid) : "",
      functionType: isSet(object.functionType) ? String(object.functionType) : "",
      functionParameters: Array.isArray(object?.functionParameters)
        ? object.functionParameters.map((e: any) => FunctionParam.fromJSON(e))
        : [],
      reserveTokens: Array.isArray(object?.reserveTokens) ? object.reserveTokens.map((e: any) => String(e)) : [],
      txFeePercentage: isSet(object.txFeePercentage) ? String(object.txFeePercentage) : "",
      exitFeePercentage: isSet(object.exitFeePercentage) ? String(object.exitFeePercentage) : "",
      feeAddress: isSet(object.feeAddress) ? String(object.feeAddress) : "",
      reserveWithdrawalAddress: isSet(object.reserveWithdrawalAddress) ? String(object.reserveWithdrawalAddress) : "",
      maxSupply: isSet(object.maxSupply) ? Coin.fromJSON(object.maxSupply) : undefined,
      orderQuantityLimits: Array.isArray(object?.orderQuantityLimits)
        ? object.orderQuantityLimits.map((e: any) => Coin.fromJSON(e))
        : [],
      sanityRate: isSet(object.sanityRate) ? String(object.sanityRate) : "",
      sanityMarginPercentage: isSet(object.sanityMarginPercentage) ? String(object.sanityMarginPercentage) : "",
      currentSupply: isSet(object.currentSupply) ? Coin.fromJSON(object.currentSupply) : undefined,
      currentReserve: Array.isArray(object?.currentReserve)
        ? object.currentReserve.map((e: any) => Coin.fromJSON(e))
        : [],
      availableReserve: Array.isArray(object?.availableReserve)
        ? object.availableReserve.map((e: any) => Coin.fromJSON(e))
        : [],
      currentOutcomePaymentReserve: Array.isArray(object?.currentOutcomePaymentReserve)
        ? object.currentOutcomePaymentReserve.map((e: any) => Coin.fromJSON(e))
        : [],
      allowSells: isSet(object.allowSells) ? Boolean(object.allowSells) : false,
      allowReserveWithdrawals: isSet(object.allowReserveWithdrawals) ? Boolean(object.allowReserveWithdrawals) : false,
      alphaBond: isSet(object.alphaBond) ? Boolean(object.alphaBond) : false,
      batchBlocks: isSet(object.batchBlocks) ? String(object.batchBlocks) : "",
      outcomePayment: isSet(object.outcomePayment) ? String(object.outcomePayment) : "",
      state: isSet(object.state) ? String(object.state) : "",
      bondDid: isSet(object.bondDid) ? String(object.bondDid) : "",
    };
  },

  toJSON(message: Bond): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.creatorDid !== undefined && (obj.creatorDid = message.creatorDid);
    message.controllerDid !== undefined && (obj.controllerDid = message.controllerDid);
    message.functionType !== undefined && (obj.functionType = message.functionType);
    if (message.functionParameters) {
      obj.functionParameters = message.functionParameters.map((e) => e ? FunctionParam.toJSON(e) : undefined);
    } else {
      obj.functionParameters = [];
    }
    if (message.reserveTokens) {
      obj.reserveTokens = message.reserveTokens.map((e) => e);
    } else {
      obj.reserveTokens = [];
    }
    message.txFeePercentage !== undefined && (obj.txFeePercentage = message.txFeePercentage);
    message.exitFeePercentage !== undefined && (obj.exitFeePercentage = message.exitFeePercentage);
    message.feeAddress !== undefined && (obj.feeAddress = message.feeAddress);
    message.reserveWithdrawalAddress !== undefined && (obj.reserveWithdrawalAddress = message.reserveWithdrawalAddress);
    message.maxSupply !== undefined && (obj.maxSupply = message.maxSupply ? Coin.toJSON(message.maxSupply) : undefined);
    if (message.orderQuantityLimits) {
      obj.orderQuantityLimits = message.orderQuantityLimits.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.orderQuantityLimits = [];
    }
    message.sanityRate !== undefined && (obj.sanityRate = message.sanityRate);
    message.sanityMarginPercentage !== undefined && (obj.sanityMarginPercentage = message.sanityMarginPercentage);
    message.currentSupply !== undefined &&
      (obj.currentSupply = message.currentSupply ? Coin.toJSON(message.currentSupply) : undefined);
    if (message.currentReserve) {
      obj.currentReserve = message.currentReserve.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.currentReserve = [];
    }
    if (message.availableReserve) {
      obj.availableReserve = message.availableReserve.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.availableReserve = [];
    }
    if (message.currentOutcomePaymentReserve) {
      obj.currentOutcomePaymentReserve = message.currentOutcomePaymentReserve.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.currentOutcomePaymentReserve = [];
    }
    message.allowSells !== undefined && (obj.allowSells = message.allowSells);
    message.allowReserveWithdrawals !== undefined && (obj.allowReserveWithdrawals = message.allowReserveWithdrawals);
    message.alphaBond !== undefined && (obj.alphaBond = message.alphaBond);
    message.batchBlocks !== undefined && (obj.batchBlocks = message.batchBlocks);
    message.outcomePayment !== undefined && (obj.outcomePayment = message.outcomePayment);
    message.state !== undefined && (obj.state = message.state);
    message.bondDid !== undefined && (obj.bondDid = message.bondDid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bond>, I>>(object: I): Bond {
    const message = createBaseBond();
    message.token = object.token ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.creatorDid = object.creatorDid ?? "";
    message.controllerDid = object.controllerDid ?? "";
    message.functionType = object.functionType ?? "";
    message.functionParameters = object.functionParameters?.map((e) => FunctionParam.fromPartial(e)) || [];
    message.reserveTokens = object.reserveTokens?.map((e) => e) || [];
    message.txFeePercentage = object.txFeePercentage ?? "";
    message.exitFeePercentage = object.exitFeePercentage ?? "";
    message.feeAddress = object.feeAddress ?? "";
    message.reserveWithdrawalAddress = object.reserveWithdrawalAddress ?? "";
    message.maxSupply = (object.maxSupply !== undefined && object.maxSupply !== null)
      ? Coin.fromPartial(object.maxSupply)
      : undefined;
    message.orderQuantityLimits = object.orderQuantityLimits?.map((e) => Coin.fromPartial(e)) || [];
    message.sanityRate = object.sanityRate ?? "";
    message.sanityMarginPercentage = object.sanityMarginPercentage ?? "";
    message.currentSupply = (object.currentSupply !== undefined && object.currentSupply !== null)
      ? Coin.fromPartial(object.currentSupply)
      : undefined;
    message.currentReserve = object.currentReserve?.map((e) => Coin.fromPartial(e)) || [];
    message.availableReserve = object.availableReserve?.map((e) => Coin.fromPartial(e)) || [];
    message.currentOutcomePaymentReserve = object.currentOutcomePaymentReserve?.map((e) => Coin.fromPartial(e)) || [];
    message.allowSells = object.allowSells ?? false;
    message.allowReserveWithdrawals = object.allowReserveWithdrawals ?? false;
    message.alphaBond = object.alphaBond ?? false;
    message.batchBlocks = object.batchBlocks ?? "";
    message.outcomePayment = object.outcomePayment ?? "";
    message.state = object.state ?? "";
    message.bondDid = object.bondDid ?? "";
    return message;
  },
};

function createBaseBaseOrder(): BaseOrder {
  return { accountDid: "", amount: undefined, cancelled: false, cancelReason: "" };
}

export const BaseOrder = {
  encode(message: BaseOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountDid !== "") {
      writer.uint32(10).string(message.accountDid);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.cancelled === true) {
      writer.uint32(24).bool(message.cancelled);
    }
    if (message.cancelReason !== "") {
      writer.uint32(34).string(message.cancelReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountDid = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.cancelled = reader.bool();
          break;
        case 4:
          message.cancelReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseOrder {
    return {
      accountDid: isSet(object.accountDid) ? String(object.accountDid) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      cancelled: isSet(object.cancelled) ? Boolean(object.cancelled) : false,
      cancelReason: isSet(object.cancelReason) ? String(object.cancelReason) : "",
    };
  },

  toJSON(message: BaseOrder): unknown {
    const obj: any = {};
    message.accountDid !== undefined && (obj.accountDid = message.accountDid);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.cancelled !== undefined && (obj.cancelled = message.cancelled);
    message.cancelReason !== undefined && (obj.cancelReason = message.cancelReason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseOrder>, I>>(object: I): BaseOrder {
    const message = createBaseBaseOrder();
    message.accountDid = object.accountDid ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.cancelled = object.cancelled ?? false;
    message.cancelReason = object.cancelReason ?? "";
    return message;
  },
};

function createBaseBuyOrder(): BuyOrder {
  return { baseOrder: undefined, maxPrices: [] };
}

export const BuyOrder = {
  encode(message: BuyOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseOrder !== undefined) {
      BaseOrder.encode(message.baseOrder, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.maxPrices) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuyOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseOrder = BaseOrder.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxPrices.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BuyOrder {
    return {
      baseOrder: isSet(object.baseOrder) ? BaseOrder.fromJSON(object.baseOrder) : undefined,
      maxPrices: Array.isArray(object?.maxPrices) ? object.maxPrices.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: BuyOrder): unknown {
    const obj: any = {};
    message.baseOrder !== undefined &&
      (obj.baseOrder = message.baseOrder ? BaseOrder.toJSON(message.baseOrder) : undefined);
    if (message.maxPrices) {
      obj.maxPrices = message.maxPrices.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.maxPrices = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BuyOrder>, I>>(object: I): BuyOrder {
    const message = createBaseBuyOrder();
    message.baseOrder = (object.baseOrder !== undefined && object.baseOrder !== null)
      ? BaseOrder.fromPartial(object.baseOrder)
      : undefined;
    message.maxPrices = object.maxPrices?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSellOrder(): SellOrder {
  return { baseOrder: undefined };
}

export const SellOrder = {
  encode(message: SellOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseOrder !== undefined) {
      BaseOrder.encode(message.baseOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SellOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseOrder = BaseOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SellOrder {
    return { baseOrder: isSet(object.baseOrder) ? BaseOrder.fromJSON(object.baseOrder) : undefined };
  },

  toJSON(message: SellOrder): unknown {
    const obj: any = {};
    message.baseOrder !== undefined &&
      (obj.baseOrder = message.baseOrder ? BaseOrder.toJSON(message.baseOrder) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SellOrder>, I>>(object: I): SellOrder {
    const message = createBaseSellOrder();
    message.baseOrder = (object.baseOrder !== undefined && object.baseOrder !== null)
      ? BaseOrder.fromPartial(object.baseOrder)
      : undefined;
    return message;
  },
};

function createBaseSwapOrder(): SwapOrder {
  return { baseOrder: undefined, toToken: "" };
}

export const SwapOrder = {
  encode(message: SwapOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseOrder !== undefined) {
      BaseOrder.encode(message.baseOrder, writer.uint32(10).fork()).ldelim();
    }
    if (message.toToken !== "") {
      writer.uint32(18).string(message.toToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseOrder = BaseOrder.decode(reader, reader.uint32());
          break;
        case 2:
          message.toToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SwapOrder {
    return {
      baseOrder: isSet(object.baseOrder) ? BaseOrder.fromJSON(object.baseOrder) : undefined,
      toToken: isSet(object.toToken) ? String(object.toToken) : "",
    };
  },

  toJSON(message: SwapOrder): unknown {
    const obj: any = {};
    message.baseOrder !== undefined &&
      (obj.baseOrder = message.baseOrder ? BaseOrder.toJSON(message.baseOrder) : undefined);
    message.toToken !== undefined && (obj.toToken = message.toToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SwapOrder>, I>>(object: I): SwapOrder {
    const message = createBaseSwapOrder();
    message.baseOrder = (object.baseOrder !== undefined && object.baseOrder !== null)
      ? BaseOrder.fromPartial(object.baseOrder)
      : undefined;
    message.toToken = object.toToken ?? "";
    return message;
  },
};

function createBaseBatch(): Batch {
  return {
    bondDid: "",
    blocksRemaining: "",
    nextPublicAlpha: "",
    totalBuyAmount: undefined,
    totalSellAmount: undefined,
    buyPrices: [],
    sellPrices: [],
    buys: [],
    sells: [],
    swaps: [],
  };
}

export const Batch = {
  encode(message: Batch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bondDid !== "") {
      writer.uint32(10).string(message.bondDid);
    }
    if (message.blocksRemaining !== "") {
      writer.uint32(18).string(message.blocksRemaining);
    }
    if (message.nextPublicAlpha !== "") {
      writer.uint32(26).string(message.nextPublicAlpha);
    }
    if (message.totalBuyAmount !== undefined) {
      Coin.encode(message.totalBuyAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.totalSellAmount !== undefined) {
      Coin.encode(message.totalSellAmount, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.buyPrices) {
      DecCoin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.sellPrices) {
      DecCoin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.buys) {
      BuyOrder.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.sells) {
      SellOrder.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.swaps) {
      SwapOrder.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Batch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondDid = reader.string();
          break;
        case 2:
          message.blocksRemaining = reader.string();
          break;
        case 3:
          message.nextPublicAlpha = reader.string();
          break;
        case 4:
          message.totalBuyAmount = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.totalSellAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.buyPrices.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.sellPrices.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.buys.push(BuyOrder.decode(reader, reader.uint32()));
          break;
        case 9:
          message.sells.push(SellOrder.decode(reader, reader.uint32()));
          break;
        case 10:
          message.swaps.push(SwapOrder.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Batch {
    return {
      bondDid: isSet(object.bondDid) ? String(object.bondDid) : "",
      blocksRemaining: isSet(object.blocksRemaining) ? String(object.blocksRemaining) : "",
      nextPublicAlpha: isSet(object.nextPublicAlpha) ? String(object.nextPublicAlpha) : "",
      totalBuyAmount: isSet(object.totalBuyAmount) ? Coin.fromJSON(object.totalBuyAmount) : undefined,
      totalSellAmount: isSet(object.totalSellAmount) ? Coin.fromJSON(object.totalSellAmount) : undefined,
      buyPrices: Array.isArray(object?.buyPrices) ? object.buyPrices.map((e: any) => DecCoin.fromJSON(e)) : [],
      sellPrices: Array.isArray(object?.sellPrices) ? object.sellPrices.map((e: any) => DecCoin.fromJSON(e)) : [],
      buys: Array.isArray(object?.buys) ? object.buys.map((e: any) => BuyOrder.fromJSON(e)) : [],
      sells: Array.isArray(object?.sells) ? object.sells.map((e: any) => SellOrder.fromJSON(e)) : [],
      swaps: Array.isArray(object?.swaps) ? object.swaps.map((e: any) => SwapOrder.fromJSON(e)) : [],
    };
  },

  toJSON(message: Batch): unknown {
    const obj: any = {};
    message.bondDid !== undefined && (obj.bondDid = message.bondDid);
    message.blocksRemaining !== undefined && (obj.blocksRemaining = message.blocksRemaining);
    message.nextPublicAlpha !== undefined && (obj.nextPublicAlpha = message.nextPublicAlpha);
    message.totalBuyAmount !== undefined &&
      (obj.totalBuyAmount = message.totalBuyAmount ? Coin.toJSON(message.totalBuyAmount) : undefined);
    message.totalSellAmount !== undefined &&
      (obj.totalSellAmount = message.totalSellAmount ? Coin.toJSON(message.totalSellAmount) : undefined);
    if (message.buyPrices) {
      obj.buyPrices = message.buyPrices.map((e) => e ? DecCoin.toJSON(e) : undefined);
    } else {
      obj.buyPrices = [];
    }
    if (message.sellPrices) {
      obj.sellPrices = message.sellPrices.map((e) => e ? DecCoin.toJSON(e) : undefined);
    } else {
      obj.sellPrices = [];
    }
    if (message.buys) {
      obj.buys = message.buys.map((e) => e ? BuyOrder.toJSON(e) : undefined);
    } else {
      obj.buys = [];
    }
    if (message.sells) {
      obj.sells = message.sells.map((e) => e ? SellOrder.toJSON(e) : undefined);
    } else {
      obj.sells = [];
    }
    if (message.swaps) {
      obj.swaps = message.swaps.map((e) => e ? SwapOrder.toJSON(e) : undefined);
    } else {
      obj.swaps = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Batch>, I>>(object: I): Batch {
    const message = createBaseBatch();
    message.bondDid = object.bondDid ?? "";
    message.blocksRemaining = object.blocksRemaining ?? "";
    message.nextPublicAlpha = object.nextPublicAlpha ?? "";
    message.totalBuyAmount = (object.totalBuyAmount !== undefined && object.totalBuyAmount !== null)
      ? Coin.fromPartial(object.totalBuyAmount)
      : undefined;
    message.totalSellAmount = (object.totalSellAmount !== undefined && object.totalSellAmount !== null)
      ? Coin.fromPartial(object.totalSellAmount)
      : undefined;
    message.buyPrices = object.buyPrices?.map((e) => DecCoin.fromPartial(e)) || [];
    message.sellPrices = object.sellPrices?.map((e) => DecCoin.fromPartial(e)) || [];
    message.buys = object.buys?.map((e) => BuyOrder.fromPartial(e)) || [];
    message.sells = object.sells?.map((e) => SellOrder.fromPartial(e)) || [];
    message.swaps = object.swaps?.map((e) => SwapOrder.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return { reservedBondTokens: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.reservedBondTokens) {
      writer.uint32(10).string(v!);
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
          message.reservedBondTokens.push(reader.string());
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
      reservedBondTokens: Array.isArray(object?.reservedBondTokens)
        ? object.reservedBondTokens.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.reservedBondTokens) {
      obj.reservedBondTokens = message.reservedBondTokens.map((e) => e);
    } else {
      obj.reservedBondTokens = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.reservedBondTokens = object.reservedBondTokens?.map((e) => e) || [];
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
