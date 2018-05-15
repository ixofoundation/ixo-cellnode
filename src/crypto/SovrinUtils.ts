import * as crypto from 'crypto';
//import * as sovrin from 'sovrin-did';
//import {ISovrinDidModel} from "../db/models";
//import {writeToFile} from "./fileUtils";
//import {createSignatureJson, signatureSchema} from "../templates/signature";
//import {isValidJson} from "./jsonUtils";

var dateFormat = require('dateformat');
var merge = require('merge');
var base58 = require('bs58');
var cc = require('five-bells-condition');
var sovrin = require("sovrin-did");

export class SovrinUtils {

    generateBip39Mnemonic() {
        var bip39 = require('bip39');
        return bip39.generateMnemonic();
    }

    generateSdidFromMnemonic(mnemonic: any){
        // Create sha256 hash from Menmonic
        const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

        // Convert SHA256 hash to Uint8Array
        var didSeed = new Uint8Array(32);
        for (var i = 0; i < 32; ++i) {
            didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
        }

        // Create the Sovrin DID
        return sovrin.fromSeed(didSeed);
    }

    verifyDocumentSignature(signature: any, publicKey: any): boolean {
        return !(sovrin.verifySignedMessage(base58.decode(signature), publicKey) === false);
    }

    //Signs a document using signKey from generated SDID and returns the signature
    signDocument(signKey: string, verifyKey: string, did: string, input: any) {
        var signature = base58.encode(sovrin.signMessage(new Buffer(JSON.stringify(input)), signKey, verifyKey));
        if (this.verifyDocumentSignature(signature, verifyKey)) {
            return this.generateDocumentSignature(did, signature);
        } else {
            throw new Error('fulfillment validation failed');
        }
    }

    //Generates signature json from generated doc signature
    generateDocumentSignature(did: any, signature: any) {
        var signatureJson = {
                "type": cc.Ed25519Sha256.TYPE_NAME,
                "created": dateFormat(new Date(), "isoDateTime"),
                "creator": did,
                "signatureValue": signature
            };
        //if (isValidJson(signatureSchema, signatureJson)) {
        return signatureJson;
        //} else {
        //    throw new Error('signature json validation failed');
        //}
    }
}

export default SovrinUtils;



