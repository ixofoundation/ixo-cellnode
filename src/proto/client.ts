/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import {
  serializeSignDoc,
  coins,
  Secp256k1HdWallet,
  Secp256k1Wallet,
} from "@cosmjs/amino";
import { sortedJsonStringify } from "@cosmjs/amino/build/signdoc";
import {
  EnglishMnemonic,
  pathToString,
  sha256,
  stringToPath,
} from "@cosmjs/crypto";
import { fromBase64, toBase64, Bech32 } from "@cosmjs/encoding";
import { create } from "apisauce";
import base58 from "bs58";
import memoize from "lodash.memoize";
import nacl from "tweetnacl";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sovrin = require("sovrin-did");

const defaultCellnodeUrl = "https://cellnode-pandora.ixo.earth";
const defaultBlockScan = "https://blockscan-pandora.ixo.earth";
const GlobalBlockchainUrl =
  process.env.BLOCKCHAINURL != null
    ? process.env.BLOCKCHAINURL
    : "https://testnet.ixo.world/rest";
const GlobalBlocksyncUrl =
  process.env.BLOCKSYNCURL != null
    ? process.env.BLOCKSYNCURL
    : "https://blocksync-pandora.ixo.earth";

let GlobaldashifyUrls =
  process.env.GlobaldashifyUrls != null ? process.env.GlobaldashifyUrls : false;

let GlobalSigner: any = null;

// GLOBAL API HANDLERS
const blockChainFetchAPI = create({
  baseURL: GlobalBlockchainUrl,
  headers: { Accept: "application/json" },
});
const cnFetchAPI = create({
  baseURL: defaultCellnodeUrl,
  headers: { Accept: "application/json" },
});
const blockSyncFetchAPI = create({
  baseURL: GlobalBlocksyncUrl,
  headers: { Accept: "application/json" },
});
const tempAPI = create({
  baseURL: "https://blocksync-pandora.ixo.world",
  headers: { Accept: "application/json" },
});
const blockScanFetchAPI = create({
  baseURL: defaultBlockScan,
  headers: { Accept: "application/json" },
});

const getEntity = (did: string) =>
  bsFetchGet("/api/project/getByProjectDid/" + did);

