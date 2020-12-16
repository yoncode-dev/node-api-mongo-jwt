import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';

import * as mongoose from 'mongoose';

import * as jwt from 'jsonwebtoken';
require('dotenv-safe').config();


class App {
  public app: express.Application;
  public rt: Routes = new Routes();

  public mongoUrl: string = 'mongodb://localhost:55000/apimongots'

  constructor() {
    this.app = express();
    this.config();
    this.rt.routes(this.app);
    this.mongoSetup();
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {useNewUrlParser: true, 
      useUnifiedTopology: true})
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false}));
  }
}

export default new App().app;