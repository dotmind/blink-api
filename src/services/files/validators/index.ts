import { STRING } from '@services/internal/helpers/joi';

export const requestBody = {
  file: STRING.required(),
}