export class RequestValidator {

  errors: string[];
  valid: boolean;

  constructor() {
    this.errors = new Array<string>();
    this.valid = true;
  }

  addError = (error: string) => {
    this.errors.push(error);
  }
}
