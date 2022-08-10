import express, { Application } from 'express';
import api from '@services/internal/infrastructure/api';

import { assertBody } from '@services/internal/middlewares/assert';
import { parseHeader, registerFile, findOne, findAll } from '@services/files/middlewares';
import { upload, download, debug } from '@services/files/controllers';
import { requestBody } from '@services/files/validators';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('files'), router);

  router.post('/upload', assertBody(requestBody), parseHeader, registerFile, api.controller(upload));

  router.get('/preview/:id', findOne, api.controller(download));

  // @TODO: remove debug route
  router.get('/debug', findAll, api.controller(debug));
};
