import { Request, Response, NextFunction } from 'express';

import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';
import { QueryExample } from '@services/example/types';

export const ping = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req;

    req.message = 'Pong 🏓';

    if (query && query.message) {
      req.message = (query as QueryExample).message;
    }

    return next();
  } catch (error) {
    logger.error('Middleware "ping" : ', error.message);

    return api.error(res, 500)({ message: error.message });
  }
};
