import { Request, Response, NextFunction } from 'express';

import { Actions, collect } from '@services/analytics/services/sheet';
import config from '@core/config';

const { isDev } = config;

export const uploadAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  if (!isDev) {
    const { fingerprint, _path: path } = req;
    collect(fingerprint, path, Actions.UPLOAD);
  }

  next();
};

export const previewAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  if (!isDev) {
    const { fingerprint } = req.headers;
    const { file } = req;
    collect(fingerprint as string, file.path, Actions.PREVIEW);
  }

  next();
};
