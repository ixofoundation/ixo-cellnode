export class TransactionError extends Error {
    constructor (message = '') {
    
      // Calling parent constructor of base Error class.
      super(message);
      super.stack = ""; 
      
    }
  };