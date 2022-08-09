import { Request, Response, NextFunction } from 'express';

import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';


export const registerFile = (req: Request, res: Response, next: NextFunction) => {
  // @TODO: Register file in database
  logger.info('File registered');
};

export const getFile = (req: Request, res: Response, next: NextFunction) => {
  // @TODO: Get file from database and return it
  logger.info('Get file');
};