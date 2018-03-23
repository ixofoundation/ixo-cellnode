import { IRequest } from './IRequest';
import {CryptoUtils} from '../crypto/Utils';
//import { IxoValidationError } from "../errors/IxoValidationError";

var cryptoUtils = new CryptoUtils();

export class Request {
 
  //signature: any;
  payload: string;
  did: string;
  authMethod: any;
  requestType: any;
  defaultData: any;
  

  constructor(requestData: any){
    console.log("Request data " + JSON.stringify(requestData));
    this.payload = JSON.stringify(requestData);
    this.did = requestData.did;
    if (requestData.auth_method) {
        this.authMethod = requestData.auth_method;
    }    
    this.requestType = requestData.request_type;
    this.defaultData = requestData.default_data;    
    //this.data = requestData.payload.data;
    //if(requestData.signature){
    //  this.signature = requestData.signature;
    //}
  }

  //hasSignature = ():boolean => {
  //  return (this.signature != undefined);
  //}

  hasAuthMethod = ():boolean => {
    return (this.authMethod != undefined);
  }

  getRequest = () :any => {
    if(!this.hasAuthMethod()) {
      var wallet = cryptoUtils.generateWalletAndKeys();
      var authMethod = [{
          type: "ECDSA",
          public_key: wallet.publickKey,
          secret_key: wallet.privateKey 
      }]
      this.authMethod = authMethod;
    }
    return this;
  }

  verifySignature = ():boolean => {
    //if(!this.hasSignature){
      //throw new IxoValidationError("Signature is not present in request");
    //}
    //if(cryptoUtils.remove0x(this.did) != cryptoUtils.remove0x(this.signature.creator)){
      //throw new IxoValidationError("'did' in payload is not the signature creator");
    //}
    //if(!this.signature.publicKey) 
    //  this.signature.publicKey = this.signature.creator;
    //console.log("Request: " + JSON.stringify(this.signature));
    //if(!cryptoUtils.validateSignature(this.payload, this.signature.type, this.signature.signature, this.signature.publicKey)){
      //throw new IxoValidationError("Invalid request input signature '" + this.payload);
    //}
    console.log("Request.verifySignature: return true");
    return true;
  }

}
