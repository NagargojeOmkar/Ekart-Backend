// src/errors/bad_request_error.js

const ApiError = require('./api_error');
const CODES = require('./error_codes');

class BadRequestError extends ApiError {
  constructor(message = "Bad Request", field = null, value = null) {
    super({
      name: "BadRequestError",
      statusCode: 400,
      message,
      code: CODES.BAD_REQUEST,
      details: field
        ? [{ field, message, value }]
        : null
    });
  }
}

module.exports = BadRequestError;