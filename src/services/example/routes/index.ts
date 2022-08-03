import express, { Application } from 'express';

import api from '@services/internal/infrastructure/api';

import { assertQuery } from '@services/internal/middlewares/assert';
import { ping as pingMiddleware } from '@services/example/middlewares';
import { ping } from '@services/example/controllers';
import { exampleQuery } from '@services/example/validators';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('ping'), router);

  router.get(
    '/',
    assertQuery(exampleQuery),
    pingMiddleware,
    api.controller(ping),
  );
};
