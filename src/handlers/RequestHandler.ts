import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { Request } from "../handlers/Request";
import axios from 'axios';
import InitHandler from './InitHandler';

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');
const ETHEREUM_API = (process.env.ETHEREUM_API || '');


enum Status {
  created = "CREATED",
  pending = "PENDING",
  funded = "FUNDED",
  started = "STARTED",
  stopped = "STOPPED",
  payout = "PAIDOUT"
}

const workflow = ["CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED", "PAIDOUT"];
const blockheight = 6;

/////////////////////////////////////////////////
//  PROJECT  STATUS MODEL                      //
/////////////////////////////////////////////////

export interface IProjectStatusModel extends Document {
  status: string
}

var ProjectStatusSchema: Schema = new Schema({
  status: String
}, { strict: false });

ProjectStatusSchema.pre("save", function (next) {
  next();
});

export const ProjectStatus: Model<IProjectStatusModel> = model<IProjectStatusModel>("ProjectStatus", ProjectStatusSchema);

ProjectStatus.on("postCommit", function (obj) {
  if (obj.status === Status.pending) {
    let requestHandler = new RequestHandler();
    let message = {
      msgType: "eth",
      data: obj.txnID, // "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
      projectDid: obj.projectDid
    }
    requestHandler.publishMessageToQueue(message);
  }
});

/////////////////////////////////////////////////
//  PROJECT MODEL                              //
/////////////////////////////////////////////////

export interface IProjectModel extends Document {
  autoApprove: [string],
  evaluatorPayPerClaim: number
}

var ProjectSchema: Schema = new Schema({
  autoApprove: [],
  evaluatorPayPerClaim: Number
}, { strict: false });

ProjectSchema.pre("save", function (next) {
  next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);

Project.on("postCommit", function (obj, projectDid) {
  let requestHandler = new RequestHandler();
  var data: any = {
    projectDid: projectDid,
    status: Status.created
  }
  requestHandler.selfSignMessage(data, projectDid)
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
          creator: projectDid,
          signatureValue: signature
        }
      }
      requestHandler.updateProjectStatus(projectStatusRequest);
    });
});

/////////////////////////////////////////////////
//   AGENT MODEL                               //
/////////////////////////////////////////////////
export interface IAgentModel extends Document { role: string }

var AgentSchema: Schema = new Schema({
  role: String
}, { strict: false });

AgentSchema.pre("save", function (next) {
  next();
});

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

Agent.on("postCommit", function (obj) {
  Project.findOne({
    projectDid: obj.projectDid
  }).then((project) => {
    if (project) {
      let status = (project.autoApprove.some(function (element) { return (obj.role === element) })) ? "1" : "0";
      let requestHandler = new RequestHandler();
      var data: any = {
        projectDid: obj.projectDid,
        status: status,
        agentDid: obj.agentDid,
        role: obj.role
      }
      requestHandler.selfSignMessage(data, obj.projectDid)
        .then((signature: any) => {
          var statusRequest: any = {
            payload: {
              template: {
                name: "agent_status"
              },
              data: data
            },
            signature: {
              type: "ed25519-sha-256",
              created: new Date().toISOString(),
              creator: obj.projectDid,
              signatureValue: signature
            }
          }
          requestHandler.updateAgentStatus(statusRequest);
        });
    }
  });
});

/////////////////////////////////////////////////
//   AGENT STATUS MODEL                        //
/////////////////////////////////////////////////

export interface IAgentStatusModel extends Document { }

var AgentStatusSchema: Schema = new Schema({}, { strict: false });

AgentStatusSchema.pre("save", function (next) {
  next();
});

export const AgentStatus: Model<IAgentStatusModel> = model<IAgentStatusModel>("AgentStatus", AgentStatusSchema);

/////////////////////////////////////////////////
//   CLAIM MODEL                               //
/////////////////////////////////////////////////
export interface IClaimModel extends Document { }

var ClaimSchema: Schema = new Schema({}, { strict: false });

ClaimSchema.pre("save", function (next) {
  next();
});

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);

