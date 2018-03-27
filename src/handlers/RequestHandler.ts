import { Claim, IClaimModel, ClaimSchema } from '../model/claim/Claim';
import { Evaluation, IEvaluationModel, EvaluationSchema } from '../model/claim/Evaluation';
import { Agent, IAgentModel, AgentSchema, AGENT_ROLE } from '../model/agent/Agent';
import { AgentStatus, IAgentStatusModel, AGENT_STATUS } from '../model/agent/AgentStatus';
import { ITransactionModel, Transaction } from '../model/Transaction';
import { ITransaction } from '../model/ITransaction';
import transactionLog from '../service/TransactionLogService'
import {ValidationError} from "../error/ValidationError";;
import {Request} from "../handlers/Request";
import { IClaim } from '../model/claim/IClaim';


declare var Promise: any;

export class RequestHandler {

    createAgent  = (args: any) => {
        var request = new Request(args);
        return new Promise((resolve: Function, reject: Function) => {
          //Verify the signature
          if(request.verifySignature()){
            resolve(request);
          }
        })
        .then( (request: Request) => {
          //Validate the new Agent
          return new Promise((resolve: Function, reject: Function) => {
            resolve(request);
            // Check that a valid Project TX is supplied
            // Agent.find({"projectTx": request.data.projectTx, "did": request.did}, (err, agents) => {
            //     var role = request.data.role;
            //     agents.forEach((agent) => {
            //       if(agent.role == role) {
            //         reject(new ValidationError("Agent: '" + request.did + "' already exists on the project"));
            //         return
            //       }
            //         // Ensure agent is not an EA and SA
            //       if((agent.role == AGENT_ROLE.SA && role == AGENT_ROLE.EA)
            //           || (agent.role == AGENT_ROLE.EA && role == AGENT_ROLE.SA)) {
            //         reject(new ValidationError('An agent cannot be a Service Agent and an Evaluation agent on the same project'));
            //         return
            //       }
            //     })
            //     // Sets the Status of the Agent
            //     var latestStatus = AGENT_STATUS.Pending;
            //     // if(proj.autoApproveInvestmentAgent && role == AGENT_ROLE.IA){
            //     //   latestStatus = AGENT_STATUS.Approved;
            //     // }else if(proj.autoApproveServiceAgent && role == AGENT_ROLE.SA){
            //     //   latestStatus = AGENT_STATUS.Approved;
            //     // }else if(proj.autoApproveEvaluationAgent && role == AGENT_ROLE.EA){
            //     //   latestStatus = AGENT_STATUS.Approved;
            //     // }
            //     resolve({...request, 'latestStatus': latestStatus});
            //   })
          })
        })
        .then( (request: Request) => {
            return transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey);
        }).then((transaction: ITransactionModel) => {
            // Deep clone the data using JSON
            var obj = {...args.payload.data,
              tx: transaction.hash,
              did: args.signature.creator
            };
            return Agent.create(obj);
        })
      }


      updateAgentStatus = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
          var request = new Request(args);
          if(request.verifySignature()){
            resolve(request);
          }
        }).then( (request: Request) => {
          //Validate the status change
          return new Promise((resolve: Function, reject: Function) => {
              resolve(request);
            // Check that the project owner is making this update
            // Agent.findOne({"tx": request.data.agentTx}, (err, agent) => {
            //   if(agent != null){
            //     Config.findOne({"tx": agent.projectTx}, (err, project) => {
            //       if(project && project.owner.did == request.did){
            //         resolve(request);
            //       }else{
            //         reject(new ValidationError("Only the project owner can update an agents status"));
            //         return;
            //       }
            //     })
            //   }else{
            //     reject(new ValidationError("Agent: '" + request.data.agentTx + "' does not exist"));
            //     return;
            //   }
            // })
          })
    
        }).then( (request: Request) => {
            return transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey);
        }).then((transaction: ITransactionModel) => {
          // Deep clone the data using JSON
          var obj = {...args.payload.data,
            tx: transaction.hash,
            did: args.signature.creator
          };
          return Agent.findOne({"tx": obj.agentTx}).then((agent) => {
            if(agent == null){
              return new Promise((resolve: Function, reject: Function) => {
                reject(new ValidationError("Agent: '" + obj.agentTx + "' does not exist"))
              });
            }else{
              var agentStatus = new AgentStatus(obj);
              return agentStatus.save().then( (agentStatus: any) => {
                //agent.statuses.push(agentStatus);
                //agent.latestStatus = agentStatus.status;
                return agent.save();
              })
            }
          });
        });
      }

    submitClaim = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
          var request = new Request(args);
          if(request.verifySignature()){
            resolve(request);
          }
        }).then( (request: Request) => {
          //Validate the new Claim
           return new Promise((resolve: Function, reject: Function) => {
        //     // Check that a valid Project TX is supplied
        //     Agent.findOne({did: request.did, role: 'SA', projectTx: request.data.projectTx}, (err: any, agent: any) => {
        //       if(agent == null){
        //         reject(new ValidationError("ProjectTx: '" + request.data.projectTx + "' The agent did: '" + request.did + "' is invalid"));
        //       }else{
        //         resolve(request);
        //       }
        //     })
                resolve(request);
           })
        }).then( (request: Request) => {
          return transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey);
        }).then((transaction: ITransactionModel) => {
            // Deep clone the data using JSON
            var obj = {...args.payload.data,
              tx: transaction.hash,
              did: args.signature.creator
            };
            return Claim.create(obj);
        })
      }
    
      evaluateClaim = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
          var request = new Request(args);
          if(request.verifySignature()){
            resolve(request);
          }
        }).then( (request: Request) => {
          //Validate the status change
          return new Promise((resolve: Function, reject: Function) => {
            // Check that the agent making this update is a EA on the project
            // Claim.findOne({"tx": request.data.claimTx}, (err, claim) => {
            //   if(claim != null){
            //     // Check that the agent making the evaluation is a EA on this project
            //     Agent.findOne({did: request.did, projectTx: claim.projectTx, role: 'EA'}, (err: any, agent: any) => {
            //       if(agent){
            //         resolve(request);
            //       }else{
            //         reject(new ValidationError("Only the Evaluation agents on project can evaluate claims"));
            //         return;
            //       }
            //     })
            //   }else{
            //     reject(new ValidationError("Claim: '" + request.data.claimTx + "' does not exist"));
            //     return;
            //   }
            // })
            resolve(request);
          })
        }).then( (request: Request) => {
           return  transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey);
        }).then((transaction: ITransactionModel) => {
          // Deep clone the data using JSON
          var obj = {...args.payload.data,
            tx: transaction.hash,
            did: args.signature.creator
          };
          return Claim.findOne({"tx": obj.claimTx}).then((claim) => {
            if(claim == null){
              return new Promise((resolve: Function, reject: Function) => {
                reject(new ValidationError("Claim: '" + obj.claimTx + "' does not exist"))
              });
            }else{
              var evaluation = new Evaluation(obj);
              return evaluation.save().then( (evaluation: any) => {
                //claim.evaluations.push(evaluation);
                //claim.latestEvaluation = evaluation.result;
                return claim.save();
              })
            }
          });
        });
      }


}