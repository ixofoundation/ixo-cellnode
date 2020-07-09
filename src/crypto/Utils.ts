import {createHash, randomBytes} from 'crypto';
import {dateTimeLogger} from '../logger/Logger';
import * as nacl from 'tweetnacl';
import * as bs58 from 'bs58';

const ethUtil = require('ethereumjs-util');
const ethereumWallet = require('ethereumjs-wallet');

export class CryptoUtils {

  createNonce(size = 64) {
    return randomBytes(Math.floor(size / 2)).toString('hex');
  }

  validateSignature(data: String, type: String, signature: String, publicKey: String): Boolean {
    switch (type) {
      case "ECDSA":
        return this.validateECDSASignature(data, signature, publicKey);
      case "ed25519-sha-256":
        return this.validateEd25519Signature(data, signature, publicKey);

      default:
        throw Error("Signature: '" + type + "' not supported");
    }

  }

  validateEd25519Signature(data: String, signature: String, publicKey: String): Boolean {
    console.log(dateTimeLogger() + ' validate ed25519 signature with ' + publicKey);
    const decodedKey = new Uint8Array(bs58.decode(this.remove0x(publicKey).toString()));
    const signatureBuffer = new Uint8Array(Buffer.from(this.remove0x(signature).toString(), 'base64'));
    return nacl.sign.detached.verify(new Uint8Array(Buffer.from(data.toString())), signatureBuffer, decodedKey)
  }

  validateECDSASignature(data: String, signature: String, publicKey: String): Boolean {
    // Same data as before
    const message = ethUtil.toBuffer(data);
    const msgHash = ethUtil.hashPersonalMessage(message);

    const signatureBuffer = ethUtil.toBuffer(signature);
    const sigParams = ethUtil.fromRpcSig(signatureBuffer);

    const recoveredPublicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s);

    const sender = ethUtil.publicToAddress(recoveredPublicKey);
    const recoveredAddress = ethUtil.bufferToHex(sender);

    return (recoveredAddress == publicKey);
  }

  hash(input: any): String {
    let anyString = typeof (input) == 'object' ? JSON.stringify(input) : input.toString();
    let hash = createHash('sha256').update(anyString).digest('hex');
    return hash;
  }

  remove0x(key: String): String {
    if (key.indexOf("0x") == 0) {
      return key.substring(2);
    } else {
      return key;
    }
  }

  generateWalletAndKeys(): any {
    const wallet = ethereumWallet.generate();
    return {
      address: wallet.getAddressString(),
      privateKey: wallet.getPrivateKeyString(),
      publickKey: wallet.getPublicKeyString()
    }
  }

  signECDSA(data: String, privateKey: String): String {
    const sig = ethUtil.ecsign(ethUtil.hashPersonalMessage(ethUtil.toBuffer(data)), ethUtil.toBuffer(privateKey));
    return ethUtil.bufferToHex(Buffer.concat([sig.r, sig.s, ethUtil.toBuffer(sig.v - 27)]))
  }

}

export default CryptoUtils;
