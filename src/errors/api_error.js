const BaseError = require('./base_error');

class ApiError extends BaseError {
  constructor(opts) {
    super(opts);
  }
}

module.exports = ApiError;
