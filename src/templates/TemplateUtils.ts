import {GitUtils} from './GitUtils';
import {Validator} from 'jsonschema';

var templateCache = new Map<string, SchemaFormTemplate>();

export class SchemaFormTemplate {
  template: Object;

  constructor(schema: Object){
    this.template = schema;
  }

  asJSON(): any {
    return {template: this.template};
  }

}

export class TemplateUtils { 

  gitUtils: GitUtils
  repoName: string

  constructor(){
    this.gitUtils = new GitUtils();
    this.repoName = 'ixofoundation';
  }

  /*
    Returns the Template and the corresponding form for the name supplied
  */
  getTemplate(templateType: string, name: string){
    var key = this.getCacheKey(templateType, name);
    if(templateCache.has(key)){
      return new Promise((resolve: Function, reject: Function) => {
        var template = templateCache.get(key);
        if(template){
          resolve(template.asJSON());
        }else{
          reject();
        }
        
      })
    }

    var template = this.constructTemplate(templateType, name);

    return this.gitUtils.loadFileContents(this.repoName, template)
      .then((templateContents: any) => {
          var res = new SchemaFormTemplate(JSON.parse(templateContents));
          templateCache.set(key, res);
          return res.asJSON();
        });
  }

  getCacheKey(templateType: string, name: string): string {
    return (templateType + "|" + name).toString();
  }

  validateData(data: any, schema: any){
    var validator = new Validator();
    return validator.validate(data, schema).valid;
  }

  // Utilities
  constructTemplate(templateType: string, name: string){
    return "/" + templateType + "/" + name + ".json";
  }
  
}

export default TemplateUtils;