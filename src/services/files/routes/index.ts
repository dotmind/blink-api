import express, { Application } from 'express';

import api from '@services/internal/infrastructure/api';
import {
  parseHeader, registerFile, findOne, findAll,
} from '@services/files/middlewares';
import { upload, preview, debug } from '@services/files/controllers';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('files'), router);

  router.post('/upload', parseHeader, registerFile, api.controller(upload));

  router.get('/preview/:id', findOne, api.controller(preview));

  // @TODO: remove debug route
  router.get('/debug', findAll, api.controller(debug));
};
