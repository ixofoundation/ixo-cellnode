import { IRequest } from './IRequest';
import { CryptoUtils } from '../crypto/Utils';
import {RequestValidator} from '../templates/RequestValidator';

var cryptoUtils = new CryptoUtils();

export class Request {

  payload: any;
  signature: any;

  version: number = 0;
  template: any;
  requestType: any;
  capabilities: any;
  data: any;


  constructor(requestData: any) {
    this.payload = JSON.stringify(requestData.payload);    

    if (requestData.payload.data) {
      this.data = requestData.payload.data;
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

  verifySignature = (): RequestValidator => {
    var validator = new RequestValidator();
    if (!this.hasSignature) {
      validator.addError("Signature is not present in request");
      validator.valid = false;
     }

    if (!cryptoUtils.validateSignature(this.payload, this.signature.type, this.signature.signature, this.signature.publicKey)) {
      validator.addError("Invalid request input signature '" + JSON.stringify(this.payload));
      //validator.valid = false;
    }
    console.log("Request.verifySignature: return true");
    return validator;
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
