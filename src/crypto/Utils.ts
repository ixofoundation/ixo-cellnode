import * as crypto from 'crypto';
import * as logger from '../logger/Logger';
import * as nacl from 'tweetnacl';
import * as bs58 from 'bs58';

var ethUtil = require('ethereumjs-util');
var ethereumWallet = require('ethereumjs-wallet');


export class CryptoUtils { 
  
  createNonce(size = 64){
    return crypto.randomBytes(Math.floor(size / 2)).toString('hex');
  }

  validateSignature(data: String, type: String, signature: String, publicKey: String): Boolean{
    switch (type)
    {
      case "ECDSA": 
        return this.validateECDSASignature(data, signature, publicKey);
      case "Ed25519":
        return this.validateEd25519Signature(data, signature, publicKey);
      default: 
        throw Error("Signature: '" + type + "' not supported");
      }

  }

  validateEd25519Signature(data: String, signature: String, publicKey: String): Boolean{
    console.log("validate: publicKey=" + publicKey);
    var decodedKey = new Uint8Array(bs58.decode(this.remove0x(publicKey).toString()));
    var signatureBuffer = new Uint8Array(bs58.decode(this.remove0x(signature).toString()));
    var recoveredMsgBuffer = nacl.sign.open(signatureBuffer, decodedKey) || new Buffer("");
    var recoveredMsg = new Buffer(recoveredMsgBuffer).toString("utf8");
    return (recoveredMsg == data)
  }

  validateECDSASignature(data: String, signature: String, publicKey: String): Boolean{
    // Same data as before
    var message = ethUtil.toBuffer(data);
    var msgHash = ethUtil.hashPersonalMessage(message);

    var signatureBuffer = ethUtil.toBuffer(signature);
    var sigParams = ethUtil.fromRpcSig(signatureBuffer);

    var recoveredPublicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s);
    
    var sender = ethUtil.publicToAddress(recoveredPublicKey);
    var recoveredAddress = ethUtil.bufferToHex(sender);
    if((recoveredAddress != publicKey)){
      logger.base.debug("Signature failed - in: " + publicKey + " out: " + recoveredAddress);
    }
    return (recoveredAddress == publicKey);
  }

  hash(input: any): String {
    let anyString = typeof (input) == 'object' ? JSON.stringify(input) : input.toString();
    let hash = crypto.createHash('sha256').update(anyString).digest('hex');
    return hash;
  }

  remove0x(key: String): String {
    if(key.indexOf("0x") == 0){
      return key.substring(2);
    }else{
      return key;
    }
  }

  generateWalletAndKeys(): any{
    var wallet = ethereumWallet.generate();
    return {
      address: wallet.getAddressString(),
      privateKey: wallet.getPrivateKeyString(),
      publickKey: wallet.getPublicKeyString()
    }
  }

  signECDSA(data: String, privateKey: String) : String{
    var sig = ethUtil.ecsign(ethUtil.hashPersonalMessage(ethUtil.toBuffer(data)), ethUtil.toBuffer(privateKey));
    return ethUtil.bufferToHex(Buffer.concat([sig.r, sig.s, ethUtil.toBuffer(sig.v - 27)]))
  }

}

export default CryptoUtils;