import { Schema } from 'mongoose';

export const STRING = { type: String };
export const STRING_REQUIRED = { ...STRING, required: true };

export const NUMBER = { type: Number };
export const NUMBER_REQUIRED = { ...NUMBER, required: true };

export const DATE = { type: Date };
export const DATE_REQUIRED = { ...DATE, required: true };

export const OBJECT_ID = { type: Schema.Types.ObjectId };
export const OBJECT_ID_REQUIRED = { ...OBJECT_ID, required: true };
