import { Schema, model } from 'mongoose';

import { DATE_REQUIRED, STRING_REQUIRED } from '@services/internal/helpers/mongo';

export interface IFile {
  fingerprint: string;
  signature: string;
  file: Buffer;
  path: string;
}

const FileSchema = new Schema<IFile>({
  fingerprint: STRING_REQUIRED,
  signature: STRING_REQUIRED,
  file: {
    type: Buffer,
    required: true,
  },
  path: STRING_REQUIRED,
}, {
  toJSON: {
    transform(_doc, ret) {
      const { _id, __v, ...rest } = ret;

      return {
        id: _id,
        ...rest,
      };
    },
  },
});

export default model<IFile>('File', FileSchema);
