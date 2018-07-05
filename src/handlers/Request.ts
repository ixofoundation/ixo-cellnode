import { IRequest } from './IRequest';
import { CryptoUtils } from '../crypto/Utils';
import { RequestValidator } from '../templates/RequestValidator';
import Cache from '../Cache';
import axios from 'axios';

var cryptoUtils = new CryptoUtils();

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');

export class Request {

  body: any;
  signature: any;

  version: number = 0;
  template: any;
  projectDid: string = '';
  data: any;


  constructor(requestBody: any) {
    this.body = JSON.stringify(requestBody);

    if (requestBody.payload.data) {
      this.data = requestBody.payload.data;
      this.projectDid = requestBody.payload.data.projectDid;
    }
    if (requestBody.payload.data.version > 0) {
      this.version = requestBody.payload.data.version;
    }
    if (requestBody.payload.template) {
      this.template = requestBody.payload.template.name;
    }
    if (requestBody.signature) {
      this.signature = requestBody.signature;
    }

  }

  hasSignature = (): boolean => {
    return (this.signature != undefined);
  }

  verifySignature = (preVerifyDidSignature: Function): Promise<RequestValidator> => {
    return new Promise((resolve: Function, reject: Function) => {
      var validator = new RequestValidator();
      if (!this.hasSignature) {
        validator.addError("Signature is not present in request");
        validator.valid = false;
      }
      Cache.get(this.signature.creator)
        .then((didDoc: any) => {
          if (didDoc) console.log(new Date().getUTCMilliseconds() + ' got cache record for key ' + this.signature.creator);
          if (didDoc && preVerifyDidSignature(didDoc, this)) {
            if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, didDoc.pubKey)) {
              validator.addError("Signature did not validate '" + JSON.stringify(this.body));
              validator.valid = false;
            }
            resolve(validator);
          } else {
            console.log(new Date().getUTCMilliseconds() + ' retrieve pubkey from blockchain');
            axios.get(BLOCKCHAIN_URI_REST + 'did/' + this.signature.creator)
              .then((response) => {
                if (response.status == 200) {
                  if (preVerifyDidSignature(response.data, this)) {
                    if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, response.data.pubKey)) {
                      validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                      validator.valid = false;
                    } else {
                      Cache.set(this.signature.creator, response.data);
                    }
                  } else {
                    validator.addError("Signature failed pre verification " + this.signature.creator);
                    validator.valid = false;
                  }
                }
                else {
                  validator.addError("DID not found for creator " + this.signature.creator);
                  validator.valid = false;
                }
                resolve(validator);
              })
              .catch((reason) => {
                validator.addError("Cannot validate signature " + reason);
                validator.valid = false;
                resolve(validator);
              });
          }
        });
    })
  }

  verifyCapability = (allow: any): RequestValidator => {
    var validator = new RequestValidator();
    var inst = this;
    validator.valid = false;
    validator.addError('Capability not allowed for did ' + inst.signature.creator);
    for (let index = 0; index < allow.length; index++) {
      const element = allow[index];
      if (inst.signature.creator.match(new RegExp(element))) {
        validator.valid = true;
        break;
      }
    }
    return validator;
  }
}
