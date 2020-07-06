import * as base64 from 'base-64';

const utf8 = require('utf8');
const fetch = require('node-fetch');

export class GitUtils {

  loadFileContents(path: string): Promise<string> {
    const url = this.constructUrl(path);
    return fetch(url)
      .then((response: any) => {
        return response.json()
          .then((json: any) => {
            if (!json.content) throw Error("Resource not found: " + url);
            return this.decodeBase64(json.content);
          });
      })
  }

  decodeBase64(encoded: string) {
    const bytes = base64.decode(encoded);
    return utf8.decode(bytes);
  }

  constructUrl(path: string) {
    return process.env.TEMPLATE_REPO + path;
  }
}

export default new GitUtils();
