import mongoose from 'mongoose';

import config from '@core/config';
import { logger } from '@services/internal/infrastructure/logger';

const { database: { mongooseUri } } = config;

export default async function main() {
  try {
    logger.info('Init database');
    await mongoose.connect(mongooseUri);
    logger.info('Init database success');
  } catch (err) {
    logger.error('Init database failed', err.message);
  }
}
