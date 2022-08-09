import { Response, Request } from 'express';

import api from '@services/internal/infrastructure/api';

export const ping = async (req: Request, res: Response) => {
  const { message } = req;

  return api.success(res)({ message });
};


export const upload = async (req: Request, res: Response) => {

  return api.success(res)({ message: 'file upload' });
}

export const download = async (req: Request, res: Response) => {
  const id = req.params.id;

  return api.success(res)({ message: 'file download' });
}