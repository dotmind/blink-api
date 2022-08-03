import { Express } from 'express';

import createFolders from '@core/loaders/folder';
import loadMiddlewares from '@core/loaders/middlewares';
import loadProject from '@core/loaders/project';
import loadDatabase from '@core/loaders/database';
import error from '@services/internal/middlewares/error';
import notFound from '@services/internal/middlewares/notFound';

export default async (app: Express) => {
  createFolders();

  loadMiddlewares(app);
  await loadDatabase();
  loadProject(app);

  app.use(error);
  app.use(notFound);

  return app;
};
