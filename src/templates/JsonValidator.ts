import {Validator, ValidatorResult} from 'jsonschema';


export function validateJson(schema: any, json: any): ValidatorResult {
    var validator = new Validator();
    return validator.validate(json, schema);
}