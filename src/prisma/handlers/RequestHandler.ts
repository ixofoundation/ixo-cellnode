import updateProjectStatusProcessor from '../ixo/processors/UpdateProjectStatusProcessor';
import updateProjectDocProcessor from '../ixo/processors/UpdateProjectDocProcessor';
import createProjectProcessor from '../ixo/processors/CreateProjectProcessor';
import createAgentProcessor from '../ixo/processors/CreateAgentProcessor';
import evaluateClaimsProcessor from '../ixo/processors/EvaluateClaimsProcessor';
import listAgentsProcessor from '../ixo/processors/ListAgentsProcessor';
import listClaimsProcessor from '../ixo/processors/ListClaimsProcessor';
import listClaimsByTemplateIdProcessor from '../ixo/processors/ListClaimsByTemplateIdProcessor';
import submitClaimProcessor from '../ixo/processors/SubmitClaimProcessor';
import updateAgentStatusProcessor from '../ixo/processors/UpdateAgentStatusProcessor';
import fundProjectProcessor from '../ixo/processors/FundProjectProcessor';
import * as transactionLogService from "../services/TransactionService";
import { dateTimeLogger } from '../../logger/Logger';
