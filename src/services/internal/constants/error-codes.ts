const GLOBAL = {
  BASE: 'An unexpected error occurred',
  NOT_ALLOWED_ROUTE: 'You are not allowed to access this route',
  NOT_FOUND: 'common.errors.endpoint_not_found',
  TOO_MANY_REQUEST: 'common.errors.too_many_requests',
  INCOMPLETE_BODY: 'Body incomplete',
  INVALID_ID: 'Invalid ID format',
};

const AUTH = {
  MISSING_HEADERS: 'common.errors.missing_headers',
  EXPIRED_SIGNATURE: 'common.errors.expired_signature',
  INVALID_SIGNATURE: 'common.errors.invalid_signature',
};

const FILE = {
  NOT_FOUND: 'common.errors.file_not_found',
  FILE_CANNOT_BE_SAVED: 'common.errors.file_cannot_be_saved',
  MISSING_FILENAME: 'common.errors.missing_filename',
};

const REQUEST = {
  BAD_BODY: 'Invalid body request provided',
  BAD_QUERY_PARAMS: 'Invalid query params request provided',
};

const ERROR_CODES = {
  GLOBAL,
  REQUEST,
  AUTH,
  FILE,
};

export default ERROR_CODES;
