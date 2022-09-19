import { Request, Response, NextFunction } from 'express';
import Hashids from 'hashids';

import ERROR_CODES from '@services/internal/constants/error-codes';
import { logger } from '@services/internal/infrastructure/logger';
import { File } from '@services/files/models';

export const parseHeader = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.headers;

  if (!filename) {
    res.status(400).json({ status: 400, message: ERROR_CODES.FILE.MISSING_FILENAME });
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

    file.save();
    req._path = path;
    /* eslint-enable no-underscore-dangle */

    next();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: 500, message: ERROR_CODES.FILE.FILE_CANNOT_BE_SAVED });
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const file = await File.findOne({ path: req.params.id });

  if (!file) {
    res.status(404).json({ status: 404, message: ERROR_CODES.FILE.NOT_FOUND });
    return;
  }

  req.file = file;
  next();
};

export const sanitizeName = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req;
  const sanitizedFilename = filename.replace(/<(?:.|\n)*?>/gm, '');
  req.filename = sanitizedFilename;

  next();
};
