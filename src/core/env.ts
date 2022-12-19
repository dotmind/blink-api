import dotenv from 'dotenv-flow';

import Joi, { STRING_REQUIRED, OBJECT } from '@services/internal/helpers/joi';

dotenv.config();

const envSchema = OBJECT.keys({
  // GLOBAL
  PORT: STRING_REQUIRED,
  NODE_ENV: STRING_REQUIRED,
  API_VERSION: STRING_REQUIRED,
  // DATABASE
  MONGOOSE_URI: STRING_REQUIRED,
  // SENTRY
  SENTRY_DSN: STRING_REQUIRED,
}).unknown();

try {
  Joi.attempt(process.env, envSchema);
} catch (e) {
  throw new Error(e.message);
}
