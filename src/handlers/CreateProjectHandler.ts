import { Document, Schema, Model, model } from "mongoose";
import { AbstractHandler } from './AbstractHandler';
import { SovrinUtils } from '../crypto/SovrinUtils';

export interface IProjectModel extends Document { }

var ProjectSchema: Schema = new Schema({}, { strict: false });

ProjectSchema.pre("save", function (next) {
    next();
});

export const Project: Model<IProjectModel> = model<IProjectModel>("Project", ProjectSchema);


export class CreateProjectHandler extends AbstractHandler {

    updateCapabilities(did: string, methodCall: string) {

        this.saveCapabilities(did, 'EvaluateClaim');
        this.saveCapabilities('did:sov:*', 'CreateAgent');
        this.saveCapabilities(did, 'UpdateAgentStatus');
        this.saveCapabilities(did, 'ListAgents');
    }

    msgToPublish(obj: any, methodCall: string): any {
        console.log(obj.name);
        console.log(obj.tx);
        console.log(methodCall);
    }

    createProject = (args: any) => {

        // var fileSystem = require('fs');
        // var data = JSON.parse(fileSystem.readFileSync(process.env.CONFIG, 'utf8'));

        // var sovrinUtils = new SovrinUtils();
        // var mnemonic = sovrinUtils.generateBip39Mnemonic();
        // var sovrinWallet = sovrinUtils.generateSdidFromMnemonic(mnemonic);
        // var did = String("did:ixo:" + sovrinWallet.did);
        // console.log('Project wallet created ' + JSON.stringify(sovrinWallet));

        // this.saveWallet(sovrinWallet.did, sovrinWallet.secret.signKey, sovrinWallet.verifyKey);

        // args.payload.data = {
        //     ...args.payload.data,
        //     did: did,
        // };

        // return this.createTransaction(args, 'CreateProject', Project, function (request: any): Promise<boolean> {
        //     return new Promise(function (resolve: Function, reject: Function) {
        //       Project.findOne(
        //         {
        //           version: 1
        //         },
        //         function (error: Error, result: IProjectModel) {
        //           if (error) {
        //             reject(error);
        //           } else {
        //             if (result) {
        //               resolve(true);
        //             }
        //             resolve(false);
        //           }
        //         }).limit(1);
        //     });
        //   });
    }
}

export default new CreateProjectHandler();