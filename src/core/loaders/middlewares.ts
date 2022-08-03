import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from '@core/config';

const { isDev } = config;

export default async (app: Express) => {
  app.disable('x-powered-by');

  app.use(cors());
  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (isDev) {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('tiny'));
  }

  return app;
};
