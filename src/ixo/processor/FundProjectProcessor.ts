import {AbstractHandler} from '../../handlers/AbstractHandler';
import {IProjectStatusModel, ProjectStatus} from '../model/ProjectStatusModel';
import {Request} from "../../handlers/Request";
import {BlockchainURI, workflow} from '../common/shared';
import {dateTimeLogger} from '../../logger/Logger';
import xss from "../../Xss";

export class FundProjectProcessor extends AbstractHandler {

  updateCapabilities = (request: Request) => {
  }

  msgToPublish = (txHash: any, request: Request) => {
    return new Promise((resolve: Function, reject: Function) => {
      const data = {
        data: {
          status: request.data.status,
          ethFundingTxnID: request.data.txnID
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      }
      const sanitizedData = xss.sanitize(data);
      const blockChainPayload = {
        payload: [{type: "project/UpdateProjectStatus", value: sanitizedData}]
      }
      resolve(this.messageForBlockchain(blockChainPayload, request.projectDid, 'project/UpdateProjectStatus', BlockchainURI.commit));
    });
  }

  getLatestProjectStatus = (projectDid: string): Promise<IProjectStatusModel[]> => {
    return new Promise((resolve: Function) => {
      resolve(ProjectStatus.find({projectDid: projectDid}).limit(1).sort({$natural: -1}))
    })
  }

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new Fund Project transaction ');
    let request = new Request(args);
    return this.createTransaction(args, 'FundProject', ProjectStatus, (request: any): Promise<boolean> => {
      return new Promise((resolve: Function, reject: Function) => {
        if (workflow.indexOf(request.data.status) !== 0) {
          this.getLatestProjectStatus(request.projectDid)
            .then((current: IProjectStatusModel[]) => {
              // check that the status can only roll forward by 1 or backwards
              if (current.length > 0) {
                if (workflow.indexOf(request.data.status) - 1 <= workflow.indexOf(current[0].status)) {
                  resolve(true);
                } else {
                  console.log(dateTimeLogger() + ' Invalid status workflow ' + request.data.status);
                  reject("Invalid status workflow");
                }
              } else {
                console.log(dateTimeLogger() + ' no status exists for project ' + request.projectDid);
                reject('No status exists for project ' + request.projectDid);
              }
            })
        } else {
          resolve(true)
        }
      });
    })
  }
}

export default new FundProjectProcessor();
