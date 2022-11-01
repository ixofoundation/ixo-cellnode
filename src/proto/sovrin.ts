import { encode, decode } from "bs58";
import { sign, box, randomBytes } from "tweetnacl";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Buffer = require('buffer/').Buffer
export function gen(): any {
  const seed = randomBytes(sign.seedLength);
  return fromSeed(seed);
}

export function fromSeed(seed: any) {
  const x = sign.keyPair.fromSeed(seed);
  const secretKey = x.secretKey.subarray(0, 32);
  const signKey = encode(Buffer.from(secretKey));
  const keyPair = box.keyPair.fromSecretKey(secretKey);

  return {
    did: encode(Buffer.from(x.publicKey.subarray(0, 16))),
    verifyKey: encode(Buffer.from(x.publicKey)),
    encryptionPublicKey: encode(Buffer.from(keyPair.publicKey)),

    secret: {
      seed: Buffer.from(seed).toString("hex"),
      signKey: signKey,
      encryptionPrivateKey: encode(Buffer.from(keyPair.secretKey)),
    },
  };
}

export function verifySignedMessage(signedMessage: any, verifyKey: any) {
  const decodedKey = decode(verifyKey);
  const signed = sign.open(signedMessage, decodedKey);
  return signed !== null ? Buffer.from(signed).toString("utf8") : false;
}

export function signMessage(message: any, signKey: any, verifyKey: any) {
  verifyKey = decode(verifyKey);
  signKey = decode(signKey);
  const fullSignKey = Buffer.concat([signKey, verifyKey]);
  const arrayMessage = Buffer.from(message, "utf8");
  return sign(arrayMessage, fullSignKey);
}

export function getArrayFromKey(key: any) {
  return Uint8Array.from(decode(key));
}

export function getNonce() {
  return randomBytes(box.nonceLength);
}

export function getKeyPairFromSignKey(signKey: any) {
  return box.keyPair.fromSecretKey(getArrayFromKey(signKey));
}

export function getSharedSecret(theirVerifyKey: any, mySigningKey: any) {
  theirVerifyKey =
    typeof theirVerifyKey === "string"
      ? decode(theirVerifyKey)
      : theirVerifyKey;
  mySigningKey =
    typeof mySigningKey === "string" ? decode(mySigningKey) : mySigningKey;
  return box.before(theirVerifyKey, mySigningKey);
}

export function decryptMessage(
  encryptedMessage: any,
  nonce: any,
  sharedSecret: any
) {
  const verifiedEncrypTion = box.open.after(
    encryptedMessage,
    nonce,
    sharedSecret
  );
  return verifiedEncrypTion !== null
    ? Buffer.from(verifiedEncrypTion).toString("utf8")
    : false;
}

export function encryptMessage(message: any, nonce: any, sharedSecret: any) {
  return box.after(Buffer.from(message, "utf8"), nonce, sharedSecret);
}
