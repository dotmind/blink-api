import fs from 'fs';

import config from '@core/config';

const { logDir } = config;

const createFolders = () => {
  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[server error] On createLogsFolder : ${error.message}`);
  }
};

export default () => {
  createFolders();
}
