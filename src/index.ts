import express from 'express';

import '@core/env';
import loaders from '@core/loaders';
import config from '@core/config';

const { port } = config;

const app = express();

loaders(app).then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server listen on localhost:${port}`);
  });
});
