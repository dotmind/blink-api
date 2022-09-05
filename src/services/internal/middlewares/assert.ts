import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import api from '@services/internal/infrastructure/api';
import ERROR_CODES from '@services/internal/constants/error-codes';

/* eslint-disable */
export const assertBodyWithJoiInstance =
  (schema: ObjectSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      Joi.assert(body, schema);

      return next();
    } catch (e) {
      return api.error(res)({
        error: e?.details?.length && e.details[0].message,
        message: ERROR_CODES.REQUEST.BAD_BODY,
      });
    }
  };

export const assertBody = (schema: Object): RequestHandler => {
  return assertBodyWithJoiInstance(Joi.object(schema).unknown());
};

export const assertQueryWithJoiInstance =
  (schema: ObjectSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;

    try {
      const { error, value } = schema.validate(query);

      if (error) {
        throw error;
      }

      req.query = value;

      return next();
    } catch (e) {
      return api.error(res)({
        error: e?.details?.length && e.details[0].message,
        message: ERROR_CODES.REQUEST.BAD_QUERY_PARAMS,
      });
    }
  };

export const assertQuery = (schema: Object): RequestHandler => {
  return assertQueryWithJoiInstance(Joi.object(schema).unknown());
};
/* eslint-enable */
