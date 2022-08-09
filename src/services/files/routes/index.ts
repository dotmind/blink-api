import express, { Application } from 'express';

import api from '@services/internal/infrastructure/api';

import { assertQuery } from '@services/internal/middlewares/assert';
import { getFile, registerFile } from '@services/files/middlewares';
import { upload, download } from '@services/files/controllers';
import { fileBody } from '@services/files/validators';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('files'), router);

  router.post(
    '/upload',
    assertQuery(fileBody),
    registerFile,
    api.controller(upload),
  );

  router.get(
    '/download/:id',
    assertQuery(fileBody),
    getFile,
    api.controller(download)
  )
};