/////////////////////////////////////////////////
//   EVALUATE CLAIM MODEL                      //
/////////////////////////////////////////////////
export interface IEvaluateClaimModel extends Document { }

var EvaluateClaimSchema: Schema = new Schema({}, { strict: false });

EvaluateClaimSchema.pre("save", function (next) {
  next();
});

export const EvaluateClaim: Model<IEvaluateClaimModel> = model<IEvaluateClaimModel>("EvaluateClaim", EvaluateClaimSchema);


//////////////////////////////////////////////////
//   REQUEST HANDLER CLASS                      //
//////////////////////////////////////////////////

export class RequestHandler extends AbstractHandler {

  constructor() {
    super();
    setInterval(() => {
      this.subscribeToMessageQueue()
        .then((response) => {
          this.handleResponseFromMessageQueue(response);
        });
    }, 2000)
  }

  handleResponseFromMessageQueue(message: any) {
    let jsonMsg = JSON.parse(message);
    if (jsonMsg.msgType === 'eth') {
      axios({
        method: 'post',
        url: ETHEREUM_API,
        data: { jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }
      })
        .then((response) => {
          if (parseInt(response.data.result, 16) - parseInt(jsonMsg.data.blockNumber, 16) > blockheight) {
            var data: any = {
              projectDid: jsonMsg.projectDid,
              status: Status.funded
            }
            this.selfSignMessage(data, jsonMsg.projectDid)
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
                    creator: jsonMsg.projectDid,
                    signatureValue: signature
                  }
                }
                this.updateProjectStatus(projectStatusRequest);
              });
          } else {            
            let message = {
              msgType: "eth",
              data: jsonMsg.txnID, //"0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
              projectDid: jsonMsg.projectDid
            }
            setTimeout(() => {
              this.publishMessageToQueue(message);
            }, 30000)
            
          }
        })
    }
  }

  updateCapabilities(request: Request, methodCall: string) {
    switch (methodCall) {
      case 'UpdateAgentStatus': {
        if (request.data.role === 'SA' && request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
        if (request.data.role === 'EA' && request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
        if (request.data.status === '1') this.addCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
        if (request.data.role === 'SA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'SubmitClaim');
        if (request.data.role === 'EA' && request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'EvaluateClaim');
        if (request.data.status === '2') this.removeCapabilities(request.projectDid, request.data.agentDid, 'ListClaims');
        break;
      }
      case 'CreateProject': {
        this.addCapabilities(request.projectDid, 'did:sov:*', 'CreateAgent');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateAgentStatus');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListAgents');
        this.addCapabilities(request.projectDid, request.signature.creator, 'ListClaims');
        this.addCapabilities(request.projectDid, request.signature.creator, 'UpdateProjectStatus');
        this.addCapabilities(request.projectDid, request.projectDid, 'UpdateProjectStatus');
        break;
      }
      default: {
        break;
      }
    }
  }

  msgToPublish(obj: any, request: Request, methodCall: string): any {
    return new Promise((resolve: Function, reject: Function) => {
      var blockChainPayload: any;
      var txHash = obj.txHash;
      delete obj.version;
      delete obj.txHash;
      delete obj._creator;
      delete obj._created;
      switch (methodCall) {
        case 'CreateProject': {
          delete obj.autoApprove;
          blockChainPayload = {
            payload: [16, {
              data: {
                ...obj,
                createdOn: request.signature.created,
                createdBy: request.signature.creator
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid,
              pubKey: this.getWallet().verifyKey
            }]
          }
          break;
        }
        case 'CreateAgent': {
          blockChainPayload = {
            payload: [17, {
              data: {
                did: obj.agentDid,
                role: obj.role,
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }
          break;
        }
        case 'UpdateAgentStatus': {
          blockChainPayload = {
            payload: [18, {
              data: {
                did: obj.agentDid,
                status: obj.status,
                role: obj.role
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }

          break;
        }
        case 'SubmitClaim': {
          blockChainPayload = {
            payload: [19, {
              data: {
                claimID: txHash
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }
          break;
        }
        case 'EvaluateClaim': {
          blockChainPayload = {
            payload: [20, {
              data: {
                claimID: obj.claimId,
                status: obj.status
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }

          break;
        }
        case 'UpdateProjectStatus': {
          blockChainPayload = {
            payload: [21, {
              data: {
                status: obj.status,
                txnID: obj.txnID
              },
              txHash: txHash,
              senderDid: request.signature.creator,
              projectDid: request.projectDid
            }]
          }

          break;
        }
        default: {
          reject('Capability does not exist')
          break;
        }
      }
      resolve(this.signMessageForBlockchain(blockChainPayload, request.projectDid));
    });
  }

  checkKycCredentials = (didDoc: any): boolean => {
    if (didDoc.credentials) {
      didDoc.credentials.forEach((element: any) => {
        if (element.credential.claim.KYCValidated === true) {
          return true;
        }
      });
    }
    return false;
  }

  preVerifyDidSignature(didDoc: any, request: Request, capability: string) {
    if (capability === 'CreateProject') {
      return this.checkKycCredentials(didDoc);
    }

    if (capability === 'CreateAgent') {
      if (request.data.role != 'SA') {
        return this.checkKycCredentials(didDoc);
      }
    }

    return true;
  }


  /////////////////////////////////////////////////
  //  HANDLE PROJECT REQUESTS                    //
  /////////////////////////////////////////////////

  createProject = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.generateProjectWallet()
      .then((did: any) => {
        return InitHandler.initialise(did)
          .then((response: any) => {
            return this.createTransaction(args, 'CreateProject', Project, undefined, did);
          });
      });
  }

  getLatestProjectStatus = (projectDid: string): Promise<IProjectStatusModel> => {
    return new Promise(function (resolve: Function) {
      resolve(ProjectStatus.find({ projectDid: projectDid }).limit(1).sort({ $natural: -1 }))
    })
  }

  updateProjectStatus = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    let request = new Request(args);
    if (workflow.indexOf(request.data.status) === 0) {
      return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus);
    } else {
      return this.getLatestProjectStatus(request.projectDid)
        .then((current: IProjectStatusModel) => {
          if (workflow[workflow.indexOf(request.data.status) - 1] === current.status) {
            return this.createTransaction(args, 'UpdateProjectStatus', ProjectStatus);
          }
          console.log(new Date().getUTCMilliseconds() + ' Invalid status request ' + request.data.status);
          return "Invalid status request";
        })
    }
  }

  /////////////////////////////////////////////////
  //  HANDLE AGENT REQUESTS                      //
  /////////////////////////////////////////////////

  createAgent = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'CreateAgent', Agent, function (request: any): Promise<boolean> {
      return new Promise(function (resolve: Function, reject: Function) {
        Agent.find(
          {
            projectDid: request.data.projectDid,
            agentDid: request.data.agentDid
          },
          function (error: Error, results: IAgentModel[]) {
            if (error) {
              reject(error);
            } else {
              results.forEach(element => {
                if (element.role === request.data.role) resolve(true);
                if (element.role === 'EA' && request.data.role === 'SA') resolve(true);
                if (element.role === 'SA' && request.data.role === 'EA') resolve(true);
              });
              resolve(false);
            }
          });
      });
    });
  }


  updateAgentStatus = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'UpdateAgentStatus', AgentStatus, function (request: any): Promise<boolean> {
      let newVersion = request.version + 1;
      return new Promise(function (resolve: Function, reject: Function) {
        AgentStatus.findOne(
          {
            projectDid: request.data.projectDid,
            agentDid: request.data.agentDid,
            version: newVersion
          },
          function (error: Error, result: IAgentStatusModel) {
            if (error) {
              reject(error);
            } else {
              if (result) {
                resolve(true);
              }
              resolve(false);
            }
          }).limit(1);
      });
    })
  }

  listAgents = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.queryTransaction(args, 'ListAgents', function (filter: any): Promise<any[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Agent.aggregate([
          {
            $match: filter
          },
          {
            $lookup: {
              "from": "agentstatuses",
              let: {
                "agentDid": "$agentDid",
                "projectDid": "$projectDid"
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: [
                            "$agentDid",
                            "$$agentDid"
                          ]
                        },
                        {
                          $eq: [
                            "$projectDid",
                            "$$projectDid"
                          ]
                        }
                      ]
                    }
                  }
                }
              ],
              as: "currentStatus"
            }
          },
          { $unwind: { path: "$currentStatus", preserveNullAndEmptyArrays: true } },
          { $sort: { "currentStatus.version": -1 } },
          {
            $group: {
              "_id": "$_id",
              "name": { $first: "$name" },
              "agentDid": { $first: "$agentDid" },
              "projectDid": { $first: "$projectDid" },
              "role": { $first: "$role" },
              "email": { $first: "$email" },
              "currentStatus": { $first: "$currentStatus" }
            }
          }
        ],
          function (error: Error, result: any[]) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
      });
    });
  }

  /////////////////////////////////////////////////
  //  HANDLE CLAIM REQUESTS                      //
  /////////////////////////////////////////////////

  submitClaim = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.createTransaction(args, 'SubmitClaim', Claim);
  }

  checkForFunds(projectDid: string): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => {
      console.log(new Date().getUTCMilliseconds() + ' confirm funds exists');
      axios.get(BLOCKCHAIN_URI_REST + 'project/getProjectAccounts/' + projectDid)
        .then((response) => {
          if (response.status == 200 && (response.data instanceof Array)) {
            response.data.forEach((element: any) => {
              if (element.did == projectDid) {
                Project.findOne({
                  projectDid: projectDid
                })
                  .then((project) => {
                    if (project) {
                      resolve(element.balance - project.evaluatorPayPerClaim >= 0);
                    } else {
                      console.log(new Date().getUTCMilliseconds() + ' check for funds no project found for projectDid ' + projectDid);
                      resolve(false);
                    }
                  })
                  .catch((err) => {
                    console.log(new Date().getUTCMilliseconds() + ' error processing check for funds ' + err)
                    resolve(false);
                  });
              }
            })
          }
          else {
            console.log(new Date().getUTCMilliseconds() + ' no valid response check for funds from blockchain ' + response.statusText);
            resolve(false);
          }
        })
        .catch((reason) => {
          console.log(new Date().getUTCMilliseconds() + ' check for funds could not connect to blockchain ' + reason);
          resolve(false);
        });
    });
  };

  evaluateClaim = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.checkForFunds(new Request(args).projectDid)
      .then((resp: boolean) => {
        if (resp) {
          return this.createTransaction(args, 'EvaluateClaim', EvaluateClaim, function (request: any): Promise<boolean> {
            let newVersion = request.version + 1;
            return new Promise(function (resolve: Function, reject: Function) {
              EvaluateClaim.findOne(
                {
                  projectDid: request.data.projectDid,
                  claimId: request.data.claimId,
                  version: newVersion
                },
                function (error: Error, result: IEvaluateClaimModel) {
                  if (error) {
                    reject(error);
                  } else {
                    if (result) {
                      resolve(true);
                    }
                    resolve(false);
                  }
                }).limit(1);
            });
          });
        }
        console.log(new Date().getUTCMilliseconds() + ' insufficient funds available');
        return 'Insufficient funds available';
      });
  }

  listClaims = (args: any) => {
    console.log(new Date().getUTCMilliseconds() + ' start new transaction ' + JSON.stringify(args));
    return this.queryTransaction(args, 'ListClaims', function (filter: any): Promise<any[]> {
      return new Promise(function (resolve: Function, reject: Function) {
        Claim.aggregate([
          {
            $match: filter
          },
          {
            $lookup: {
              "from": "evaluateclaims",
              "localField": "txHash",
              "foreignField": "claimId",
              "as": "evaluations"
            }
          },
          { $sort: { "evaluations.version": -1 } }
        ],
          function (error: Error, result: any[]) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
      });
    });
  }
}