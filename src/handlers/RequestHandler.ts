import updateProjectStatusProcessor from '../ixo/processor/UpdateProjectStatusProcessor';
import createProjectProcessor from '../ixo/processor/CreateProjectProcessor';
import createAgentProcessor from '../ixo/processor/CreateAgentProcessor';
import evaluateClaimsProcessor from '../ixo/processor/EvaluateClaimsProcessor';
import listAgentsProcessor from '../ixo/processor/ListAgentsProcessor';
import listClaimProcessor from '../ixo/processor/ListClaimsProcessor';
import submitClaimProcessor from '../ixo/processor/SubmitClaimProcessor';
import updateAgentStatusProcessor from '../ixo/processor/UpdateAgentStatusProcessor';
import { Status } from '../ixo/common/shared';

import mq from '../MessageQ';

export class RequestHandler {

  constructor() {
    setInterval(() => {
      mq.subscribe()
        .then((response: any) => {
          this.handleResponseFromMessageQueue(response);
        });
    }, 2000)
  }

  handleResponseFromMessageQueue = (message: any) => {
    let jsonResponseMsg = JSON.parse(message);

    if (jsonResponseMsg.msgType === 'eth') {
      updateProjectStatusProcessor.handleAsyncResponse(jsonResponseMsg);
    }

    if (jsonResponseMsg.msgType === 'project/CreateProject') {
      var data: any = {
        projectDid: jsonResponseMsg.projectDid,
        status: Status.created
      }
      updateProjectStatusProcessor.selfSignMessage(data, jsonResponseMsg.projectDid)
        .then((signature: any) => {
          var projectStatusRequest: any = {
            payload: {
              template: {
                name: "project_status"
              },
              data: data
            },
            signature: {
              type: "ed25519-sha-256",
              created: new Date().toISOString(),
              creator: jsonResponseMsg.projectDid,
              signatureValue: signature
            }
          }
          updateProjectStatusProcessor.process(projectStatusRequest);
        });
    }
  }

  createProject = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(createProjectProcessor.process(args));
    });
  }

  createAgent = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(createAgentProcessor.process(args));
    });
  }

  evaluateClaim = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(evaluateClaimsProcessor.process(args));
    });
  }

  listAgents = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(listAgentsProcessor.process(args));
    });
  }

  listClaims = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(listClaimProcessor.process(args));
    });
  }

  submitClaim = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(submitClaimProcessor.process(args));
    });
  }

  updateAgentStatus = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(updateAgentStatusProcessor.process(args));
    });
  }

  updateProjectStatus = (args: any) => {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(updateProjectStatusProcessor.process(args));
    });
  }
}