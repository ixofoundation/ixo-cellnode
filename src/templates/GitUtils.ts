import * as base64 from 'base-64';
var utf8 = require('utf8');
var fetch = require('node-fetch');


export class GitUtils { 

  loadFileContents(path: string): Promise<string>{
    var url = this.constructUrl(path);
    return fetch(url)
      .then((response: any) => {
        return response.json()
          .then((json: any) => {
            if(!json.content) throw Error("Resource not found: " + url);
            return this.decodeBase64(json.content);
          });
      })
  }

  decodeBase64(encoded: string){
    var bytes = base64.decode(encoded);
    var decoded = utf8.decode(bytes);
    return decoded;
  }

  constructUrl(path: string){
    return process.env.TEMPLATE_REPO + path;
  }

}

export default new GitUtils();