import ConfigType, { ApiConfigType, CorsConfig, DatabaseConfigType } from 'types/config';

const databaseConfig: DatabaseConfigType = {
  mongooseUri: String(process.env.MONGOOSE_URI),
};

const apiConfig: ApiConfigType = {
  version: String(process.env.API_VERSION),
};

const isDev: boolean = String(process.env.NODE_ENV) === 'development';

const corsConfig: CorsConfig = {
  origin: '*',
  methods: 'GET,POST,DELETE',
};

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: isDev ? 'src' : 'dist',
  isDev,
  logDir: `${process.cwd()}/logs`,
  database: databaseConfig,
  api: apiConfig,
  cors: corsConfig,
};

export default config;
