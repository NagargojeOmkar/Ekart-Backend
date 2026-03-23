// src/errors/not_found_error.js

const ApiError = require('./api_error');
const CODES = require('./error_codes');

class NotFoundError extends ApiError {
  constructor(resource = "Resource", id = null) {
    super({
      name: "NotFoundError",
      statusCode: 404,
      message: `${resource} not found`,
      code: CODES.RESOURCE_NOT_FOUND,
      details: {
        resource,
        id
      }
    });
  }
}

module.exports = NotFoundError;