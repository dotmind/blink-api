import { Request, Response, NextFunction } from 'express';
import Hashids from 'hashids';

import ERROR_CODES from '@services/internal/constants/error-codes';
import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';
import { File } from '@services/files/models';

export const parseHeader = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.headers;

  if (!filename) {
    api.error(res, 400)({ message: ERROR_CODES.FILE.MISSING_FILENAME });
  }

  req.filename = filename as string;
  next();
};

export const registerFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { signature, fingerprint, filename } = req;
    const hasids = new Hashids(signature);

    const file = new File({
      fingerprint,
      signature,
      filename,
      buffer: req.body,
    });

    /* eslint-disable no-underscore-dangle */
    const path = hasids.encodeHex(file._id.toString());
    file.path = path;

    await file.save();
    req._path = path;
    /* eslint-enable no-underscore-dangle */

    next();
  } catch (error) {
    logger.error(error);
    api.error(res, 500)({ message: ERROR_CODES.FILE.FILE_CANNOT_BE_SAVED });
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const file = await File.findOne({ path: req.params.id });

  if (!file) {
    api.error(res, 404)({ message: ERROR_CODES.FILE.NOT_FOUND });
    return;
  }

  req.file = file;
  next();
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await File.deleteOne({ path: id });

  next();
};

export const sanitizeName = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req;
  const sanitizedFilename = filename.replace(/<(?:.|\n)*?>/gm, '');
  req.filename = sanitizedFilename;

  next();
};
