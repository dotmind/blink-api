const GLOBAL = {
  BASE: 'An unexpected error occurred',
  NOT_ALLOWED_ROUTE: 'You are not allowed to access this route',
  NOT_FOUND: 'Not found',
  TOO_MANY_REQUEST: 'Too many requests',
  INCOMPLETE_BODY: 'Body incomplete',
  INVALID_ID: 'Invalid ID format',
};

const REQUEST = {
  BAD_BODY: 'Invalid body request provided',
  BAD_QUERY_PARAMS: 'Invalid query params request provided',
};

const ERROR_CODES = {
  GLOBAL,
  REQUEST,
};

export default ERROR_CODES;
