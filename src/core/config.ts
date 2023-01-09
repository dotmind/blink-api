import ConfigType, { ApiConfigType, CorsConfig, DatabaseConfigType, SpreadsheetConfigType } from 'types/config';

const databaseConfig: DatabaseConfigType = {
  mongooseUri: String(process.env.MONGOOSE_URI),
};

const apiConfig: ApiConfigType = {
  version: String(process.env.API_VERSION),
};

const isDev: boolean = String(process.env.NODE_ENV) === 'development';

const corsConfig: CorsConfig = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,POST,DELETE',
};

const spreadsheetConfig: SpreadsheetConfigType = {
  id: process.env.G_SPREADSHEET_ID,
  clientEmail: process.env.G_SPREADSHEET_CLIENT_EMAIL,
  privateKey: process.env.G_SPREADSHEET_PRIVATE_KEY,
};

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: isDev ? 'src' : 'dist',
  isDev,
  logDir: `${process.cwd()}/logs`,
  database: databaseConfig,
  api: apiConfig,
  cors: corsConfig,
  spreadsheet: spreadsheetConfig,
};

export default config;
