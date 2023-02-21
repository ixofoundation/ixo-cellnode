import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import {RequestRouter} from './routes/RequestRouter';
import {QueryRouter} from './routes/QueryRouter';
import {PublicRouter} from './routes/PublicRouter';
import {PublicHandler} from './handlers/PublicHandler';
import { getCapabilities } from './handlers/CapabilityHandler';
import { generateClaims } from './generateClaims';

const compression = require('compression');

class App {

  // ref to Express instance
  public express: express.Application;


  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(compression({threshold: 0}));
    this.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    this.express.use(bodyParser.json({limit: '4mb'}));
  }


  // Configure API endpoints.
  private routes(): void {
    this.express.get('/', (req, res, next) => {
      const fileSystem = require('fs');
      const pdsFile = process.env.PDS_FILE || "/usr/src/app/pds.txt"
      const data = fileSystem.readFileSync(pdsFile, 'utf8');
      res.send('API is running with ID ' + data);
    });
    this.express.get('/public/:key', new PublicHandler().getPublic);

    this.express.use('/api/request', new RequestRouter().router);
    this.express.use('/api/query', new QueryRouter().router);
    this.express.use('/api/public', new PublicRouter().router);

    this.express.post('/api/capabilities', async (req, res) => {
      const capabilities = await getCapabilities(req.body.projectDid, req.body.userDid);
      res.json(capabilities);
    });

    this.express.get('/api/claims/generate/:amount', async (req, res) => {
      const claims = generateClaims(+req.params.amount)
      res.json(claims)
    })
  }

}

export default new App().express;
