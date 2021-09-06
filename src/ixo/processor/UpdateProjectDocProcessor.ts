import {AbstractHandler} from '../../handlers/AbstractHandler';
import {ProjectDoc} from '../model/ProjectDocModel';
import {Request} from "../../handlers/Request";
import {BlockchainMode} from '../common/shared';
import {dateTimeLogger} from '../../logger/Logger';
import Cache from '../../Cache';
import xss from "../../Xss";

export class UpdateProjectDocProcessor extends AbstractHandler {

  updateCapabilities = (request: Request) => {
  };

  handleAsyncProjectDocResponse = (jsonResponseMsg: any, retries?: number) => {
    //successful doc response
    Cache.get(jsonResponseMsg.txHash)
      .then((cached) => {
        if (cached != undefined) {
          console.log(dateTimeLogger() + ' updating the project doc capabilities');
          this.updateCapabilities(cached);
          console.log(dateTimeLogger() + ' commit project doc to Elysian');
          const obj = {
            ...cached.data,
            txHash: jsonResponseMsg.txHash,
            _creator: cached.signature.creator,
            _created: cached.signature.created
          };
          const sanitizedData = xss.sanitize(obj);
          ProjectDoc.create({...sanitizedData, projectDid: cached.projectDid});
          ProjectDoc.emit('postCommit', obj, cached.projectDid);
          // TODO: update project doc in Project database, probably using Project.update(...)
          console.log(dateTimeLogger() + ' Update project doc transaction completed successfully');
        } else {
          let retry: number = retries || 0;
          if (retry <= 3) {
            retry++;
            setTimeout(() => {
              console.log(dateTimeLogger() + ' retry cached update project transaction for %s ', jsonResponseMsg.txHash);
              this.handleAsyncProjectDocResponse(jsonResponseMsg, retry)
            }, 2000)
          } else {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger() + ' cached update project not found for transaction %s ', jsonResponseMsg.txHash);
          }
        }
      })
      .catch(() => {
        //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
        //force the data into the DB
        console.log(dateTimeLogger() + ' exception caught for handleAsyncProjectDocResponse');
      });

  };

  msgToPublish = (txHash: any, request: Request) => {
    return new Promise((resolve: Function, reject: Function) => {
      const data = {
        data: {
          // TODO: new project doc (probably) goes here
        },
        txHash: txHash,
        senderDid: request.signature.creator,
        projectDid: request.projectDid
      };
      const sanitizedData = xss.sanitize(data);
      const msg = {type: "project/UpdateProjectDoc", value: sanitizedData};
      resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
    });
  };

  process = (args: any) => {
    console.log(dateTimeLogger() + ' start new Update Project Doc transaction ');
    // TODO: add check to make sure project status is one of ["NULL", "CREATED", "PENDING", "FUNDED"]
    //       but in any case this is enforced by the blockchain, so we might want to just rely on that.
    return this.createTransaction(args, 'UpdateProjectDoc', ProjectDoc, undefined);
  }
}

export default new UpdateProjectDocProcessor();
