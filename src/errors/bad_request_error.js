const BaseError = require('./base_error');

class BadRequestError extends BaseError {
  constructor(description = "Bad Request") {
    super(
      "BadRequestError",
      400,
      description
    );
  }
}

module.exports = BadRequestError;
