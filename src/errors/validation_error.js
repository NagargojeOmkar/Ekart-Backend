const ApiError = require('./api_error');

class ValidationError extends ApiError {
  constructor(errorsArray) {
    super({
      name: "ValidationError",
      statusCode: 422,
      message: "Validation failed",
      code: "VALIDATION_FAILED",
      details: errorsArray
    });
  }
}

module.exports = ValidationError;