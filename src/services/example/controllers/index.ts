import { Response, Request } from 'express';

import api from '@services/internal/infrastructure/api';

export const ping = async (req: Request, res: Response) => {
  const { message } = req;

  return api.success(res)({ message });
};
