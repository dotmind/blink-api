import { Express } from 'express';
import * as Sentry from '@sentry/node';

import createFolders from '@core/loaders/folder';
import loadMiddlewares from '@core/loaders/middlewares';
import loadProject from '@core/loaders/project';
import loadDatabase from '@core/loaders/database';
import error from '@services/internal/middlewares/error';
import notFound from '@services/internal/middlewares/notFound';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

export default async (app: Express) => {
  createFolders();

  app.use(Sentry.Handlers.requestHandler());
  loadMiddlewares(app);
  await loadDatabase();
  loadProject(app);
  app.use(Sentry.Handlers.errorHandler());

  app.use(error);
  app.use(notFound);

  return app;
};
