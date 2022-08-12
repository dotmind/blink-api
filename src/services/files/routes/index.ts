import express, { Application } from 'express';

import api from '@services/internal/infrastructure/api';
import { checkSignature } from '@services/internal/middlewares/signature';
import { parseHeader, registerFile, findOne } from '@services/files/middlewares';
import { upload, preview } from '@services/files/controllers';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('files'), router);

  router.post('/upload', checkSignature, parseHeader, registerFile, api.controller(upload));

  router.get('/preview/:id', checkSignature, findOne, api.controller(preview));
};
