export interface ITransaction {
    data: String;
    hash: String;
    nonce: String;
    type: String;
    signatureType: String;
    signatureValue: String;
    publicKey: String;
    timestamp: Date;
    capability: String
  }