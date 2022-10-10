import { Schema, model } from 'mongoose';

import { STRING_REQUIRED } from '@services/internal/helpers/mongo';

export interface IFile {
  fingerprint: string;
  signature: string;
  filename: string;
  buffer: Buffer;
  path: string;
  expireAt: Date;
}

// @TODO: Add expiration
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
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: process.env.TTL },
    },
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
