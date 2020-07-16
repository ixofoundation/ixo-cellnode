import updateProjectStatusProcessor from '../ixo/processor/UpdateProjectStatusProcessor';
import createProjectProcessor from '../ixo/processor/CreateProjectProcessor';
import createAgentProcessor from '../ixo/processor/CreateAgentProcessor';
import evaluateClaimsProcessor from '../ixo/processor/EvaluateClaimsProcessor';
import listAgentsProcessor from '../ixo/processor/ListAgentsProcessor';
import listClaimProcessor from '../ixo/processor/ListClaimsProcessor';
import submitClaimProcessor from '../ixo/processor/SubmitClaimProcessor';
import updateAgentStatusProcessor from '../ixo/processor/UpdateAgentStatusProcessor';
import fundProjectProcessor from '../ixo/processor/FundProjectProcessor';
import transactionLogService from '../service/TransactionLogService';
import {dateTimeLogger} from '../logger/Logger';

import mq from '../MessageQ';

export const RequestLookupHandler: any = {
  'createProject': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(createProjectProcessor.process(args));
    });
  },

  'createAgent': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(createAgentProcessor.process(args));
    });
  },

  'evaluateClaim': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(evaluateClaimsProcessor.process(args));
    });
  },

  'listAgents': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(listAgentsProcessor.process(args));
    });
  },

  'listClaims': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(listClaimProcessor.process(args));
    });
  },

  'submitClaim': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(submitClaimProcessor.process(args));
    });
  },

  'updateAgentStatus': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(updateAgentStatusProcessor.process(args));
    });
  },

  'updateProjectStatus': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(updateProjectStatusProcessor.process(args));
    });
  },

  'fundProject': (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(fundProjectProcessor.process(args));
    });
  }
};

const lookupProcessor: any = {
  'project/CreateProject': (jsonResponseMsg: any) => {
    createProjectProcessor.handleAsyncCreateProjectResponse(jsonResponseMsg)
  },
  'project/UpdateProjectStatus': (jsonResponseMsg: any) => {
    updateProjectStatusProcessor.handleAsyncProjectStatusResponse(jsonResponseMsg)
  },
  'project/CreateAgent': (jsonResponseMsg: any) => {
    createAgentProcessor.handleAsyncCreateAgentResponse(jsonResponseMsg)
  },
  'project/UpdateAgent': (jsonResponseMsg: any) => {
    updateAgentStatusProcessor.handleAsyncUpdateAgentStatusResponse(jsonResponseMsg)
  },
  'project/CreateClaim': (jsonResponseMsg: any) => {
    submitClaimProcessor.handleAsyncSubmitClaimResponse(jsonResponseMsg)
  },
  'project/CreateEvaluation': (jsonResponseMsg: any) => {
    evaluateClaimsProcessor.handleAsyncEvaluateClaimResponse(jsonResponseMsg)
  }
};

export const handleResponseFromMessageQueue = (message: any) => {
  const jsonMsg = JSON.parse(message);

  // blockchain node has accepted the transaction, we can go ahead and commit the data
  if (jsonMsg.msgType === 'eth') {
    updateProjectStatusProcessor.handleAsyncEthResponse(jsonMsg);
  } else if (jsonMsg.msgType === 'error') {
    transactionLogService.updateTransactionLogForError(jsonMsg.txHash, jsonMsg.data);
  } else {
    // update transaction log with blockchain response data (default: 0, meaning no error)
    let responseCode = jsonMsg.data.code || 0;
    transactionLogService.updateTransactionLogForHash(jsonMsg.txHash, jsonMsg.data.txhash, jsonMsg.data.height, responseCode)
      .then((result: any) => {
        console.log(dateTimeLogger() + ' transaction log updated with block information for txHash %s %s', jsonMsg.txHash, responseCode);
        if (responseCode >= 1) {
          transactionLogService.updateTransactionLogForError(jsonMsg.txHash, JSON.stringify(jsonMsg.data));
          console.log(dateTimeLogger() + ' blockchain failed for message %s with code %s', jsonMsg.msgType, responseCode);
        } else {
          console.log(dateTimeLogger() + ' process blockchain response for %s hash %s ', jsonMsg.msgType, jsonMsg.txHash);
          lookupProcessor[jsonMsg.msgType](jsonMsg);
        }
      })
      .catch(() => {
        console.log(dateTimeLogger() + ' transaction log failed to update for txHash ' + jsonMsg.txHash);
      });
  }
};

export class RequestHandler {
  constructor() {
    setInterval(() => {
      mq.subscribe()
        .catch(() => {
          console.log(dateTimeLogger() + ' exception caught for handleResponseFromMessageQueue')
        });
    }, 500)
  }
}
