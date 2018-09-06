import { CryptoUtils } from '../crypto/Utils';
import { RequestValidator } from '../templates/RequestValidator';
import Cache from '../Cache';
import axios from 'axios';

var cryptoUtils = new CryptoUtils();
var dateFormat = require('dateformat');

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

  dateTimeLogger(): string {
    return dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss:l");
  }

  hasSignature = (): boolean => {
    return (this.signature != undefined);
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

  verifySignature = (preVerifyDidSignature: Function, validateKyc: boolean, capability: string): Promise<RequestValidator> => {

    return new Promise((resolve: Function, reject: Function) => {
      var validator = new RequestValidator();
      if (!this.hasSignature) {
        validator.addError("Signature is not present in request");
        validator.valid = false;
        resolve(validator);
      }
      Cache.get(this.signature.creator)
        .then((didDoc: any) => {

          if (didDoc) {
            //cache-hit
            console.log(this.dateTimeLogger() + ' got cache record for key ' + this.signature.creator);
            if (validateKyc) {
              if (!preVerifyDidSignature(didDoc, this, capability)) {
                validator.addError("Signature failed pre verification " + this.signature.creator);
                validator.valid = false;
                resolve(validator);
              }
            }
            try {
              if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, didDoc.publicKey)) {
                validator.addError("Signature did not validate '" + JSON.stringify(this.body));
                validator.valid = false;
              }
            } catch (error) {
              validator.addError("Error processing signature " + error);
              validator.valid = false;
              resolve(validator);
            }
            resolve(validator);
          } else {
            //cache-miss
            console.log(this.dateTimeLogger() + ' retrieve pubkey from blockchain');
            axios.get(BLOCKCHAIN_URI_REST + 'did/getByDid/' + this.signature.creator)
              .then((response) => {
                if (response.status == 200 && response.data.did != null) {
                  //valid response from blockchain
                  if (validateKyc) {
                    if (!preVerifyDidSignature(response.data, this, capability)) {
                      validator.addError("Signature failed pre verification " + this.signature.creator);
                      validator.valid = false;
                      resolve(validator);
                    }
                  }
                  try {
                    if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, response.data.publicKey)) {
                      validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                      validator.valid = false;
                    } else {
                      Cache.set(this.signature.creator, response.data, 60);
                    }
                  } catch (error) {
                    validator.addError("Error processing signature " + error);
                    validator.valid = false;
                    resolve(validator);
                  }

                } else {
                  validator.addError("DID not found for creator " + this.signature.creator);
                  validator.valid = false;
                }
                resolve(validator);
              })
              .catch((reason) => {
                //blockchain unavailable
                validator.addError("Cannot validate signature " + reason);
                validator.valid = false;
                resolve(validator);
              });
          }
        })
        .catch((reason) => {
          // could not connect to cache, read from blockchain
          console.log(this.dateTimeLogger() + ' cache unavailable ' + reason);
          console.log(this.dateTimeLogger() + ' retrieve pubkey from blockchain');
          axios.get(BLOCKCHAIN_URI_REST + 'did/getByDid/' + this.signature.creator)
            .then((response) => {
              if (response.status == 200) {
                //valid response from blockchain
                if (validateKyc) {
                  if (!preVerifyDidSignature(response.data, this, capability)) {
                    validator.addError("Signature failed pre verification " + this.signature.creator);
                    validator.valid = false;
                    resolve(validator);
                  }
                }
                try {
                  if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, response.data.publicKey)) {
                    validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                    validator.valid = false;
                  } else {
                    Cache.set(this.signature.creator, response.data, 60 * 60);
                  }
                } catch (error) {
                  validator.addError("Error processing signature " + error);
                  validator.valid = false;
                  resolve(validator);
                }
              } else {
                validator.addError("DID not found for creator " + this.signature.creator);
                validator.valid = false;
              }
              resolve(validator);
            })
            .catch((reason) => {
              //blockchain unavailable
              validator.addError("Cannot validate signature " + reason);
              validator.valid = false;
              resolve(validator);
            });
        })
    })
  }
}
