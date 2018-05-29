import * as path from 'path';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as logger from './logger/Logger';

import {RequestRouter} from './routes/RequestRouter';
import {QueryRouter} from './routes/QueryRouter';
import {PublicRouter} from './routes/PublicRouter';

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
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(logger.before);
  }



  // Configure API endpoints.
  private routes(): void {
    this.express.get('/', (req, res, next) => {
      res.send('API is running');
    });    

    this.express.use('/api/request', new RequestRouter().router);
    this.express.use('/api/query', new QueryRouter().router);
    this.express.use('/api/public', new PublicRouter().router);
    this.express.use(logger.after);
  } 

}

export default new App().express;
