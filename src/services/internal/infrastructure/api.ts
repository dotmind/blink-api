import { Response, Request, NextFunction } from 'express';

import config from '@core/config';

const scope = (prefix: string) => {
  const {
    api: { version },
  } = config;

  return `/api/v${version}/${prefix}`;
};

const success = (res: Response, status: number = 200) => (data: Object) => res.status(status).send({
  success: true,
  data,
});

const error = (res: Response, errorCode: number = 400) => (data: Object) => {
  res.status(errorCode).send({
    success: false,
    data,
  });
};

const controller = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

const api = {
  error,
  scope,
  success,
  controller,
};

export default api;
