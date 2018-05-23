import { GitUtils } from './GitUtils';
import { Validator } from 'jsonschema';
import Cache from '../Cache';

var templateCache = new Map<string, string>();

export class TemplateUtils {

  gitUtils: GitUtils
  repoName: string


  constructor() {
    this.gitUtils = new GitUtils();
    this.repoName = 'ixofoundation';

  }

  /*
    Returns the Template and the corresponding form for the name supplied
  */

  getTemplate(templateType: string, name: string) {
    var key = this.getCacheKey(templateType, name);
    if (templateCache.has(key)) {
      return new Promise((resolve: Function, reject: Function) => {
        var template = templateCache.get(key);
        if (template) {
          resolve(template);
        } else {
          reject();
        }
      })
    }

    var template = this.constructTemplate(templateType, name);

    return this.gitUtils.loadFileContents(this.repoName, template)
      .then((templateContents: any) => {
        var res = JSON.parse(templateContents);
        templateCache.set(key, res);
        return res;
      });
  }

  getTemplateFromCache(templateType: string, name: string): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      var key = this.getCacheKey(templateType, name);
      Cache.get(key)
      .then ((template: string) =>{
        if (template) {
          resolve(template);
        } else {
          resolve(this.getTemplateFromRegistry(templateType, name));
        }
      })
    });
  }

  getTemplateFromRegistry(templateType: string, name: string): any {
    var template = this.constructTemplate(templateType, name);
    console.log(new Date().getUTCMilliseconds() + ' load template contents from file');
    return this.gitUtils.loadFileContents(this.repoName, template)
      .then((templateContents: any) => {
        var res = JSON.parse(templateContents);
        var key = this.getCacheKey(templateType, name);
        Cache.set(key, res);
        return res;
      });
  }



  getCacheKey(templateType: string, name: string): string {
    return (templateType + "|" + name).toString();
  }

  validateData(data: any, schema: any) {
    var validator = new Validator();
    return validator.validate(data, schema).valid;
  }

  // Utilities
  constructTemplate(templateType: string, name: string) {
    return "/" + templateType + "/" + name + ".json";
  }

}

export default new TemplateUtils();