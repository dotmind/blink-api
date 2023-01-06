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

export type SpreadsheetConfigType = {
  id: string;
  clientEmail: string;
  privateKey: string;
};

type ConfigType = {
  port: number;
  srcPath: string;
  isDev: boolean;
  logDir: string;
  database: DatabaseConfigType;
  api: ApiConfigType;
  cors: CorsConfig;
  spreadsheet: SpreadsheetConfigType;
};

export default ConfigType;
