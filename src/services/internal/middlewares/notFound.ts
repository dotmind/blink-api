import { Request, Response } from 'express';

import ERROR_CODES from '@services/internal/constants/error-codes';
import api from '@services/internal/infrastructure/api';

const notFound = (req: Request, res: Response) => (
  api.error(res, 404)({ message: ERROR_CODES.GLOBAL.NOT_FOUND })
);

export default notFound;
