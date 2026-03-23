// src/errors/internal_server_error.js

const ApiError = require('./api_error');
const CODES = require('./error_codes');

class InternalServerError extends ApiError {
  constructor(message = "Something went wrong", originalError = null) {
    super({
      name: "InternalServerError",
      statusCode: 500,
      message,
      code: CODES.INTERNAL_ERROR,
      isOperational: false,
      details: originalError?.message || null
    });
  }
}

module.exports = InternalServerError;