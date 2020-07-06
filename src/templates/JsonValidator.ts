import {Validator, ValidatorResult} from 'jsonschema';

export function validateJson(schema: any, json: any): ValidatorResult {
  const validator = new Validator();
  return validator.validate(json, schema);
}
