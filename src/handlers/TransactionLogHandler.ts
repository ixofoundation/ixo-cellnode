// import {EventEmitter}  from 'events';
// import {ITransactionModel, Transaction} from '../model/Transaction';
// import {ITransaction} from '../model/ITransaction';

// declare var Promise: any;

// /*
// Complete Stub of a blockchain simply here to create a transaction id
//  */

// export class TransactionLogHandler {

//   emitter: EventEmitter;

//   constructor() {
//     this.emitter = new EventEmitter();
//   }


//   createTransaction(data: String, signatureType: String, signature: String, publicKey: String, emit = true): Promise<ITransactionModel>{
//     return new Promise(function(resolve: Function, reject: Function){
//       Transaction.create(
//         {
//           "data": data, 
//           "signatureType": signatureType,
//           "signature": signature, 
//           "publicKey": publicKey
//         }, function(error: Error, newTransaction: ITransactionModel){
//          if(error){
//            console.log("Error is " + error);
//            reject(error);
//          }else{
//            resolve(newTransaction);
//          }
//       });
//     });
//   }

// }

// export default new TransactionLogHandler();