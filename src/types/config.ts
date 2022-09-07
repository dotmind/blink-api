export type DatabaseConfigType = {
  mongooseUri: string;
};

export type ApiConfigType = {
  version: string;
};

export type CorsConfig = {
  origin: string;
  methods: string;
  optionsSuccessStatus?: number;
};

type ConfigType = {
  port: number;
  srcPath: string;
  isDev: boolean;
  logDir: string;
  database: DatabaseConfigType;
  api: ApiConfigType;
  cors: CorsConfig;
};

export default ConfigType;
