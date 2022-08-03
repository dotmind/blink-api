import Logger from 'logplease';

import config from '@core/config';

const API_FILE = config.isDev ? null : `${config.logDir}/api.log`;
export const logger = Logger.create('api', { filename: API_FILE, useColors: true });

const MAIL_FILE = config.isDev ? null : `${config.logDir}/mail.log`;
export const mailLogger = Logger.create('mail', { filename: MAIL_FILE, useColors: true });

const API_KEY_FILE = config.isDev ? null : `${config.logDir}/api-key.log`;
export const apiKeyLogger = Logger.create('api-key', { filename: API_KEY_FILE });
