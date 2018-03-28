import { IRequest } from './IRequest';
import { CryptoUtils } from '../crypto/Utils';
import { ValidationError } from "../error/ValidationError";

var cryptoUtils = new CryptoUtils();

export class Request {

  payload: any;
  signature: any;

  did: string;
  //authMethod: any;
  requestType: any;
  capabilities: any;
  data: any;


  constructor(requestData: any) {
    console.log("Request data " + JSON.stringify(requestData));
    this.payload = JSON.stringify(requestData.payload);
    this.did = requestData.payload.did;

    //data is used for transactional purposes
    if (requestData.payload.data) {
      this.data = requestData.payload.data;
    }

    //auth_method, request_type, default_data used for initial setup
    // if (requestData.payload.auth_method) {
    //   this.authMethod = requestData.payload.auth_method;
    // }
    if (requestData.payload.request_type) {
      this.requestType = requestData.payload.request_type;
    }
    if (requestData.payload.default_data) {
      this.capabilities = requestData.payload.default_data[0].capabilities;
    }

    //signature of transaction request
    if (requestData.signature) {
      this.signature = requestData.signature;
    }
  }

  hasSignature = (): boolean => {
    return (this.signature != undefined);
  }

  // hasAuthMethod = (): boolean => {
  //   return (this.authMethod != undefined);
  // }

  verifySignature = (): boolean => {
    if (!this.hasSignature) {
      throw new ValidationError("Signature is not present in request");
    }
    // if (cryptoUtils.remove0x(this.did) != cryptoUtils.remove0x(this.signature.creator)) {
    //   throw new ValidationError("'did' in payload is not the signature creator");
    // }
    //if (!this.signature.publicKey)
    //  this.signature.publicKey = this.signature.creator;
    if (!cryptoUtils.validateSignature(this.payload, this.signature.type, this.signature.signature, this.signature.publicKey)) {
      //throw new ValidationError("Invalid request input signature '" + JSON.stringify(this.payload));
    }
    console.log("Request.verifySignature: return true");
    return true;
  }

}
