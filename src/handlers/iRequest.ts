export interface IRequest {
    payload: any;
    signature: {
      type: String;
      created: String;
      creator: String;
      signature: String;
    }
  }