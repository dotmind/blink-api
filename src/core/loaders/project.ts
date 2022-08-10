import { Express } from 'express';
import glob from 'glob';

import config from '@core/config';

const { isDev, srcPath } = config;

const loadProject = (app: Express) => {
  const prefix = `${process.cwd()}/${srcPath}/services/**/`;
  const suffix = isDev ? '*.ts' : '*.js';

  const routes = glob.sync(`${prefix}routes/${suffix}`);
  const models = glob.sync(`${prefix}models/${suffix}`);

  /* eslint-disable import/no-dynamic-require, global-require */
  routes.forEach((route) => require(route).default(app));
  models.forEach((model) => require(model));
  /* eslint-enable import/no-dynamic-require, global-require */
};

export default async (app: Express) => {
  loadProject(app);

  return app;
};
