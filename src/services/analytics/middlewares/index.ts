import { Request, Response, NextFunction } from 'express';

import { Actions, collect } from '@services/analytics/services/sheet';

export const uploadAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  const { fingerprint, _path: path } = req;
  collect(fingerprint, path, Actions.UPLOAD);

  next();
};

export const previewAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  const { fingerprint } = req.headers;
  const { file } = req;
  collect(fingerprint as string, file.path, Actions.PREVIEW);

  next();
};
