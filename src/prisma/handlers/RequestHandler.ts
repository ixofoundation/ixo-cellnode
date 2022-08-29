import updateProjectStatusProcessor from "../ixo/processors/UpdateProjectStatusProcessor";
import updateProjectDocProcessor from "../ixo/processors/UpdateProjectDocProcessor";
import createProjectProcessor from "../ixo/processors/CreateProjectProcessor";
import createAgentProcessor from "../ixo/processors/CreateAgentProcessor";
import evaluateClaimsProcessor from "../ixo/processors/EvaluateClaimsProcessor";
import listAgentsProcessor from "../ixo/processors/ListAgentsProcessor";
import listClaimsProcessor from "../ixo/processors/ListClaimsProcessor";
import listClaimsByTemplateIdProcessor from "../ixo/processors/ListClaimsByTemplateIdProcessor";
import submitClaimProcessor from "../ixo/processors/SubmitClaimProcessor";
import updateAgentStatusProcessor from "../ixo/processors/UpdateAgentStatusProcessor";
import fundProjectProcessor from "../ixo/processors/FundProjectProcessor";

export const RequestLookupHandler: any = {
    "createProject": async (args: any) => {
        return createProjectProcessor.process(args);
    },

    "createAgent": async (args: any) => {
        return createAgentProcessor.process(args);
    },

    "evaluateClaim": async (args: any) => {
        return evaluateClaimsProcessor.process(args);
    },

    "listAgents": async (args: any) => {
        return listAgentsProcessor.process(args);
    },

    "listClaims": async (args: any) => {
        return listClaimsProcessor.process(args);
    },

    "listClaimsByTemplateId": async (args: any) => {
        return listClaimsByTemplateIdProcessor.process(args);
    },

    "submitClaim": async (args: any) => {
        return submitClaimProcessor.process(args);
    },

    "updateAgentStatus": async (args: any) => {
        return updateAgentStatusProcessor.process(args);
    },

    "updateProjectStatus": async (args: any) => {
        return updateProjectStatusProcessor.process(args);
    },

    "updateProjectDoc": async (args: any) => {
        return updateProjectDocProcessor.process(args);
    },

    "fundProject": async (args: any) => {
        return fundProjectProcessor.process(args);
    },
};

export const lookupProcessor: any = {
    "project/CreateProject": (jsonResponseMsg: any) => {
        createProjectProcessor.handleAsyncCreateProjectResponse(jsonResponseMsg);
    },
    "project/UpdateProjectStatus": (jsonResponseMsg: any) => {
        updateProjectStatusProcessor.handleAsyncProjectStatusResponse(jsonResponseMsg);
    },
    "project/UpdateProjectDoc": (jsonResponseMsg: any) => {
        updateProjectDocProcessor.handleAsyncProjectDocResponse(jsonResponseMsg);
    },
    "project/CreateAgent": (jsonResponseMsg: any) => {
        createAgentProcessor.handleAsyncCreateAgentResponse(jsonResponseMsg);
    },
    "project/UpdateAgent": (jsonResponseMsg: any) => {
        updateAgentStatusProcessor.handleAsyncUpdateAgentStatusResponse(jsonResponseMsg);
    },
    "project/CreateClaim": (jsonResponseMsg: any) => {
        submitClaimProcessor.handleAsyncSubmitClaimResponse(jsonResponseMsg);
    },
    "project/CreateEvaluation": (jsonResponseMsg: any) => {
        evaluateClaimsProcessor.handleAsyncEvaluateClaimResponse(jsonResponseMsg);
    },
};