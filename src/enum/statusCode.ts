enum StatusCode {
  OK = 200,
  CREATED, // autoincrementa
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export default StatusCode;