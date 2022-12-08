import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

const crudResolversMap = {
  Capability: crudResolvers.CapabilityCrudResolver,
  Public: crudResolvers.PublicCrudResolver,
  Transaction: crudResolvers.TransactionCrudResolver,
  Wallet: crudResolvers.WalletCrudResolver,
  Agent: crudResolvers.AgentCrudResolver,
  AgentStatus: crudResolvers.AgentStatusCrudResolver,
  Claim: crudResolvers.ClaimCrudResolver,
  EvaluateClaim: crudResolvers.EvaluateClaimCrudResolver,
  Project: crudResolvers.ProjectCrudResolver,
  ProjectDoc: crudResolvers.ProjectDocCrudResolver,
  ProjectStatus: crudResolvers.ProjectStatusCrudResolver
};
const actionResolversMap = {
  Capability: {
    aggregateCapability: actionResolvers.AggregateCapabilityResolver,
    createManyCapability: actionResolvers.CreateManyCapabilityResolver,
    createOneCapability: actionResolvers.CreateOneCapabilityResolver,
    deleteManyCapability: actionResolvers.DeleteManyCapabilityResolver,
    deleteOneCapability: actionResolvers.DeleteOneCapabilityResolver,
    findFirstCapability: actionResolvers.FindFirstCapabilityResolver,
    findFirstCapabilityOrThrow: actionResolvers.FindFirstCapabilityOrThrowResolver,
    capabilities: actionResolvers.FindManyCapabilityResolver,
    capability: actionResolvers.FindUniqueCapabilityResolver,
    getCapability: actionResolvers.FindUniqueCapabilityOrThrowResolver,
    groupByCapability: actionResolvers.GroupByCapabilityResolver,
    updateManyCapability: actionResolvers.UpdateManyCapabilityResolver,
    updateOneCapability: actionResolvers.UpdateOneCapabilityResolver,
    upsertOneCapability: actionResolvers.UpsertOneCapabilityResolver
  },
  Public: {
    aggregatePublic: actionResolvers.AggregatePublicResolver,
    createManyPublic: actionResolvers.CreateManyPublicResolver,
    createOnePublic: actionResolvers.CreateOnePublicResolver,
    deleteManyPublic: actionResolvers.DeleteManyPublicResolver,
    deleteOnePublic: actionResolvers.DeleteOnePublicResolver,
    findFirstPublic: actionResolvers.FindFirstPublicResolver,
    findFirstPublicOrThrow: actionResolvers.FindFirstPublicOrThrowResolver,
    publics: actionResolvers.FindManyPublicResolver,
    public: actionResolvers.FindUniquePublicResolver,
    getPublic: actionResolvers.FindUniquePublicOrThrowResolver,
    groupByPublic: actionResolvers.GroupByPublicResolver,
    updateManyPublic: actionResolvers.UpdateManyPublicResolver,
    updateOnePublic: actionResolvers.UpdateOnePublicResolver,
    upsertOnePublic: actionResolvers.UpsertOnePublicResolver
  },
  Transaction: {
    aggregateTransaction: actionResolvers.AggregateTransactionResolver,
    createManyTransaction: actionResolvers.CreateManyTransactionResolver,
    createOneTransaction: actionResolvers.CreateOneTransactionResolver,
    deleteManyTransaction: actionResolvers.DeleteManyTransactionResolver,
    deleteOneTransaction: actionResolvers.DeleteOneTransactionResolver,
    findFirstTransaction: actionResolvers.FindFirstTransactionResolver,
    findFirstTransactionOrThrow: actionResolvers.FindFirstTransactionOrThrowResolver,
    transactions: actionResolvers.FindManyTransactionResolver,
    transaction: actionResolvers.FindUniqueTransactionResolver,
    getTransaction: actionResolvers.FindUniqueTransactionOrThrowResolver,
    groupByTransaction: actionResolvers.GroupByTransactionResolver,
    updateManyTransaction: actionResolvers.UpdateManyTransactionResolver,
    updateOneTransaction: actionResolvers.UpdateOneTransactionResolver,
    upsertOneTransaction: actionResolvers.UpsertOneTransactionResolver
  },
  Wallet: {
    aggregateWallet: actionResolvers.AggregateWalletResolver,
    createManyWallet: actionResolvers.CreateManyWalletResolver,
    createOneWallet: actionResolvers.CreateOneWalletResolver,
    deleteManyWallet: actionResolvers.DeleteManyWalletResolver,
    deleteOneWallet: actionResolvers.DeleteOneWalletResolver,
    findFirstWallet: actionResolvers.FindFirstWalletResolver,
    findFirstWalletOrThrow: actionResolvers.FindFirstWalletOrThrowResolver,
    wallets: actionResolvers.FindManyWalletResolver,
    wallet: actionResolvers.FindUniqueWalletResolver,
    getWallet: actionResolvers.FindUniqueWalletOrThrowResolver,
    groupByWallet: actionResolvers.GroupByWalletResolver,
    updateManyWallet: actionResolvers.UpdateManyWalletResolver,
    updateOneWallet: actionResolvers.UpdateOneWalletResolver,
    upsertOneWallet: actionResolvers.UpsertOneWalletResolver
  },
  Agent: {
    aggregateAgent: actionResolvers.AggregateAgentResolver,
    createManyAgent: actionResolvers.CreateManyAgentResolver,
    createOneAgent: actionResolvers.CreateOneAgentResolver,
    deleteManyAgent: actionResolvers.DeleteManyAgentResolver,
    deleteOneAgent: actionResolvers.DeleteOneAgentResolver,
    findFirstAgent: actionResolvers.FindFirstAgentResolver,
    findFirstAgentOrThrow: actionResolvers.FindFirstAgentOrThrowResolver,
    agents: actionResolvers.FindManyAgentResolver,
    agent: actionResolvers.FindUniqueAgentResolver,
    getAgent: actionResolvers.FindUniqueAgentOrThrowResolver,
    groupByAgent: actionResolvers.GroupByAgentResolver,
    updateManyAgent: actionResolvers.UpdateManyAgentResolver,
    updateOneAgent: actionResolvers.UpdateOneAgentResolver,
    upsertOneAgent: actionResolvers.UpsertOneAgentResolver
  },
  AgentStatus: {
    aggregateAgentStatus: actionResolvers.AggregateAgentStatusResolver,
    createManyAgentStatus: actionResolvers.CreateManyAgentStatusResolver,
    createOneAgentStatus: actionResolvers.CreateOneAgentStatusResolver,
    deleteManyAgentStatus: actionResolvers.DeleteManyAgentStatusResolver,
    deleteOneAgentStatus: actionResolvers.DeleteOneAgentStatusResolver,
    findFirstAgentStatus: actionResolvers.FindFirstAgentStatusResolver,
    findFirstAgentStatusOrThrow: actionResolvers.FindFirstAgentStatusOrThrowResolver,
    agentStatuses: actionResolvers.FindManyAgentStatusResolver,
    agentStatus: actionResolvers.FindUniqueAgentStatusResolver,
    getAgentStatus: actionResolvers.FindUniqueAgentStatusOrThrowResolver,
    groupByAgentStatus: actionResolvers.GroupByAgentStatusResolver,
    updateManyAgentStatus: actionResolvers.UpdateManyAgentStatusResolver,
    updateOneAgentStatus: actionResolvers.UpdateOneAgentStatusResolver,
    upsertOneAgentStatus: actionResolvers.UpsertOneAgentStatusResolver
  },
  Claim: {
    aggregateClaim: actionResolvers.AggregateClaimResolver,
    createManyClaim: actionResolvers.CreateManyClaimResolver,
    createOneClaim: actionResolvers.CreateOneClaimResolver,
    deleteManyClaim: actionResolvers.DeleteManyClaimResolver,
    deleteOneClaim: actionResolvers.DeleteOneClaimResolver,
    findFirstClaim: actionResolvers.FindFirstClaimResolver,
    findFirstClaimOrThrow: actionResolvers.FindFirstClaimOrThrowResolver,
    claims: actionResolvers.FindManyClaimResolver,
    claim: actionResolvers.FindUniqueClaimResolver,
    getClaim: actionResolvers.FindUniqueClaimOrThrowResolver,
    groupByClaim: actionResolvers.GroupByClaimResolver,
    updateManyClaim: actionResolvers.UpdateManyClaimResolver,
    updateOneClaim: actionResolvers.UpdateOneClaimResolver,
    upsertOneClaim: actionResolvers.UpsertOneClaimResolver
  },
  EvaluateClaim: {
    aggregateEvaluateClaim: actionResolvers.AggregateEvaluateClaimResolver,
    createManyEvaluateClaim: actionResolvers.CreateManyEvaluateClaimResolver,
    createOneEvaluateClaim: actionResolvers.CreateOneEvaluateClaimResolver,
    deleteManyEvaluateClaim: actionResolvers.DeleteManyEvaluateClaimResolver,
    deleteOneEvaluateClaim: actionResolvers.DeleteOneEvaluateClaimResolver,
    findFirstEvaluateClaim: actionResolvers.FindFirstEvaluateClaimResolver,
    findFirstEvaluateClaimOrThrow: actionResolvers.FindFirstEvaluateClaimOrThrowResolver,
    evaluateClaims: actionResolvers.FindManyEvaluateClaimResolver,
    evaluateClaim: actionResolvers.FindUniqueEvaluateClaimResolver,
    getEvaluateClaim: actionResolvers.FindUniqueEvaluateClaimOrThrowResolver,
    groupByEvaluateClaim: actionResolvers.GroupByEvaluateClaimResolver,
    updateManyEvaluateClaim: actionResolvers.UpdateManyEvaluateClaimResolver,
    updateOneEvaluateClaim: actionResolvers.UpdateOneEvaluateClaimResolver,
    upsertOneEvaluateClaim: actionResolvers.UpsertOneEvaluateClaimResolver
  },
  Project: {
    aggregateProject: actionResolvers.AggregateProjectResolver,
    createManyProject: actionResolvers.CreateManyProjectResolver,
    createOneProject: actionResolvers.CreateOneProjectResolver,
    deleteManyProject: actionResolvers.DeleteManyProjectResolver,
    deleteOneProject: actionResolvers.DeleteOneProjectResolver,
    findFirstProject: actionResolvers.FindFirstProjectResolver,
    findFirstProjectOrThrow: actionResolvers.FindFirstProjectOrThrowResolver,
    projects: actionResolvers.FindManyProjectResolver,
    project: actionResolvers.FindUniqueProjectResolver,
    getProject: actionResolvers.FindUniqueProjectOrThrowResolver,
    groupByProject: actionResolvers.GroupByProjectResolver,
    updateManyProject: actionResolvers.UpdateManyProjectResolver,
    updateOneProject: actionResolvers.UpdateOneProjectResolver,
    upsertOneProject: actionResolvers.UpsertOneProjectResolver
  },
  ProjectDoc: {
    aggregateProjectDoc: actionResolvers.AggregateProjectDocResolver,
    createManyProjectDoc: actionResolvers.CreateManyProjectDocResolver,
    createOneProjectDoc: actionResolvers.CreateOneProjectDocResolver,
    deleteManyProjectDoc: actionResolvers.DeleteManyProjectDocResolver,
    deleteOneProjectDoc: actionResolvers.DeleteOneProjectDocResolver,
    findFirstProjectDoc: actionResolvers.FindFirstProjectDocResolver,
    findFirstProjectDocOrThrow: actionResolvers.FindFirstProjectDocOrThrowResolver,
    projectDocs: actionResolvers.FindManyProjectDocResolver,
    projectDoc: actionResolvers.FindUniqueProjectDocResolver,
    getProjectDoc: actionResolvers.FindUniqueProjectDocOrThrowResolver,
    groupByProjectDoc: actionResolvers.GroupByProjectDocResolver,
    updateManyProjectDoc: actionResolvers.UpdateManyProjectDocResolver,
    updateOneProjectDoc: actionResolvers.UpdateOneProjectDocResolver,
    upsertOneProjectDoc: actionResolvers.UpsertOneProjectDocResolver
  },
  ProjectStatus: {
    aggregateProjectStatus: actionResolvers.AggregateProjectStatusResolver,
    createManyProjectStatus: actionResolvers.CreateManyProjectStatusResolver,
    createOneProjectStatus: actionResolvers.CreateOneProjectStatusResolver,
    deleteManyProjectStatus: actionResolvers.DeleteManyProjectStatusResolver,
    deleteOneProjectStatus: actionResolvers.DeleteOneProjectStatusResolver,
    findFirstProjectStatus: actionResolvers.FindFirstProjectStatusResolver,
    findFirstProjectStatusOrThrow: actionResolvers.FindFirstProjectStatusOrThrowResolver,
    projectStatuses: actionResolvers.FindManyProjectStatusResolver,
    projectStatus: actionResolvers.FindUniqueProjectStatusResolver,
    getProjectStatus: actionResolvers.FindUniqueProjectStatusOrThrowResolver,
    groupByProjectStatus: actionResolvers.GroupByProjectStatusResolver,
    updateManyProjectStatus: actionResolvers.UpdateManyProjectStatusResolver,
    updateOneProjectStatus: actionResolvers.UpdateOneProjectStatusResolver,
    upsertOneProjectStatus: actionResolvers.UpsertOneProjectStatusResolver
  }
};
const crudResolversInfo = {
  Capability: ["aggregateCapability", "createManyCapability", "createOneCapability", "deleteManyCapability", "deleteOneCapability", "findFirstCapability", "findFirstCapabilityOrThrow", "capabilities", "capability", "getCapability", "groupByCapability", "updateManyCapability", "updateOneCapability", "upsertOneCapability"],
  Public: ["aggregatePublic", "createManyPublic", "createOnePublic", "deleteManyPublic", "deleteOnePublic", "findFirstPublic", "findFirstPublicOrThrow", "publics", "public", "getPublic", "groupByPublic", "updateManyPublic", "updateOnePublic", "upsertOnePublic"],
  Transaction: ["aggregateTransaction", "createManyTransaction", "createOneTransaction", "deleteManyTransaction", "deleteOneTransaction", "findFirstTransaction", "findFirstTransactionOrThrow", "transactions", "transaction", "getTransaction", "groupByTransaction", "updateManyTransaction", "updateOneTransaction", "upsertOneTransaction"],
  Wallet: ["aggregateWallet", "createManyWallet", "createOneWallet", "deleteManyWallet", "deleteOneWallet", "findFirstWallet", "findFirstWalletOrThrow", "wallets", "wallet", "getWallet", "groupByWallet", "updateManyWallet", "updateOneWallet", "upsertOneWallet"],
  Agent: ["aggregateAgent", "createManyAgent", "createOneAgent", "deleteManyAgent", "deleteOneAgent", "findFirstAgent", "findFirstAgentOrThrow", "agents", "agent", "getAgent", "groupByAgent", "updateManyAgent", "updateOneAgent", "upsertOneAgent"],
  AgentStatus: ["aggregateAgentStatus", "createManyAgentStatus", "createOneAgentStatus", "deleteManyAgentStatus", "deleteOneAgentStatus", "findFirstAgentStatus", "findFirstAgentStatusOrThrow", "agentStatuses", "agentStatus", "getAgentStatus", "groupByAgentStatus", "updateManyAgentStatus", "updateOneAgentStatus", "upsertOneAgentStatus"],
  Claim: ["aggregateClaim", "createManyClaim", "createOneClaim", "deleteManyClaim", "deleteOneClaim", "findFirstClaim", "findFirstClaimOrThrow", "claims", "claim", "getClaim", "groupByClaim", "updateManyClaim", "updateOneClaim", "upsertOneClaim"],
  EvaluateClaim: ["aggregateEvaluateClaim", "createManyEvaluateClaim", "createOneEvaluateClaim", "deleteManyEvaluateClaim", "deleteOneEvaluateClaim", "findFirstEvaluateClaim", "findFirstEvaluateClaimOrThrow", "evaluateClaims", "evaluateClaim", "getEvaluateClaim", "groupByEvaluateClaim", "updateManyEvaluateClaim", "updateOneEvaluateClaim", "upsertOneEvaluateClaim"],
  Project: ["aggregateProject", "createManyProject", "createOneProject", "deleteManyProject", "deleteOneProject", "findFirstProject", "findFirstProjectOrThrow", "projects", "project", "getProject", "groupByProject", "updateManyProject", "updateOneProject", "upsertOneProject"],
  ProjectDoc: ["aggregateProjectDoc", "createManyProjectDoc", "createOneProjectDoc", "deleteManyProjectDoc", "deleteOneProjectDoc", "findFirstProjectDoc", "findFirstProjectDocOrThrow", "projectDocs", "projectDoc", "getProjectDoc", "groupByProjectDoc", "updateManyProjectDoc", "updateOneProjectDoc", "upsertOneProjectDoc"],
  ProjectStatus: ["aggregateProjectStatus", "createManyProjectStatus", "createOneProjectStatus", "deleteManyProjectStatus", "deleteOneProjectStatus", "findFirstProjectStatus", "findFirstProjectStatusOrThrow", "projectStatuses", "projectStatus", "getProjectStatus", "groupByProjectStatus", "updateManyProjectStatus", "updateOneProjectStatus", "upsertOneProjectStatus"]
};
const argsInfo = {
  AggregateCapabilityArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyCapabilityArgs: ["data", "skipDuplicates"],
  CreateOneCapabilityArgs: ["data"],
  DeleteManyCapabilityArgs: ["where"],
  DeleteOneCapabilityArgs: ["where"],
  FindFirstCapabilityArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstCapabilityOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyCapabilityArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueCapabilityArgs: ["where"],
  FindUniqueCapabilityOrThrowArgs: ["where"],
  GroupByCapabilityArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyCapabilityArgs: ["data", "where"],
  UpdateOneCapabilityArgs: ["data", "where"],
  UpsertOneCapabilityArgs: ["where", "create", "update"],
  AggregatePublicArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyPublicArgs: ["data", "skipDuplicates"],
  CreateOnePublicArgs: ["data"],
  DeleteManyPublicArgs: ["where"],
  DeleteOnePublicArgs: ["where"],
  FindFirstPublicArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstPublicOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyPublicArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniquePublicArgs: ["where"],
  FindUniquePublicOrThrowArgs: ["where"],
  GroupByPublicArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyPublicArgs: ["data", "where"],
  UpdateOnePublicArgs: ["data", "where"],
  UpsertOnePublicArgs: ["where", "create", "update"],
  AggregateTransactionArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyTransactionArgs: ["data", "skipDuplicates"],
  CreateOneTransactionArgs: ["data"],
  DeleteManyTransactionArgs: ["where"],
  DeleteOneTransactionArgs: ["where"],
  FindFirstTransactionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstTransactionOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyTransactionArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueTransactionArgs: ["where"],
  FindUniqueTransactionOrThrowArgs: ["where"],
  GroupByTransactionArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyTransactionArgs: ["data", "where"],
  UpdateOneTransactionArgs: ["data", "where"],
  UpsertOneTransactionArgs: ["where", "create", "update"],
  AggregateWalletArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyWalletArgs: ["data", "skipDuplicates"],
  CreateOneWalletArgs: ["data"],
  DeleteManyWalletArgs: ["where"],
  DeleteOneWalletArgs: ["where"],
  FindFirstWalletArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstWalletOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyWalletArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueWalletArgs: ["where"],
  FindUniqueWalletOrThrowArgs: ["where"],
  GroupByWalletArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyWalletArgs: ["data", "where"],
  UpdateOneWalletArgs: ["data", "where"],
  UpsertOneWalletArgs: ["where", "create", "update"],
  AggregateAgentArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyAgentArgs: ["data", "skipDuplicates"],
  CreateOneAgentArgs: ["data"],
  DeleteManyAgentArgs: ["where"],
  DeleteOneAgentArgs: ["where"],
  FindFirstAgentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstAgentOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyAgentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueAgentArgs: ["where"],
  FindUniqueAgentOrThrowArgs: ["where"],
  GroupByAgentArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyAgentArgs: ["data", "where"],
  UpdateOneAgentArgs: ["data", "where"],
  UpsertOneAgentArgs: ["where", "create", "update"],
  AggregateAgentStatusArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyAgentStatusArgs: ["data", "skipDuplicates"],
  CreateOneAgentStatusArgs: ["data"],
  DeleteManyAgentStatusArgs: ["where"],
  DeleteOneAgentStatusArgs: ["where"],
  FindFirstAgentStatusArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstAgentStatusOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyAgentStatusArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueAgentStatusArgs: ["where"],
  FindUniqueAgentStatusOrThrowArgs: ["where"],
  GroupByAgentStatusArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyAgentStatusArgs: ["data", "where"],
  UpdateOneAgentStatusArgs: ["data", "where"],
  UpsertOneAgentStatusArgs: ["where", "create", "update"],
  AggregateClaimArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyClaimArgs: ["data", "skipDuplicates"],
  CreateOneClaimArgs: ["data"],
  DeleteManyClaimArgs: ["where"],
  DeleteOneClaimArgs: ["where"],
  FindFirstClaimArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstClaimOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyClaimArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueClaimArgs: ["where"],
  FindUniqueClaimOrThrowArgs: ["where"],
  GroupByClaimArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyClaimArgs: ["data", "where"],
  UpdateOneClaimArgs: ["data", "where"],
  UpsertOneClaimArgs: ["where", "create", "update"],
  AggregateEvaluateClaimArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyEvaluateClaimArgs: ["data", "skipDuplicates"],
  CreateOneEvaluateClaimArgs: ["data"],
  DeleteManyEvaluateClaimArgs: ["where"],
  DeleteOneEvaluateClaimArgs: ["where"],
  FindFirstEvaluateClaimArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstEvaluateClaimOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyEvaluateClaimArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueEvaluateClaimArgs: ["where"],
  FindUniqueEvaluateClaimOrThrowArgs: ["where"],
  GroupByEvaluateClaimArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyEvaluateClaimArgs: ["data", "where"],
  UpdateOneEvaluateClaimArgs: ["data", "where"],
  UpsertOneEvaluateClaimArgs: ["where", "create", "update"],
  AggregateProjectArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyProjectArgs: ["data", "skipDuplicates"],
  CreateOneProjectArgs: ["data"],
  DeleteManyProjectArgs: ["where"],
  DeleteOneProjectArgs: ["where"],
  FindFirstProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstProjectOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProjectArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueProjectArgs: ["where"],
  FindUniqueProjectOrThrowArgs: ["where"],
  GroupByProjectArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyProjectArgs: ["data", "where"],
  UpdateOneProjectArgs: ["data", "where"],
  UpsertOneProjectArgs: ["where", "create", "update"],
  AggregateProjectDocArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyProjectDocArgs: ["data", "skipDuplicates"],
  CreateOneProjectDocArgs: ["data"],
  DeleteManyProjectDocArgs: ["where"],
  DeleteOneProjectDocArgs: ["where"],
  FindFirstProjectDocArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstProjectDocOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProjectDocArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueProjectDocArgs: ["where"],
  FindUniqueProjectDocOrThrowArgs: ["where"],
  GroupByProjectDocArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyProjectDocArgs: ["data", "where"],
  UpdateOneProjectDocArgs: ["data", "where"],
  UpsertOneProjectDocArgs: ["where", "create", "update"],
  AggregateProjectStatusArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyProjectStatusArgs: ["data", "skipDuplicates"],
  CreateOneProjectStatusArgs: ["data"],
  DeleteManyProjectStatusArgs: ["where"],
  DeleteOneProjectStatusArgs: ["where"],
  FindFirstProjectStatusArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstProjectStatusOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyProjectStatusArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueProjectStatusArgs: ["where"],
  FindUniqueProjectStatusOrThrowArgs: ["where"],
  GroupByProjectStatusArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyProjectStatusArgs: ["data", "where"],
  UpdateOneProjectStatusArgs: ["data", "where"],
  UpsertOneProjectStatusArgs: ["where", "create", "update"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
> = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
> = Partial<Record<ModelResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    if (resolverActionsConfig._all) {
      const allActionsDecorators = resolverActionsConfig._all;
      const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
      for (const resolverActionName of resolverActionNames) {
        const actionTarget = (actionResolversConfig[
          resolverActionName as keyof typeof actionResolversConfig
        ] as Function).prototype;
        tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
        tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
      }
    }
    const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const resolverActionName of resolverActionsToApply) {
      const decorators = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[];
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Agent: relationResolvers.AgentRelationsResolver,
  AgentStatus: relationResolvers.AgentStatusRelationsResolver,
  Claim: relationResolvers.ClaimRelationsResolver,
  EvaluateClaim: relationResolvers.EvaluateClaimRelationsResolver
};
const relationResolversInfo = {
  Agent: ["AgentStatus"],
  AgentStatus: ["agent"],
  Claim: ["EvaluateClaim"],
  EvaluateClaim: ["claim"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
> = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel> | "_all", MethodDecorator[]>>;

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    if (relationResolverActionsConfig._all) {
      const allActionsDecorators = relationResolverActionsConfig._all;
      const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
      for (const relationResolverActionName of relationResolverActionNames) {
        tslib.__decorate(allActionsDecorators, relationResolverTarget, relationResolverActionName, null);
      }
    }
    const relationResolverActionsToApply = Object.keys(relationResolverActionsConfig).filter(
      it => it !== "_all"
    );
    for (const relationResolverActionName of relationResolverActionsToApply) {
      const decorators = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[];
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys | "_all", PropertyDecorator[]>
>;

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    if (enhanceConfig.fields._all) {
      const allFieldsDecorators = enhanceConfig.fields._all;
      for (const typeFieldName of typeFieldNames) {
        tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
      }
    }
    const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(
      it => it !== "_all"
    );
    for (const typeFieldName of configFieldsToApply) {
      const fieldDecorators = enhanceConfig.fields[typeFieldName]!;
      tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Capability: ["id", "projectDid", "capability", "template", "allow", "validateKYC"],
  Public: ["key", "cid", "extension", "contentType"],
  Transaction: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  Wallet: ["did", "signKey", "verifyKey"],
  Agent: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentStatus: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  Claim: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  EvaluateClaim: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  Project: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectDoc: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectStatus: ["id", "projectDid", "status", "txHash", "creator", "created"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateCapability: ["_count", "_avg", "_sum", "_min", "_max"],
  CapabilityGroupBy: ["id", "projectDid", "capability", "template", "allow", "validateKYC", "_count", "_avg", "_sum", "_min", "_max"],
  AggregatePublic: ["_count", "_min", "_max"],
  PublicGroupBy: ["key", "cid", "extension", "contentType", "_count", "_min", "_max"],
  AggregateTransaction: ["_count", "_avg", "_sum", "_min", "_max"],
  TransactionGroupBy: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateWallet: ["_count", "_min", "_max"],
  WalletGroupBy: ["did", "signKey", "verifyKey", "_count", "_min", "_max"],
  AggregateAgent: ["_count", "_min", "_max"],
  AgentGroupBy: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "_count", "_min", "_max"],
  AggregateAgentStatus: ["_count", "_avg", "_sum", "_min", "_max"],
  AgentStatusGroupBy: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateClaim: ["_count", "_min", "_max"],
  ClaimGroupBy: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "_count", "_min", "_max"],
  AggregateEvaluateClaim: ["_count", "_avg", "_sum", "_min", "_max"],
  EvaluateClaimGroupBy: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateProject: ["_count", "_min", "_max"],
  ProjectGroupBy: ["projectDid", "projectData", "txHash", "creator", "created", "_count", "_min", "_max"],
  AggregateProjectDoc: ["_count", "_min", "_max"],
  ProjectDocGroupBy: ["projectDid", "projectDoc", "txHash", "creator", "created", "_count", "_min", "_max"],
  AggregateProjectStatus: ["_count", "_avg", "_sum", "_min", "_max"],
  ProjectStatusGroupBy: ["id", "projectDid", "status", "txHash", "creator", "created", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  CapabilityCountAggregate: ["id", "projectDid", "capability", "template", "allow", "validateKYC", "_all"],
  CapabilityAvgAggregate: ["id"],
  CapabilitySumAggregate: ["id"],
  CapabilityMinAggregate: ["id", "projectDid", "capability", "template", "validateKYC"],
  CapabilityMaxAggregate: ["id", "projectDid", "capability", "template", "validateKYC"],
  PublicCountAggregate: ["key", "cid", "extension", "contentType", "_all"],
  PublicMinAggregate: ["key", "cid", "extension", "contentType"],
  PublicMaxAggregate: ["key", "cid", "extension", "contentType"],
  TransactionCountAggregate: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError", "_all"],
  TransactionAvgAggregate: ["blockResponeCode"],
  TransactionSumAggregate: ["blockResponeCode"],
  TransactionMinAggregate: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionMaxAggregate: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  WalletCountAggregate: ["did", "signKey", "verifyKey", "_all"],
  WalletMinAggregate: ["did", "signKey", "verifyKey"],
  WalletMaxAggregate: ["did", "signKey", "verifyKey"],
  AgentCount: ["AgentStatus"],
  AgentCountAggregate: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "_all"],
  AgentMinAggregate: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentMaxAggregate: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentStatusCountAggregate: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created", "_all"],
  AgentStatusAvgAggregate: ["id"],
  AgentStatusSumAggregate: ["id"],
  AgentStatusMinAggregate: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusMaxAggregate: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  ClaimCount: ["EvaluateClaim"],
  ClaimCountAggregate: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "_all"],
  ClaimMinAggregate: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "dateTime", "creator", "created"],
  ClaimMaxAggregate: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "dateTime", "creator", "created"],
  EvaluateClaimCountAggregate: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version", "_all"],
  EvaluateClaimAvgAggregate: ["id", "version"],
  EvaluateClaimSumAggregate: ["id", "version"],
  EvaluateClaimMinAggregate: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimMaxAggregate: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  ProjectCountAggregate: ["projectDid", "projectData", "txHash", "creator", "created", "_all"],
  ProjectMinAggregate: ["projectDid", "txHash", "creator", "created"],
  ProjectMaxAggregate: ["projectDid", "txHash", "creator", "created"],
  ProjectDocCountAggregate: ["projectDid", "projectDoc", "txHash", "creator", "created", "_all"],
  ProjectDocMinAggregate: ["projectDid", "txHash", "creator", "created"],
  ProjectDocMaxAggregate: ["projectDid", "txHash", "creator", "created"],
  ProjectStatusCountAggregate: ["id", "projectDid", "status", "txHash", "creator", "created", "_all"],
  ProjectStatusAvgAggregate: ["id"],
  ProjectStatusSumAggregate: ["id"],
  ProjectStatusMinAggregate: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusMaxAggregate: ["id", "projectDid", "status", "txHash", "creator", "created"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
> = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  CapabilityWhereInput: ["AND", "OR", "NOT", "id", "projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityOrderByWithRelationInput: ["id", "projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityWhereUniqueInput: ["id"],
  CapabilityOrderByWithAggregationInput: ["id", "projectDid", "capability", "template", "allow", "validateKYC", "_count", "_avg", "_max", "_min", "_sum"],
  CapabilityScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "projectDid", "capability", "template", "allow", "validateKYC"],
  PublicWhereInput: ["AND", "OR", "NOT", "key", "cid", "extension", "contentType"],
  PublicOrderByWithRelationInput: ["key", "cid", "extension", "contentType"],
  PublicWhereUniqueInput: ["key"],
  PublicOrderByWithAggregationInput: ["key", "cid", "extension", "contentType", "_count", "_max", "_min"],
  PublicScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "key", "cid", "extension", "contentType"],
  TransactionWhereInput: ["AND", "OR", "NOT", "hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionOrderByWithRelationInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionWhereUniqueInput: ["hash"],
  TransactionOrderByWithAggregationInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError", "_count", "_avg", "_max", "_min", "_sum"],
  TransactionScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  WalletWhereInput: ["AND", "OR", "NOT", "did", "signKey", "verifyKey"],
  WalletOrderByWithRelationInput: ["did", "signKey", "verifyKey"],
  WalletWhereUniqueInput: ["did"],
  WalletOrderByWithAggregationInput: ["did", "signKey", "verifyKey", "_count", "_max", "_min"],
  WalletScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "did", "signKey", "verifyKey"],
  AgentWhereInput: ["AND", "OR", "NOT", "agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "AgentStatus"],
  AgentOrderByWithRelationInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "AgentStatus"],
  AgentWhereUniqueInput: ["agentDid"],
  AgentOrderByWithAggregationInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "_count", "_max", "_min"],
  AgentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentStatusWhereInput: ["AND", "OR", "NOT", "id", "agent", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusOrderByWithRelationInput: ["id", "agent", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusWhereUniqueInput: ["id"],
  AgentStatusOrderByWithAggregationInput: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created", "_count", "_avg", "_max", "_min", "_sum"],
  AgentStatusScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  ClaimWhereInput: ["AND", "OR", "NOT", "txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "EvaluateClaim"],
  ClaimOrderByWithRelationInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "EvaluateClaim"],
  ClaimWhereUniqueInput: ["txHash"],
  ClaimOrderByWithAggregationInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "_count", "_max", "_min"],
  ClaimScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  EvaluateClaimWhereInput: ["AND", "OR", "NOT", "id", "claim", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimOrderByWithRelationInput: ["id", "claim", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimWhereUniqueInput: ["id"],
  EvaluateClaimOrderByWithAggregationInput: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version", "_count", "_avg", "_max", "_min", "_sum"],
  EvaluateClaimScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  ProjectWhereInput: ["AND", "OR", "NOT", "projectDid", "projectData", "txHash", "creator", "created"],
  ProjectOrderByWithRelationInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectWhereUniqueInput: ["projectDid"],
  ProjectOrderByWithAggregationInput: ["projectDid", "projectData", "txHash", "creator", "created", "_count", "_max", "_min"],
  ProjectScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "projectDid", "projectData", "txHash", "creator", "created"],
  ProjectDocWhereInput: ["AND", "OR", "NOT", "projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocOrderByWithRelationInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocWhereUniqueInput: ["projectDid"],
  ProjectDocOrderByWithAggregationInput: ["projectDid", "projectDoc", "txHash", "creator", "created", "_count", "_max", "_min"],
  ProjectDocScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectStatusWhereInput: ["AND", "OR", "NOT", "id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusOrderByWithRelationInput: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusWhereUniqueInput: ["id"],
  ProjectStatusOrderByWithAggregationInput: ["id", "projectDid", "status", "txHash", "creator", "created", "_count", "_avg", "_max", "_min", "_sum"],
  ProjectStatusScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "projectDid", "status", "txHash", "creator", "created"],
  CapabilityCreateInput: ["projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityUpdateInput: ["projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityCreateManyInput: ["id", "projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityUpdateManyMutationInput: ["projectDid", "capability", "template", "allow", "validateKYC"],
  PublicCreateInput: ["key", "cid", "extension", "contentType"],
  PublicUpdateInput: ["key", "cid", "extension", "contentType"],
  PublicCreateManyInput: ["key", "cid", "extension", "contentType"],
  PublicUpdateManyMutationInput: ["key", "cid", "extension", "contentType"],
  TransactionCreateInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionUpdateInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionCreateManyInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionUpdateManyMutationInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  WalletCreateInput: ["did", "signKey", "verifyKey"],
  WalletUpdateInput: ["did", "signKey", "verifyKey"],
  WalletCreateManyInput: ["did", "signKey", "verifyKey"],
  WalletUpdateManyMutationInput: ["did", "signKey", "verifyKey"],
  AgentCreateInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "AgentStatus"],
  AgentUpdateInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created", "AgentStatus"],
  AgentCreateManyInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentUpdateManyMutationInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentStatusCreateInput: ["agent", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusUpdateInput: ["agent", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusCreateManyInput: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusUpdateManyMutationInput: ["projectDid", "status", "role", "version", "txHash", "creator", "created"],
  ClaimCreateInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "EvaluateClaim"],
  ClaimUpdateInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created", "EvaluateClaim"],
  ClaimCreateManyInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  ClaimUpdateManyMutationInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  EvaluateClaimCreateInput: ["claim", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimUpdateInput: ["claim", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimCreateManyInput: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimUpdateManyMutationInput: ["projectDid", "status", "txHash", "creator", "created", "version"],
  ProjectCreateInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectUpdateInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectCreateManyInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectUpdateManyMutationInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectDocCreateInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocUpdateInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocCreateManyInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocUpdateManyMutationInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectStatusCreateInput: ["projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusUpdateInput: ["projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusCreateManyInput: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusUpdateManyMutationInput: ["projectDid", "status", "txHash", "creator", "created"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  StringNullableListFilter: ["equals", "has", "hasEvery", "hasSome", "isEmpty"],
  BoolNullableFilter: ["equals", "not"],
  CapabilityCountOrderByAggregateInput: ["id", "projectDid", "capability", "template", "allow", "validateKYC"],
  CapabilityAvgOrderByAggregateInput: ["id"],
  CapabilityMaxOrderByAggregateInput: ["id", "projectDid", "capability", "template", "validateKYC"],
  CapabilityMinOrderByAggregateInput: ["id", "projectDid", "capability", "template", "validateKYC"],
  CapabilitySumOrderByAggregateInput: ["id"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  BoolNullableWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  PublicCountOrderByAggregateInput: ["key", "cid", "extension", "contentType"],
  PublicMaxOrderByAggregateInput: ["key", "cid", "extension", "contentType"],
  PublicMinOrderByAggregateInput: ["key", "cid", "extension", "contentType"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  IntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  TransactionCountOrderByAggregateInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionAvgOrderByAggregateInput: ["blockResponeCode"],
  TransactionMaxOrderByAggregateInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionMinOrderByAggregateInput: ["hash", "projectDid", "data", "nonce", "signatureType", "signatureValue", "timestamp", "capability", "blockHeight", "blockHash", "blockResponeCode", "blockError"],
  TransactionSumOrderByAggregateInput: ["blockResponeCode"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  IntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  WalletCountOrderByAggregateInput: ["did", "signKey", "verifyKey"],
  WalletMaxOrderByAggregateInput: ["did", "signKey", "verifyKey"],
  WalletMinOrderByAggregateInput: ["did", "signKey", "verifyKey"],
  AgentStatusListRelationFilter: ["every", "some", "none"],
  AgentStatusOrderByRelationAggregateInput: ["_count"],
  AgentCountOrderByAggregateInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentMaxOrderByAggregateInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentMinOrderByAggregateInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentRelationFilter: ["is", "isNot"],
  AgentStatusCountOrderByAggregateInput: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusAvgOrderByAggregateInput: ["id"],
  AgentStatusMaxOrderByAggregateInput: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusMinOrderByAggregateInput: ["id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusSumOrderByAggregateInput: ["id"],
  JsonNullableFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not"],
  EvaluateClaimListRelationFilter: ["every", "some", "none"],
  EvaluateClaimOrderByRelationAggregateInput: ["_count"],
  ClaimCountOrderByAggregateInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  ClaimMaxOrderByAggregateInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "dateTime", "creator", "created"],
  ClaimMinOrderByAggregateInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "dateTime", "creator", "created"],
  JsonNullableWithAggregatesFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  ClaimRelationFilter: ["is", "isNot"],
  EvaluateClaimCountOrderByAggregateInput: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimAvgOrderByAggregateInput: ["id", "version"],
  EvaluateClaimMaxOrderByAggregateInput: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimMinOrderByAggregateInput: ["id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimSumOrderByAggregateInput: ["id", "version"],
  ProjectCountOrderByAggregateInput: ["projectDid", "projectData", "txHash", "creator", "created"],
  ProjectMaxOrderByAggregateInput: ["projectDid", "txHash", "creator", "created"],
  ProjectMinOrderByAggregateInput: ["projectDid", "txHash", "creator", "created"],
  ProjectDocCountOrderByAggregateInput: ["projectDid", "projectDoc", "txHash", "creator", "created"],
  ProjectDocMaxOrderByAggregateInput: ["projectDid", "txHash", "creator", "created"],
  ProjectDocMinOrderByAggregateInput: ["projectDid", "txHash", "creator", "created"],
  ProjectStatusCountOrderByAggregateInput: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusAvgOrderByAggregateInput: ["id"],
  ProjectStatusMaxOrderByAggregateInput: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusMinOrderByAggregateInput: ["id", "projectDid", "status", "txHash", "creator", "created"],
  ProjectStatusSumOrderByAggregateInput: ["id"],
  CapabilityCreateallowInput: ["set"],
  StringFieldUpdateOperationsInput: ["set"],
  CapabilityUpdateallowInput: ["set", "push"],
  NullableBoolFieldUpdateOperationsInput: ["set"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NullableIntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  AgentStatusCreateNestedManyWithoutAgentInput: ["create", "connectOrCreate", "createMany", "connect"],
  AgentStatusUpdateManyWithoutAgentNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  AgentCreateNestedOneWithoutAgentStatusInput: ["create", "connectOrCreate", "connect"],
  AgentUpdateOneRequiredWithoutAgentStatusNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  EvaluateClaimCreateNestedManyWithoutClaimInput: ["create", "connectOrCreate", "createMany", "connect"],
  EvaluateClaimUpdateManyWithoutClaimNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ClaimCreateNestedOneWithoutEvaluateClaimInput: ["create", "connectOrCreate", "connect"],
  ClaimUpdateOneRequiredWithoutEvaluateClaimNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedBoolNullableFilter: ["equals", "not"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedBoolNullableWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedJsonNullableFilter: ["equals", "path", "string_contains", "string_starts_with", "string_ends_with", "array_contains", "array_starts_with", "array_ends_with", "lt", "lte", "gt", "gte", "not"],
  AgentStatusCreateWithoutAgentInput: ["projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusCreateOrConnectWithoutAgentInput: ["where", "create"],
  AgentStatusCreateManyAgentInputEnvelope: ["data", "skipDuplicates"],
  AgentStatusUpsertWithWhereUniqueWithoutAgentInput: ["where", "update", "create"],
  AgentStatusUpdateWithWhereUniqueWithoutAgentInput: ["where", "data"],
  AgentStatusUpdateManyWithWhereWithoutAgentInput: ["where", "data"],
  AgentStatusScalarWhereInput: ["AND", "OR", "NOT", "id", "agentDid", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentCreateWithoutAgentStatusInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  AgentCreateOrConnectWithoutAgentStatusInput: ["where", "create"],
  AgentUpsertWithoutAgentStatusInput: ["update", "create"],
  AgentUpdateWithoutAgentStatusInput: ["agentDid", "projectDid", "email", "name", "role", "txHash", "creator", "created"],
  EvaluateClaimCreateWithoutClaimInput: ["projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimCreateOrConnectWithoutClaimInput: ["where", "create"],
  EvaluateClaimCreateManyClaimInputEnvelope: ["data", "skipDuplicates"],
  EvaluateClaimUpsertWithWhereUniqueWithoutClaimInput: ["where", "update", "create"],
  EvaluateClaimUpdateWithWhereUniqueWithoutClaimInput: ["where", "data"],
  EvaluateClaimUpdateManyWithWhereWithoutClaimInput: ["where", "data"],
  EvaluateClaimScalarWhereInput: ["AND", "OR", "NOT", "id", "claimId", "projectDid", "status", "txHash", "creator", "created", "version"],
  ClaimCreateWithoutEvaluateClaimInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  ClaimCreateOrConnectWithoutEvaluateClaimInput: ["where", "create"],
  ClaimUpsertWithoutEvaluateClaimInput: ["update", "create"],
  ClaimUpdateWithoutEvaluateClaimInput: ["txHash", "claimTemplateId", "projectDid", "context", "type", "issuerId", "claimSubjectId", "items", "dateTime", "creator", "created"],
  AgentStatusCreateManyAgentInput: ["id", "projectDid", "status", "role", "version", "txHash", "creator", "created"],
  AgentStatusUpdateWithoutAgentInput: ["projectDid", "status", "role", "version", "txHash", "creator", "created"],
  EvaluateClaimCreateManyClaimInput: ["id", "projectDid", "status", "txHash", "creator", "created", "version"],
  EvaluateClaimUpdateWithoutClaimInput: ["projectDid", "status", "txHash", "creator", "created", "version"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
> = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

