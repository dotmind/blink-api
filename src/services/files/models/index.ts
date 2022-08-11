import { Schema, model } from 'mongoose';

import { STRING_REQUIRED } from '@services/internal/helpers/mongo';

export interface IFile {
  fingerprint: string;
  signature: string;
  buffer: Buffer;
  path: string;
  filename: string;
}

// @TODO: set expiration time with mongoose-ttl
const FileSchema = new Schema<IFile>(
  {
    fingerprint: STRING_REQUIRED,
    signature: STRING_REQUIRED,
    buffer: {
      type: Buffer,
      required: true,
    },
    path: STRING_REQUIRED,
    filename: STRING_REQUIRED,
  },
  {
    toJSON: {
      transform(_doc, ret) {
        const { _id, __v, ...rest } = ret;

        return {
          id: _id,
          ...rest,
        };
      },
    },
  },
);

export const File = model<IFile>('File', FileSchema);
