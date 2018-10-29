import * as logger from '../logger/Logger';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    super.stack = "";    
  }

}