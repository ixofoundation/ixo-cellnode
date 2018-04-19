import { IRequest } from './IRequest';
import { CryptoUtils } from '../crypto/Utils';
import {RequestValidator} from '../templates/RequestValidator';

var cryptoUtils = new CryptoUtils();



export class Request {

  payload: any;
  signature: any;

  did: string;
  template: any;
  requestType: any;
  capabilities: any;
  data: any;


  constructor(requestData: any) {
    this.payload = JSON.stringify(requestData.payload);
    this.did = requestData.payload.did;

    if (requestData.payload.data) {
      this.data = requestData.payload.data;
    }
    if (requestData.payload.request_type) {
      this.requestType = requestData.payload.request_type;
    }
    if (requestData.payload.default_data) {
      this.capabilities = requestData.payload.default_data[0].capabilities;
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
    if (this.did != this.signature.creator) {
      validator.addError("'did' in payload is not the signature creator");
      validator.valid = false;
    }

    if (!cryptoUtils.validateSignature(this.payload, this.signature.type, this.signature.signature, this.signature.publicKey)) {
      validator.addError("Invalid request input signature '" + JSON.stringify(this.payload));
      //validator.valid = false;
    }
    console.log("Request.verifySignature: return true");
    return validator;
  }

  verifyCapability = (caps: any, methodCall: string): RequestValidator => {
    var validator = new RequestValidator();
    var inst = this;
    validator.valid = false;
    validator.addError('Capability not allowed for did ' + inst.signature.creator);
    caps.some(function(capability: any){
      if (capability.requestType == methodCall) {
        for (let index = 0; index < capability.allow.length; index++) {
          const element = capability.allow[index];
          if (inst.signature.creator.match(new RegExp(element))) {
            validator.valid = true;
            break;
          } 
        }                       
      }
      return capability.requestType == methodCall;
    });
    return validator;
  }
}