export function makeClient(
  signer: any,
  blockchainUrl?: string,
  blocksyncUrl?: string,
  dashifyUrls = false
) {
  GlobalSigner = signer;

  blockchainUrl =
    blockchainUrl !== undefined && !null ? blockchainUrl : GlobalBlockchainUrl;
  blocksyncUrl =
    blocksyncUrl !== undefined && !null ? blocksyncUrl : GlobalBlocksyncUrl;
  GlobaldashifyUrls = dashifyUrls;

  blockChainFetchAPI.setBaseURL(blockchainUrl);
  blockSyncFetchAPI.setBaseURL(blocksyncUrl);

  if (signer) assertSignerIsValid(signer);

  const getSignerAccount = memoize((signerToUse: string | number) =>
    signer[signerToUse].getAccounts().then((as: any[]) => as[0])
  );
  const getNodeInfo = memoize(() =>
    bcFetchGet("/node_info").then((body: any) => body.node_info)
  );
  const sign = async (
    signerToUse: string,
    signDoc: {
      account_number: any;
      chain_id: any;
      fee: { amount: any; gas: string };
      memo: string;
      msgs: any[];
      sequence: any;
    }
  ) =>
    signer[signerToUse].signAmino(
      (await getSignerAccount(signerToUse)).address,
      signDoc
    );
  const signAndBroadcast = async (
    signerToUse: string,
    msg: {
      type: string;
      value:
        | { did: any; pubKey: any }
        | {
            amount: { amount: string; denom: string }[];
            from_address: any;
            to_address: any;
          }
        | {
            amount: { denom: string; amount: string };
            delegator_address: any;
            validator_address: any;
          }
        | {
            amount: { denom: string; amount: string };
            delegator_address: any;
            validator_address: any;
          }
        | {
            amount: { denom: string; amount: string };
            delegator_address: any;
            validator_src_address: any;
            validator_dst_address: any;
          }
        | {
            buyer_did: any;
            bond_did: any;
            amount: { amount: string; denom: any };
            max_prices: { amount: string; denom: any }[];
          }
        | {
            seller_did: any;
            bond_did: any;
            amount: { amount: string; denom: any };
          };
    },
    fee = { amount: coins(5000, "uixo"), gas: "200000" },
    memo = ""
  ) => {
    const { address } = await getSignerAccount(signerToUse);
    const {
      account: { account_number, sequence },
    } = await bcFetchGet("/cosmos/auth/v1beta1/accounts/" + address);
    const signDoc = {
      account_number,
      chain_id: (await getNodeInfo()).network,
      fee,
      memo,
      msgs: [msg],
      sequence,
    };
    const { signature } = await sign(signerToUse, signDoc);
    const txResp = await bcFetchPost("/txs", {
      method: "POST",
      body: {
        tx: {
          msg: [msg],
          fee,
          signatures: [
            {
              ...signature,
              account_number,
              sequence,
            },
          ],
        },
        mode: "sync",
      },
    });

    return txResp;
  };
  const listEntities = async (type: string) => {
    const ents = await bsFetchGet("/api/project/listProjects");

    if (!type) return ents;

    return ents.filter((e: any) => e.data["@type"] === type);
  };
  const getEntityHead = async (projRecOrDid: any): Promise<any> => {
    if (typeof projRecOrDid === "object") {
      const { projectDid } = projRecOrDid;
      let serviceEndpoint;
      try {
        serviceEndpoint = projRecOrDid.data.nodes.items
          .find((i: { [x: string]: string }) => i["@type"] === "CellNode")
          .serviceEndpoint.replace(/\/$/, "");

        if (GlobaldashifyUrls) serviceEndpoint = dashifyUrl(serviceEndpoint);
      } catch (e) {
        serviceEndpoint = defaultCellnodeUrl;
        /* throw new Error('Project doesn\'t have an associated Cell Node record!') */
      }

      return { projectDid, serviceEndpoint };
    }

    return getEntityHead(await getEntity(projRecOrDid));
  };
  const cnRpc = async (target: string, dataCb: any, fetchOpts?: any) => {
    if (!signer)
      throw new Error(
        "The client needs to be initialized with a wallet / signer in order for this method to be used"
      );

    const { projectDid, serviceEndpoint } =
      typeof target === "string" && target.startsWith("http")
        ? { projectDid: null, serviceEndpoint: target }
        : await getEntityHead(target);
    const {
      method,
      tplName,
      data,
      isPublic = false,
      then = (x: any) => x,
    } = dataCb(projectDid, defaultCellnodeUrl);
    const message = isPublic
      ? makePublicRpcMsg(method, data)
      : makeRpcMsg(method, tplName, data, {
          type: (await getSignerAccount("agent")).algo,
          created: new Date().toISOString(),
          creator: signer.agent.did,
          signatureValue: (await sign("agent", data)).signature.signature,
        });
    const path = isPublic ? "/api/public" : "/api/request";

    const respBody = await cnFetch(defaultCellnodeUrl + path, {
      method: "POST",
      body: message,
      ...fetchOpts,
    });
    // console.log("[REQUEST]", {
    //   url: defaultCellnodeUrl + path,
    //   methodType: method,
    //   method: "POST",
    //   body: message,
    //   ...fetchOpts,
    // })
    // if (method === "listClaims") {
    //   console.log("ListClaims", respBody)
    // }
    // if (fetchOpts.dryRun) return respBody;
    if (respBody.error) throw respBody.error;

    return then(respBody.result);
  };
  const getEntityFile = (target: string, key: any) =>
    cnRpc(target, () => ({
      method: "fetchPublic",
      data: { key },
      isPublic: true,
    }));
  const dashifyProjUrls = (projRec: { data: { [x: string]: string } }) => {
    ["logo", "image"]
      .filter((propName) => projRec.data[propName])

      .forEach(
        (propName) =>
          (projRec.data[propName] = dashifyUrl(projRec.data[propName]))
      );

    return projRec;
  };

  return {
    getSecpAccount: async () => {
      const currentDid = signer.agent.didPrefix + signer.agent.didDoc.did;
      const accountIDFromDid = await bcFetchGet("/didToAddr/" + currentDid);
      return await bcFetchGet(
        "/cosmos/auth/v1beta1/accounts/" + accountIDFromDid.result
      );
    },

    getAgentAccount: async () =>
      await bcFetchGet(
        "/cosmos/auth/v1beta1/accounts/" +
          (
            await getSignerAccount("agent")
          ).address
      ),

    balances: async (accountType: any, denom?: any) =>
      await bcFetchGet(
        `/cosmos/bank/v1beta1/balances/${
          (
            await getSignerAccount(accountType)
          ).address
        }` + (denom ? `/${denom}` : "")
      ),

    register: (pubKey?: any) => {
      if (!signer)
        throw new Error(
          "The client needs to be initialized with a wallet / signer in order for this method to be used"
        );

      return signAndBroadcast("agent", {
        type: "did/AddDid",
        value: {
          did: signer.agent.did,
          pubKey: signer.agent.didDoc.verifyKey || pubKey,
        },
      });
    },

    getDidDoc: (did: string) => bsFetchGet("/api/did/getByDid/" + did),

    listEntities,

    listProjects: async () => {
      const projRecs = await listEntities("Project");

      if (GlobaldashifyUrls) projRecs.forEach(dashifyProjUrls);

      return projRecs;
    },

    listTemplates: () => listEntities("Template"),

    listCells: () => listEntities("Cell"),

    getProject: async (projDid: string) => {
      const projRec = await getEntity(projDid);

      if (GlobaldashifyUrls) dashifyProjUrls(projRec);

      return projRec;
    },

    getTemplate,

    getCell: getEntity,

    createProject: (projectData: any, cnUrl = defaultCellnodeUrl) =>
      cnRpc(cnUrl, () => ({
        method: "createProject",
        tplName: "create_project",
        data: projectData,
      })),

    updateProject: (projectDocUpdates: any, cnUrl = defaultCellnodeUrl) =>
      cnRpc(cnUrl, () => ({
        method: "updateProjectDoc",
        tplName: "project_doc",
        data: projectDocUpdates,
      })),

    createEntityFile: (target: string, dataUrl: any) => {
      const [, contentType, data] = dataUrl.match("^data:([^;]+);base64,(.+)$");

      return cnRpc(target, (_: any, serviceEndpoint: string) => ({
        method: "createPublic",
        data: { data, contentType },
        isPublic: true,
        then: (data2: string) => serviceEndpoint + "/public/" + data2,
      }));
    },

    getEntityFile,

    updateProjectStatus: (projRecOrDid: string, status: any) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: "updateProjectStatus",
        tplName: "project_status",
        data: { projectDid, status },
      })),

    getProjectFundAddress: async (projDid: string) =>
      (await bcFetchGet("/projectAccounts/" + projDid)).map[projDid],

    listAgents: (projRecOrDid: string) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: "listAgents",
        tplName: "list_agent",
        data: { projectDid },
      })),

    createAgent: (projRecOrDid: string, { did, role, email, name }: any) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: "createAgent",
        tplName: "create_agent",
        data: { projectDid, agentDid: did, role, email, name },
      })),

    updateAgent: (
      projRecOrDid: string,
      agentDid: any,
      { status, role, version }: any
    ) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: "updateAgentStatus",
        tplName: "agent_status",
        data: { projectDid, agentDid, status, role, version },
      })),

    listClaims: (projRecOrDid: string, tplId?: any) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: tplId ? "listClaimsByTemplateId" : "listClaims",
        tplName: "list_claim",
        data: { projectDid, claimTemplateId: tplId },
      })),

    createClaim: async (
      projRecOrDid: string,
      tplRecOrDid: string,
      claimItems: any,
      fetchOpts?: any
    ) => {
      const tplRec = await getTemplate(tplRecOrDid);

      const resp = await cnRpc(
        projRecOrDid,
        (projectDid: any) => ({
          method: "submitClaim",
          tplName: "submit_claim",
          data: {
            "@context":
              "https://schema.ixo.foundation/claims/53690e7d550278dbe228ddf35e0ba72b2666cba6",
            claimTemplateId: tplRec.projectDid,
            type: tplRec.data.page.content.claimInfo.type,
            issuerId: signer.agent.did,
            claimSubject: { id: projectDid },
            items: claimItems,
            projectDid,
            dateTime: new Date().toISOString(),
          },
        }),
        fetchOpts
      );
      return resp;
    },
    // TODO: We can optionally validate the given claims against the schema
    // of the claim template in the future.

    evaluateClaim: (projRecOrDid: string, claimId: any, status: any) =>
      cnRpc(projRecOrDid, (projectDid: any) => ({
        method: "evaluateClaim",
        tplName: "evaluate_claim",
        data: { projectDid, claimId, status },
      })),

    sendTokens: async (to: any, amount: any, denom = "uixo") =>
      await signAndBroadcast("secp", {
        type: "cosmos-sdk/MsgSend",
        value: {
          amount: [{ amount: String(amount), denom }],
          from_address: (await getSignerAccount("secp")).address,
          to_address: to,
        },
      }),
    getTransactions: async (address: any, asset: any) =>
      bsFetchGet(
        `/transactions/listTransactionsByAddrByAsset/${address}/${asset}`
      ),

    getIxoFromUixo: (amount: number) => {
      return amount / 10 ** 6;
    },

    staking: {
      listValidators: (urlParams?: any) =>
        bcFetchGet("/staking/validators", { urlParams }),

      getValidator: (validatorAddr: any) =>
        bcFetchGet("/staking/validators/" + validatorAddr),

      myDelegations: async () =>
        await bcFetchGet(
          `/staking/delegators/${
            (
              await getSignerAccount("secp")
            ).address
          }/delegations`
        ),

      pool: () => bcFetchGet("/staking/pool"),

      validatorDistribution: (validatorAddr: any) =>
        bcFetchGet("/distribution/validators/" + validatorAddr),

      delegatorValidatorRewards: (delegatorAddr: any, validatorAddr: any) =>
        bcFetchGet(
          `/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`
        ),

      delegation: (delegatorAddr: any, validatorAddr: any) =>
        bcFetchGet(
          `/staking/delegators/${delegatorAddr}/delegations/${validatorAddr}`
        ),

      delegatorDelegations: (delegatorAddr: any) =>
        bcFetchGet(`/staking/delegators/${delegatorAddr}/delegations`),

      delegatorUnbondingDelegations: (delegatorAddr: any) =>
        bcFetchGet(
          `/staking/delegators/${delegatorAddr}/unbonding_delegations`
        ),

      delegatorRewards: (delegatorAddr: any) =>
        bcFetchGet(`/distribution/delegators/${delegatorAddr}/rewards`),

      delegate: async (validatorAddr: any, amount: any) =>
        await signAndBroadcast("secp", {
          type: "cosmos-sdk/MsgDelegate",
          value: {
            amount: { denom: "uixo", amount: String(amount) },
            delegator_address: (await getSignerAccount("secp")).address,
            validator_address: validatorAddr,
          },
        }),

      undelegate: async (validatorAddr: any, amount: any) =>
        await signAndBroadcast("secp", {
          type: "cosmos-sdk/MsgUndelegate",
          value: {
            amount: { denom: "uixo", amount: String(amount) },
            delegator_address: (await getSignerAccount("secp")).address,
            validator_address: validatorAddr,
          },
        }),

      redelegate: async (
        validatorSrcAddr: any,
        validatorDstAddr: any,
        amount: any
      ) =>
        await signAndBroadcast("secp", {
          type: "cosmos-sdk/MsgBeginRedelegate",
          value: {
            amount: { denom: "uixo", amount: String(amount) },
            delegator_address: (await getSignerAccount("secp")).address,
            validator_src_address: validatorSrcAddr,
            validator_dst_address: validatorDstAddr,
          },
        }),
    },

    bonds: {
      byId: (did: string) => bcFetchGet("/bonds/" + did),

      list: () => bcFetchGet("/bonds_detailed"),

      buy: (
        bondDid: any,
        bondToken: any,
        reserveToken: any,
        amount: any,
        maxPrice: any
      ) =>
        signAndBroadcast("agent", {
          type: "bonds/MsgBuy",
          value: {
            buyer_did: signer.agent.did,
            bond_did: bondDid,
            amount: { amount: String(amount), denom: bondToken },
            max_prices: [{ amount: String(maxPrice), denom: reserveToken }],
          },
        }),

      sell: (bondDid: any, bondToken: any, amount: any) =>
        signAndBroadcast("agent", {
          type: "bonds/MsgSell",
          value: {
            seller_did: signer.agent.did,
            bond_did: bondDid,
            amount: { amount: String(amount), denom: bondToken },
          },
        }),
      getBondPrice: (bondDid: any) =>
        bcFetchGet(`/bonds/${bondDid}/buy_price/1`),
    },

    custom: (signerToUse: any, msg: any, fee: any) =>
      signAndBroadcast(signerToUse, msg, fee),
  };
}

