import { NextFunction, Request, Response } from 'express';

import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';
import ERROR_CODES from '@services/internal/constants/error-codes';

const error = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error('On catchAllRequest : ', err?.message || err);

  if (res.headersSent) {
    return next(err);
  }

  return api.error(res, 500)({
    message: ERROR_CODES.GLOBAL.BASE,
    error: err?.message,
  });
};

export default error;
