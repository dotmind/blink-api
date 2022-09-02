import { Response, Request } from 'express';

import api from '@services/internal/infrastructure/api';

export const upload = async (req: Request, res: Response) => {
  const { _path } = req;

  return api.success(res)({ id: _path });
};

export const preview = async (req: Request, res: Response) => {
  const { file } = req;

  return api.success(res)({ file: file.buffer, filename: file.filename, expireAt: file.expireAt });
};
