import {Validator} from 'jsonschema';


export function isValidJson(schema: any, json: any): boolean {
    var validator = new Validator();
    return validator.validate(json, schema).valid;
}