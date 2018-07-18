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

  verifySignature = (preVerifyDidSignature: Function): Promise<RequestValidator> => {
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
            console.log(new Date().getUTCMilliseconds() + ' got cache record for key ' + this.signature.creator);

            if (!preVerifyDidSignature(didDoc, this)) {
              validator.addError("Signature failed pre verification " + this.signature.creator);
              validator.valid = false;
              resolve(validator);
            }

            try {
              if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, didDoc.pubKey)) {
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
            console.log(new Date().getUTCMilliseconds() + ' retrieve pubkey from blockchain');
            axios.get(BLOCKCHAIN_URI_REST + 'did/' + this.signature.creator)
              .then((response) => {
                if (response.status == 200) {
                  //valid response from blockchain
                  if (preVerifyDidSignature(response.data, this)) {
                    try {
                      if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, response.data.pubKey)) {
                        validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                        validator.valid = false;
                      } else {
                        Cache.set(this.signature.creator, response.data);
                      }
                    } catch (error) {
                      validator.addError("Error processing signature " + error);
                      validator.valid = false;
                      resolve(validator);
                    }

                  } else {
                    validator.addError("Signature failed pre verification " + this.signature.creator);
                    validator.valid = false;
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
          console.log(new Date().getUTCMilliseconds() + ' cache unavailable ' + reason);
          console.log(new Date().getUTCMilliseconds() + ' retrieve pubkey from blockchain');
          axios.get(BLOCKCHAIN_URI_REST + 'did/' + this.signature.creator)
            .then((response) => {
              if (response.status == 200) {
                //valid response from blockchain
                if (preVerifyDidSignature(response.data, this)) {
                  try {
                    if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, response.data.pubKey)) {
                      validator.addError("Signature did not validate '" + JSON.stringify(this.data));
                      validator.valid = false;
                    } 
                  } catch (error) {
                    validator.addError("Error processing signature " + error);
                    validator.valid = false;
                    resolve(validator);
                  }

                } else {
                  validator.addError("Signature failed pre verification " + this.signature.creator);
                  validator.valid = false;
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

  // verifySignature = (preVerifyDidSignature: Function): Promise<RequestValidator> => {
  //   return new Promise((resolve: Function, reject: Function) => {
  //     var validator = new RequestValidator();
  //     if (!this.hasSignature) {
  //       validator.addError("Signature is not present in request");
  //       validator.valid = false;
  //     }
  //     Cache.get(this.signature.creator)
  //       .then((didDoc: any) => {
  //         if (!didDoc) {
  //           validator = this.validateSignatureFromBlockchain(preVerifyDidSignature)
  //           resolve(validator);
  //         } else {
  //           if (!preVerifyDidSignature(didDoc, this)) {
  //             validator.addError("Signature failed pre verification " + this.signature.creator);
  //             validator.valid = false;
  //             resolve(validator);
  //           }
  //           console.log(new Date().getUTCMilliseconds() + ' got cache record for key ' + this.signature.creator);
  //           validator = this.validateSignature(didDoc.pubKey);
  //           console.log('CACHE ############# ' + validator);
  //           resolve(validator);

  //         }
  //       })
  //       .catch((reason) => {
  //         // cache service is unavailable
  //         validator = this.validateSignatureFromBlockchain(preVerifyDidSignature);
  //         console.log('BLOCKCHAIN CATCH ############# ' + reason + ' ' + validator);
  //         resolve(validator);
  //       });
  //   })
  // }

  // validateSignature = (publicKey: string): any => {
  //   var validator = new RequestValidator();
  //   try {
  //     if (!cryptoUtils.validateSignature(JSON.stringify(this.data), this.signature.type, this.signature.signatureValue, publicKey)) {
  //       validator.addError("Signature did not validate '" + JSON.stringify(this.body));
  //       validator.valid = false;
  //     }
  //   } catch (error) {
  //     validator.addError("Signature validation exception " + error);
  //     validator.valid = false;
  //     return validator;
  //   }
  //   return validator;
  // }

  // validateSignatureFromBlockchain = (preVerifyDidSignature: Function): any => {
  //   var validator = new RequestValidator();
  //   console.log(new Date().getUTCMilliseconds() + ' retrieve pubkey from blockchain');
  //   axios.get(BLOCKCHAIN_URI_REST + 'did/' + this.signature.creator)
  //     .then((response) => {
  //       if (response.status == 200) {
  //         if (!preVerifyDidSignature(response.data, this)) {
  //           validator.addError("Signature failed pre verification " + this.signature.creator);
  //           validator.valid = false;
  //           return validator;
  //         }
  //         validator = this.validateSignature(response.data.pubKey);
  //         if (validator.valid) Cache.set(this.signature.creator, response.data);
  //       }
  //       else {
  //         validator.addError("DID not found for creator " + this.signature.creator);
  //         validator.valid = false;
  //       }
  //       console.log('BLOCKCHAIN ############# ' + JSON.stringify(validator));
  //       return validator;
  //     })
  //     .catch((reason) => {
  //       validator.addError("Cannot validate signature " + reason);
  //       validator.valid = false;
  //       return validator;
  //     });
  // }
}
