import { Request, Response, NextFunction } from 'express';
import Hashids from 'hashids';

import { logger } from '@services/internal/infrastructure/logger';
import { File } from '@services/files/models';

export const parseHeader = async (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.headers;

  if (!filename) {
    res.status(400).send('Missing filename');
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
    throw error;
  }
};

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const file = await File.findOne({ path: req.params.id });

  if (!file) {
    res.status(404).json({ status: 404, message: 'File not found ❌' });
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