export async function getTemplate(tplRecOrDid: string): Promise<any> {
  const getEntityHead = async (projRecOrDid: any): Promise<any> => {
    if (typeof projRecOrDid === "object") {
      const { projectDid } = projRecOrDid;
      let serviceEndpoint;

      try {
        serviceEndpoint = projRecOrDid.data.nodes.items
          .find((i: { [x: string]: string }) => i["@type"] === "CellNode")
          .serviceEndpoint.replace(/\/$/, "");

        if (GlobaldashifyUrls) serviceEndpoint = dashifyUrl(serviceEndpoint);
      } catch (e) {
        serviceEndpoint = defaultCellnodeUrl;
        /* throw new Error('Project doesn\'t have an associated Cell Node record!') */
      }

      return { projectDid, serviceEndpoint };
    }
    return getEntityHead(
      await makeFetcherGet("/api/project/getByProjectDid/" + projRecOrDid)
    );
  };

  const cnRpc = async (target: string, dataCb: any, fetchOpts?: any) => {
    const getSignerAccount = memoize((signerToUse: string | number) =>
      GlobalSigner[signerToUse].getAccounts().then((as: any[]) => as[0])
    );

    const sign = async (
      signerToUse: string,
      signDoc: {
        account_number: any;
        chain_id: any;
        fee: { amount: any; gas: string };
        memo: string;
        msgs: any[];
        sequence: any;
      }
    ) =>
      GlobalSigner[signerToUse].signAmino(
        (await getSignerAccount(signerToUse)).address,
        signDoc
      );

    if (!GlobalSigner)
      throw new Error(
        "The client needs to be initialized with a wallet / signer in order for this method to be used"
      );

    const { projectDid, serviceEndpoint } =
      typeof target === "string" && target.startsWith("http")
        ? { projectDid: null, serviceEndpoint: target }
        : await getEntityHead(target);

    const {
      method,
      tplName,
      data,
      isPublic = false,
      then = (x: any) => x,
    } = dataCb(projectDid, defaultCellnodeUrl);

    const message = isPublic
      ? makePublicRpcMsg(method, data)
      : makeRpcMsg(method, tplName, data, {
          type: (await getSignerAccount("agent")).algo,
          created: new Date().toISOString(),
          creator: GlobalSigner.agent.did,
          signatureValue: (await sign("agent", data)).signature.signature,
        });
    const path = isPublic ? "/api/public" : "/api/request";

    const respBody = await cnFetch(defaultCellnodeUrl + path, {
      method: "POST",
      body: message,
      ...fetchOpts,
    });
    if (fetchOpts.dryRun) return respBody;

    if (respBody.error) throw respBody.error;

    return respBody.result;
  };
  const getEntityFile = async (
    target: string,
    key: any,
    method: string,
    isPublic: boolean,
    tplName: string
  ) => {
    const getSignerAccount = memoize((signerToUse: string | number) =>
      GlobalSigner[signerToUse].getAccounts().then((as: any[]) => as[0])
    );
    const sign = async (
      signerToUse: string,
      signDoc: {
        account_number: any;
        chain_id: any;
        fee: { amount: any; gas: string };
        memo: string;
        msgs: any[];
        sequence: any;
      }
    ) =>
      GlobalSigner[signerToUse].signAmino(
        (await getSignerAccount(signerToUse)).address,
        signDoc
      );
    if (!GlobalSigner)
      throw new Error(
        "The client needs to be initialized with a wallet / signer in order for this method to be used"
      );

    const message = isPublic
      ? makePublicRpcMsg(method, key)
      : makeRpcMsg(method, tplName, key, {
          type: (await getSignerAccount("agent")).algo,
          created: new Date().toISOString(),
          creator: GlobalSigner.agent.did,
          signatureValue: (await sign("agent", key)).signature.signature,
        });
    const path = isPublic ? "/api/public" : "/api/request";

    const respBody = await cnFetch(defaultCellnodeUrl + path, {
      method: "POST",
      body: message,
    });

    if (respBody.error) throw respBody.error;

    return respBody.result;
  };

  const tplDoc =
    typeof tplRecOrDid === "object"
      ? tplRecOrDid
      : await getEntity(tplRecOrDid);

  if (!tplDoc.data.page.content) {
    const { data: rawTplContent } = await getEntityFile(
      tplDoc,
      { key: tplDoc.data.page.cid },
      "fetchPublic",
      true,
      tplDoc.data.name
    );

    const decodedTplContent = String.fromCharCode.apply(
      null,
      Array.from(fromBase64(rawTplContent))
    );
    const parsedTplContent = JSON.parse(decodedTplContent);
    Object.assign(tplDoc.data.page, { content: parsedTplContent });
    // tplDoc.data.page.content = parsedTplContent
    // Here we're arbitrarily extending the template schema to add a
    // "content" property under "page", and populate it with the
    // actual claim template content fetched from the relevant cell
    // node.
  }

  return tplDoc;
}

