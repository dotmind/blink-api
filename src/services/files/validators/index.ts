import { STRING } from '@services/internal/helpers/joi';

export const fileBody = {
  fingerprint: STRING.required(),
  // file: Buffer,
  path: STRING.required(),
};
