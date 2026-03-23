// src/errors/validation_error.js

const ApiError = require('./api_error');
const CODES = require('./error_codes');

class ValidationError extends ApiError {
  constructor(errors = []) {
    super({
      name: "ValidationError",
      statusCode: 422,
      message: "Validation failed",
      code: CODES.VALIDATION_FAILED,
      details: errors.map(err => ({
        field: err.field,
        message: err.message,
        value: err.value ?? null // 🔥 optional (actual wrong value)
      }))
    });
  }
}

module.exports = ValidationError;