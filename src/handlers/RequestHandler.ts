//import { Claim, IClaimModel, ClaimSchema } from '../model/claim/Claim';
//import { Evaluation, IEvaluationModel, EvaluationSchema } from '../model/claim/Evaluation';
//import { Agent, IAgentModel, AgentSchema, AGENT_ROLE } from '../model/agent/Agent';
//import { AgentStatus, IAgentStatusModel, AGENT_STATUS } from '../model/agent/AgentStatus';
import { ITransactionModel, Transaction } from '../model/project/Transaction';
import { ITransaction } from '../model/project/ITransaction';
import transactionLog from '../service/TransactionLogService'
import {ValidationError} from "../error/ValidationError";;
import {Request} from "../handlers/Request";
//import { IClaim } from '../model/claim/IClaim';
import configService from '../service/ConfigurationService';
import {TemplateUtils} from '../templates/TemplateUtils';

import { Document, Schema, Model, model} from "mongoose";
import { json } from 'body-parser';
import { IConfigModel } from '../model/project/Config';
import { isValidJson } from '../templates/JsonValidator';


/////////////////////////////////////////////////
//  HANDLE AGENT MODEL                         //
/////////////////////////////////////////////////
export interface IAgentModel extends Document {
}

var AgentSchema: Schema = new Schema({}, {strict: false});

AgentSchema.pre("save", function(next) {
  next();
 });

export const Agent: Model<IAgentModel> = model<IAgentModel>("Agent", AgentSchema);

/////////////////////////////////////////////////
//  HANDLE CLAIM MODEL                         //
/////////////////////////////////////////////////
export interface IClaimModel extends Document {
}

var ClaimSchema: Schema = new Schema({}, {strict: false});

ClaimSchema.pre("save", function(next) {
  next();
 });

export const Claim: Model<IClaimModel> = model<IClaimModel>("Claim", ClaimSchema);

declare var Promise: any;

/////////////////////////////////////////////////
//  HANDLE AGENT REQUESTS                      //
/////////////////////////////////////////////////

export class RequestHandler {

    createAgent = (args: any) => {
      var request = new Request(args);
      return new Promise((resolve: Function, reject: Function) => {
        console.log('first verify that the payload is according to schema expected');
        configService.findConfig().then ((config: IConfigModel) => {
          console.log('FOUND CONFIG ' + config);
          config.requestType.some(function(rt: any) {
            console.log('CHECK CONFIG IN LOOP ' + rt.type)
            if(rt.type == 'CreateAgent'){
              console.log('FOUND REQUEST TYPE ' + rt.type);
              var tu = new TemplateUtils();
              tu.getTemplate(rt.template, 'default').then((schema: any) =>{
                console.log('VALIDATE AGAINST SCHEMA ' + JSON.stringify(schema));
                console.log('WITH REQUEST + ' + JSON.stringify(args));
                if (isValidJson(schema, args)) {                  
                  console.log('next we verify the signature');
                  if (request.verifySignature()){
                    console.log('write transaction to log as sig has been verified')
                    transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey)
                      .then((transaction: ITransactionModel) => {
                        var agent = {...request.data,
                                    tx: transaction.hash,
                                    did: request.signature.creator
                                  };
                        resolve(Agent.create(agent));
                      });
                  }; 
                };
              });
            }
            return rt.type === 'CreateAgent';
          })        
        });
      });
    }
 
    // createAgent  = (args: any) => {
    //     var request = new Request(args);        
    //     return new Promise((resolve: Function, reject: Function) => {
    //       //Verify the signature
    //       if(request.verifySignature()){
    //         resolve(request);
    //       }
    //     })
    //     .then((request: Request) => {
    //       return new Promise((resolve: Function, reject: Function) => { 
    //         resolve(config.findConfig());  
    //       })  
    //     })
    //     //here we need to validate the payload against the schema for this request
    //     .then((configuration: IConfigModel) => {
    //       return new Promise((resolve: Function, reject: Function) => {
    //         configuration.requestType.forEach(function(obj: any) { 
    //           if (obj.type == 'CreateAgent') {
    //             console.log('WE HAVE RECEIVED CREATE AGENT TEMPLATE ' + obj.template)
    //             var tu = new TemplateUtils();
    //             isValidJson(tu.getTemplate(obj.template, 'default'), request);
    //             resolve(tu.getTemplate(obj.template, 'default'));
    //           }
    //         });
    //       }).then ((template: any) => {
    //         console.log('THIS IS TEMPLATE RESPONSE ' + template);
    //       })
    //     })
    //     .then((request: Request) => {
    //       //Validate the new Agent
    //       return new Promise((resolve: Function, reject: Function) => {            
    //         // Check that a valid Project TX is supplied
    //         console.log('FIND PROJECT WITH DID ' + request.did);
    //         var result = config.findConfigForDid(request.did);
    //         console.log('FOUND PROJECT WITH DID ' + JSON.stringify(result));
    //         if (result != null) {
    //             resolve(request);
    //         } else {
    //             reject(new ValidationError("Project not created"));
    //         }
    //       })
    //     })
    //     .then((request: Request) => {
    //         return transactionLog.createTransaction(request.payload, request.signature.type, request.signature.signature, request.signature.publicKey);
    //     }).then((transaction: ITransactionModel) => {
    //         // Deep clone the data using JSON
    //         var obj = {...args.payload.data,
    //           tx: transaction.hash,
    //           did: args.signature.creator
    //         };
    //         return Agent.create(obj);
    //     })
    //   }


      updateAgentStatus = (args: any) => {
        return new Promise((resolve: Function, reject: Function) => {
          var request = new Request(args);
          if(request.verifySignature()){
            resolve(request);
          }
        }).then((request: Request) => {
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
              //var agentStatus = new AgentStatus(obj);
              //return agentStatus.save().then( (agentStatus: any) => {
                //agent.statuses.push(agentStatus);
                //agent.latestStatus = agentStatus.status;
              //  return agent.save();
              //})
            }
          });
        });
      }

/////////////////////////////////////////////////
//  HANDLE CLAIM REQUESTS                      //
/////////////////////////////////////////////////


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
              //var evaluation = new Evaluation(obj);
              //return evaluation.save().then( (evaluation: any) => {
                //claim.evaluations.push(evaluation);
                //claim.latestEvaluation = evaluation.result;
              //  return claim.save();
              //})
            }
          });
        });
      }
}