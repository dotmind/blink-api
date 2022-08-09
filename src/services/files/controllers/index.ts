import { Response, Request } from 'express';

import api from '@services/internal/infrastructure/api';

export const upload = async (req: Request, res: Response) => {
  const { _path } = req;
  return api.success(res)({ id: _path });
}

export const download = async (req: Request, res: Response) => {
  const id = req.params.id;

  return api.success(res)({ message: 'file download' });
}


// @TODO: remove debug controller
export const debug = async (req: Request, res: Response) => {
  return api.success(res)({ message: 'file debug' });
}