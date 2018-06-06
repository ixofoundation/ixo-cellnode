import { IRequest } from './IRequest';
import { CryptoUtils } from '../crypto/Utils';
import { RequestValidator } from '../templates/RequestValidator';
import Cache from '../Cache';
import axios from 'axios';

var cryptoUtils = new CryptoUtils();

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');

export class Request {

  payload: any;
  signature: any;

  version: number = 0;
  template: any;
  requestType: any;
  capabilities: any;
  projectDid: string = '';
  data: any;


  constructor(requestData: any) {
    this.payload = JSON.stringify(requestData.payload);

    if (requestData.payload.data) {
      this.data = requestData.payload.data;
      this.projectDid = requestData.payload.data.projectDid;
    }
    if (requestData.payload.data.version > 0) {
      this.version = requestData.payload.data.version;
    }
    if (requestData.payload.template) {
      this.template = requestData.payload.template.name;
    }
    if (requestData.signature) {
      this.signature = requestData.signature;
    }
    
  }

  hasSignature = (): boolean => {
    return (this.signature != undefined);
  }

  verifySignature = (): Promise<RequestValidator> => {
    return new Promise((resolve: Function, reject: Function) => {
      var validator = new RequestValidator();
      if (!this.hasSignature) {
        validator.addError("Signature is not present in request");
        validator.valid = false;
      }
      Cache.get(this.signature.creator)
        .then((pubKey: string) => {
          if (pubKey) {
            if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signature, pubKey)) {
              validator.addError("Signature did not validate '" + JSON.stringify(this.payload));
              validator.valid = false;
            }
            resolve(validator);
          } else {
            console.log(new Date().getUTCMilliseconds() + ' retrieve pubkey from blockchain');
            axios.get(BLOCKCHAIN_URI_REST + 'did/' + this.signature.creator)
              .then((response) => {
                if (response.status == 200) {
                  if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signature, response.data.pubKey)) {
                    validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                    validator.valid = false;
                  } else {
                    Cache.set(this.signature.creator, response.data.pubKey);
                  }
                }
                else {
                  validator.addError("DID not found for creator " + this.signature.creator);
                  validator.valid = false;
                }
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