export function assertSignerIsValid(signer: any): void {
  if (
    !signer ||
    !signer.secp ||
    !signer.agent ||
    typeof signer.secp.getAccounts !== "function" ||
    typeof signer.secp.signAmino !== "function" ||
    typeof signer.agent.getAccounts !== "function" ||
    typeof signer.agent.signAmino !== "function" ||
    typeof signer.agent.did !== "string"
  )
    throw new Error("Invalid signer");
}

export async function cnFetch(
  url: string,
  { ...options },
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl = url + (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;

  const fetchOps = {
    ...options,
    body: options?.body && sortedJsonStringify(options?.body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  const resp = await cnFetchAPI.post(modifiedUrl, fetchOps.body);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  if (resp.problem) {
    throw new Error(resp.problem);
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function bcFetchGet(
  url: string,
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl =
    blockChainFetchAPI.getBaseURL() +
    url +
    (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;
  console.log("[BCFETCH]", url, urlParams);
  const resp = await blockChainFetchAPI.get(modifiedUrl);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function blockScanFetchGet(
  url: string,
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl =
    blockScanFetchAPI.getBaseURL() +
    url +
    (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;

  const resp = await blockScanFetchAPI.get(modifiedUrl);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function bcFetchPost(
  url: string,
  { ...options },
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl =
    blockChainFetchAPI.getBaseURL() +
    url +
    (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;

  const fetchOps = {
    ...options,
    body: options?.body && sortedJsonStringify(options?.body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  const resp = await blockChainFetchAPI.post(modifiedUrl, fetchOps.body);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function bsFetchGet(
  url: string,
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl =
    blockSyncFetchAPI.getBaseURL() +
    url +
    (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;
  const resp = await blockSyncFetchAPI.get(modifiedUrl);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function bsFetchPost(
  url: string,
  { ...options },
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl =
    blockSyncFetchAPI.getBaseURL() +
    url +
    (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;

  const fetchOps = {
    ...options,
    body: options?.body && sortedJsonStringify(options?.body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  const resp = await blockSyncFetchAPI.post(modifiedUrl, fetchOps.body);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export async function makeFetcherGet(
  url: string,
  urlParams?: any,
  fullResponse = false
): Promise<any> {
  const urlParamsStr = new URLSearchParams(urlParams).toString();
  const modifiedUrl = url + (urlParamsStr ? "?" + urlParamsStr : "");
  // used for debug
  // const rawBody = options ? options.body : undefined;
  const resp = await cnFetchAPI.get(modifiedUrl);

  if (!resp.headers) {
    throw new Error("Response is undefined");
  }
  const body = resp.data;
  return Promise[resp.ok ? "resolve" : "reject"](
    fullResponse
      ? {
          status: resp.status,
          headers: resp.headers,
          body,
        }
      : body
  );
}

export function generateTxId(): number {
  return Math.floor(Math.random() * 1000000 + 1);
}

// todo
export function makePublicRpcMsg(method: any, params: any) {
  return {
    jsonrpc: "2.0",
    method,
    id: generateTxId(),
    params,
  };
}

export function makeRpcMsg(
  method?: any,
  templateName?: string,
  data?: any,
  signature?: any
): any {
  return {
    jsonrpc: "2.0",
    method,
    id: generateTxId(),
    params: {
      payload: {
        data: data || {},
        template: templateName ? { name: templateName } : undefined,
      },
      signature,
    },
  };
}

export function dashifyUrl(urlStr: string): string {
  urlStr.replace(
    /^(https?:\/\/)([^/]+)(\/.*)?/,
    (_, proto, host, path) => proto + host.replace("_", "-") + (path || "")
  );
  return urlStr;
}

// wallet
// Hack to get around capability issue with sov dids
export async function makeWallet(src: any, didPrefix = "did:ixo:") {
  const ixoWallet = await makeWallets(src, didPrefix);
  const sovWallet = await makeSovWallets(src, "did:sov:");
  return [ixoWallet, sovWallet];
}

export async function makeWalletFromStorage(
  src: any,
  src2: any,
  didPrefix = "did:ixo:"
) {
  const ixoWallet = await makeWallets(src, didPrefix);
  const sovWallet = await makeSovWallets(src2, "did:sov:");
  return [ixoWallet, sovWallet];
}

export async function makeWeb3WalletFromStorage(key: any, didPrefix = "ixo") {
  const ixoWallet = await makeWalletFromStorageKey(key, didPrefix);
  const sovWallet = await makeWalletFromStorageKey(key, "sov");
  return [ixoWallet, sovWallet];
}

async function makeWallets(src: any, didPrefix = "did:ixo:") {
  let secp: Secp256k1HdWallet;
  let agent: any;
  if (typeof src === "object" && !Array.isArray(src) && src != null) {
    ({ secp, agent } = fromSerializableWallet(src));
    const toJSON = () => toSerializableWallet({ secp, agent });
    GlobalSigner = { secp, agent, toJSON };
    return { secp, agent, toJSON };
  } else {
    if (src) {
      if (Array.isArray(src)) {
        secp = await Secp256k1HdWallet.fromMnemonic(src.join(" "), {
          prefix: "ixo",
        });
      }
      secp = await Secp256k1HdWallet.fromMnemonic(src, { prefix: "ixo" });
    } else {
      secp = await Secp256k1HdWallet.generate(12, { prefix: "ixo" });
      // See note [1]
    }
    agent = await makeAgentWallet(secp.mnemonic, undefined, didPrefix);
    const toJSON = () => toSerializableWallet({ secp, agent });
    GlobalSigner = { secp, agent, toJSON };
    return { secp, agent, toJSON };
  }
}
async function makeSovWallets(src: any, didPrefix = "did:sov:") {
  let secp: Secp256k1HdWallet;
  let agent: any;
  if (typeof src === "object" && !Array.isArray(src) && src != null) {
    ({ secp, agent } = fromSerializableWallet(src));
    const toJSON = () => toSerializableWallet({ secp, agent });
    GlobalSigner = { secp, agent, toJSON };
    return { secp, agent, toJSON };
  } else {
    if (src) {
      if (Array.isArray(src)) {
        secp = await Secp256k1HdWallet.fromMnemonic(src.join(" "), {
          prefix: "ixo",
        });
      }
      secp = await Secp256k1HdWallet.fromMnemonic(src, { prefix: "ixo" });
    } else {
      secp = await Secp256k1HdWallet.generate(12, { prefix: "ixo" });
      // See note [1]
    }
    agent = await makeAgentWallet(secp.mnemonic, undefined, didPrefix);

    const toJSON = () => toSerializableWallet({ secp, agent });
    GlobalSigner = { secp, agent, toJSON };
    return { secp, agent, toJSON };
  }
}

async function makeWalletFromKey(key: string, prefix = "ixo") {
  const uint8arr = new Uint8Array(Buffer.from(key, "hex"));
  const ixoWallet = await Secp256k1Wallet.fromKey(uint8arr, prefix);
  const account = await ixoWallet.getAccounts();
  const agent = makeAgentWeb3Wallet(uint8arr, account[0].pubkey, prefix);
  GlobalSigner = { secp: ixoWallet, agent };
  return { secp: ixoWallet, agent };
}

async function makeWalletFromStorageKey(key: any, prefix = "ixo") {
  const uint8arr = new Uint8Array(Buffer.from(key, "hex"));

  const ixoWallet = await Secp256k1Wallet.fromKey(uint8arr, prefix);
  const account = await ixoWallet.getAccounts();
  const agent = makeAgentWeb3Wallet(uint8arr, account[0].pubkey, prefix);
  GlobalSigner = { secp: ixoWallet, agent };
  return { secp: ixoWallet, agent };
}

export async function makeWalletsFromKey(key: string, prefix = "ixo") {
  const ixoWallet = await makeWalletFromKey(key, prefix);
  const sovWallet = await makeWalletFromKey(key, "sov");
  return [ixoWallet, sovWallet];
}

export function toSerializableWallet(w: { secp: any; agent: any }): any {
  return {
    secp: {
      mnemonic: w.secp.mnemonic,
      seed: base58.encode(w.secp.seed),
      accounts: w.secp.accounts.map((a: { hdPath: any }) => ({
        ...a,
        hdPath: pathToString(a.hdPath),
      })),
    },
    agent: {
      mnemonic: w.agent.mnemonic,
      didPrefix: w.agent.didPrefix,
      didDoc: w.agent.didDoc,
    },
  };
}
export function fromSerializableWallet(s: any) {
  return {
    // @ts-ignore
    secp: new Secp256k1HdWallet(
      s.secp.mnemonic && new EnglishMnemonic(s.secp.mnemonic),

      {
        seed: Uint8Array.from(base58.decode(s.secp.seed)),
        prefix: s.secp.accounts[0].prefix,
        hdPaths: s.secp.accounts.map((a: { hdPath: string }) =>
          stringToPath(a.hdPath)
        ),
      }
    ),

    agent: makeAgentWallet(s.agent.mnemonic, s.agent.didDoc, s.agent.didPrefix),
  };
}

/* @returns OfflineAminoSigner: https://github.com/cosmos/cosmjs/blob/98e91ae5fe699733497befef95204923c93a7373/packages/amino/src/signer.ts#L22-L38 */

export function makeAgentWallet(
  mnemonic: any,
  didDoc = sovrin.fromSeed(sha256(mnemonic).slice(0, 32)),
  didPrefix = "did:ixo:"
) {
  return {
    mnemonic,
    didDoc,
    didPrefix,
    did: didPrefix + didDoc.did,

    async getAccounts() {
      return [
        {
          algo: "ed25519-sha-256",
          pubkey: Uint8Array.from(base58.decode(didDoc.verifyKey)),
          address: Bech32.encode(
            "ixo",
            sha256(base58.decode(didDoc.verifyKey)).slice(0, 20)
          ),
        },
      ];
    },

    async signAmino(signerAddress: any, signDoc: any) {
      const account = (await this.getAccounts()).find(
        ({ address }) => address === signerAddress
      );

      if (!account)
        throw new Error(`Address ${signerAddress} not found in wallet`);

      const fullSignature = sovrin.signMessage(
        serializeSignDoc(signDoc),
        didDoc.secret.signKey,
        didDoc.verifyKey
      );
      const signatureBase64 = toBase64(fullSignature.slice(0, 64));
      const pub_keyBase64 = base58.decode(didDoc.verifyKey);
      return {
        signed: signDoc,

        signature: {
          signature: signatureBase64,

          pub_key: {
            type: "tendermint/PubKeyEd25519",
            value: toBase64(pub_keyBase64).toString(),
          },
        },
      };
    },
  };
}

function makeAgentWeb3Wallet(
  privkey: Uint8Array,
  pubkey: Uint8Array,
  prefix: string
) {
  const doc = agentfromPrivateKey(privkey, pubkey);
  return {
    didDoc: doc,
    didPrefix: prefix,
    did: prefix + doc.did,

    async getAccounts() {
      return [
        {
          algo: "ed25519-sha-256",
          pubkey: Uint8Array.from(base58.decode(doc.verifyKey)),
          address: Bech32.encode(
            "ixo",
            sha256(base58.decode(doc.verifyKey)).slice(0, 20)
          ),
        },
      ];
    },

    async signAmino(signerAddress: any, signDoc: any) {
      const account = (await this.getAccounts()).find(
        ({ address }) => address === signerAddress
      );

      if (!account)
        throw new Error(`Address ${signerAddress} not found in wallet`);

      const fullSignature = sovrin.signMessage(
        serializeSignDoc(signDoc),
        doc.secret.signKey,
        doc.verifyKey
      );
      const signatureBase64 = toBase64(fullSignature.slice(0, 64));
      const pub_keyBase64 = base58.decode(doc.verifyKey);
      return {
        signed: signDoc,

        signature: {
          signature: signatureBase64,

          pub_key: {
            type: "tendermint/PubKeyEd25519",
            value: toBase64(pub_keyBase64).toString(),
          },
        },
      };
    },
  };
}

//
const agentfromPrivateKey = function (
  privateKey: Uint8Array,
  publicKey: Uint8Array
) {
  const signKey = base58.encode(Buffer.from(privateKey));
  const keyPair = nacl.box.keyPair.fromSecretKey(privateKey);
  return {
    did: base58.encode(Buffer.from(publicKey.subarray(0, 16))),
    verifyKey: base58.encode(Buffer.from(publicKey)),
    encryptionPublicKey: base58.encode(Buffer.from(keyPair.publicKey)),

    secret: {
      seed: "REDACTED",
      signKey: signKey,
      encryptionPrivateKey: base58.encode(Buffer.from(keyPair.secretKey)),
    },
  };
};

// // Notes
// //
// // [1]: The prefix parameters here are not to be confused with the "didPrefix'
// //      parameter of this "makeWallet" function. The prefixes used in the
// //      Secp256k1HdWallet constructor functions are prefixes for cosmos wallet
// //      addresses while the did prefix is the prefix of the did address.
