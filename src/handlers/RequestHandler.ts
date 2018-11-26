import updateProjectStatusProcessor from '../ixo/processor/UpdateProjectStatusProcessor';
import createProjectProcessor from '../ixo/processor/CreateProjectProcessor';
import createAgentProcessor from '../ixo/processor/CreateAgentProcessor';
import evaluateClaimsProcessor from '../ixo/processor/EvaluateClaimsProcessor';
import listAgentsProcessor from '../ixo/processor/ListAgentsProcessor';
import listClaimProcessor from '../ixo/processor/ListClaimsProcessor';
import submitClaimProcessor from '../ixo/processor/SubmitClaimProcessor';
import updateAgentStatusProcessor from '../ixo/processor/UpdateAgentStatusProcessor';
import transactionLogService from '../service/TransactionLogService';
import { dateTimeLogger } from '../logger/Logger';

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
  }
}

const lookupProcessor: any = {
  'project/CreateProject': (jsonResponseMsg: any) => { createProjectProcessor.handleAsyncCreateProjectResponse(jsonResponseMsg) },
  'project/UpdateProjectStatus': (jsonResponseMsg: any) => { updateProjectStatusProcessor.handleAsyncProjectStatusResponse(jsonResponseMsg) },
  'project/CreateAgent': (jsonResponseMsg: any) => { createAgentProcessor.handleAsyncCreateAgentResponse(jsonResponseMsg) },
  'project/UpdateAgent': (jsonResponseMsg: any) => { updateAgentStatusProcessor.handleAsyncUpdateAgentStatusResponse(jsonResponseMsg) },
  'project/CreateClaim': (jsonResponseMsg: any) => { submitClaimProcessor.handleAsyncSubmitClaimResponse(jsonResponseMsg) },
  'project/CreateEvaluation': (jsonResponseMsg: any) => { evaluateClaimsProcessor.handleAsyncEvaluateClaimResponse(jsonResponseMsg) },
  'project/UpdateProjectStatus/rollback': (jsonResponseMsg: any) => { updateProjectStatusProcessor.handleRollbackProjectStatus(jsonResponseMsg) }
}

export const handleResponseFromMessageQueue = (message: any) => {
  let jsonResponseMsg = JSON.parse(message);

  // blockchain node has accepted the transaction, we can go ahead and commit the data
  if (jsonResponseMsg.msgType === 'eth') {
    updateProjectStatusProcessor.handleAsyncEthResponse(jsonResponseMsg);
  } else if (jsonResponseMsg.msgType === 'error') {
    transactionLogService.updateTransactionLogForError(jsonResponseMsg.txHash, jsonResponseMsg.data);
  }
  else {
    //update transaction log with blockchain response data
    var blockResponseCode = jsonResponseMsg.data.code != undefined ? jsonResponseMsg.data.code : undefined;
    blockResponseCode = jsonResponseMsg.data.check_tx != undefined ? jsonResponseMsg.data.check_tx.code : blockResponseCode;
    blockResponseCode = jsonResponseMsg.data.deliver_tx != undefined ? jsonResponseMsg.data.deliver_tx.code : blockResponseCode;
    blockResponseCode = jsonResponseMsg.data.tx_result != undefined ? jsonResponseMsg.data.tx_result.code : blockResponseCode;
    blockResponseCode = blockResponseCode == undefined ? 0 : blockResponseCode;

    transactionLogService.updateTransactionLogForHash(jsonResponseMsg.txHash, jsonResponseMsg.data.hash, jsonResponseMsg.data.height, blockResponseCode)
      .then((result: any) => {
        console.log(dateTimeLogger() + ' transaction log updated with block information for txHash %s %s', jsonResponseMsg.txHash, blockResponseCode);
        if (blockResponseCode >= 1) {
          //here we handle specific rollback tasks if required
          var rollbackProcessor = jsonResponseMsg.msgType + '/rollback';
          if (lookupProcessor[rollbackProcessor] !== undefined) {
            lookupProcessor[rollbackProcessor](jsonResponseMsg);
          }
          console.log(dateTimeLogger() + ' blockchain failed for message %s with code %s', jsonResponseMsg.msgType, blockResponseCode);
        } else {
          console.log(dateTimeLogger() + ' process blockchain response for %s hash %s ', jsonResponseMsg.msgType, jsonResponseMsg.txHash);
          lookupProcessor[jsonResponseMsg.msgType](jsonResponseMsg);

        }
      })
      .catch(() => {
        console.log(dateTimeLogger() + ' transaction log failed to update for txHash ' + jsonResponseMsg.txHash);
      });
  }
}

export class RequestHandler {
  constructor() {
    setInterval(() => {
      mq.subscribe()
        .catch(() => { console.log(dateTimeLogger() + ' exception caught for handleResponseFromMessageQueue') });
    }, 500)
  }
}