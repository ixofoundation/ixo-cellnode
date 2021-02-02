import {AbstractHandler} from '../../handlers/AbstractHandler';
import {Claim} from '../model/ClaimModel';
import {Request} from "../../handlers/Request";
import {dateTimeLogger} from '../../logger/Logger';
import {Agent} from '../model/AgentModel';

export class ListClaimsByTemplateIdProcessor extends AbstractHandler {

  updateCapabilities = (request: Request) => {
  }

  msgToPublish = (obj: any, request: Request) => {
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new List Claims by template ID transaction ');
    return this.queryTransaction(args, 'ListClaimsByTemplateId', (filter: any): Promise<any[]> => {
      return new Promise((resolve: Function, reject: Function) => {
        Agent.aggregate([
          {
            $match: {
              projectDid: filter.projectDid,
              _creator: filter.signature.creator
            }
          }
        ])
          .then((agent: any) => {
            if (agent[0].role === "SA") {
              Claim.aggregate([
                  {
                    $match: {
                      projectDid: filter.projectDid,
                      claimTemplateId: filter.data.claimTemplateId,
                      _creator: filter.signature.creator
                    }
                  },
                  {
                    $lookup: {
                      "from": "evaluateclaims",
                      "localField": "txHash",
                      "foreignField": "claimId",
                      "as": "evaluations"
                    }
                  },
                  {$sort: {"evaluations.version": -1}}
                ],
                (error: Error, result: any[]) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                });
            } else {
              Claim.aggregate([
                  {
                    $match: filter.data
                  },
                  {
                    $lookup: {
                      "from": "evaluateclaims",
                      "localField": "txHash",
                      "foreignField": "claimId",
                      "as": "evaluations"
                    }
                  },
                  {$sort: {"evaluations.version": -1}}
                ],
                (error: Error, result: any[]) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                });
            }
          })

      });
    });
  }
}

export default new ListClaimsByTemplateIdProcessor();
