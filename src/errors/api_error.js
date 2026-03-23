// src/errors/api_error.js

const BaseError = require('./base_error');

class ApiError extends BaseError {
  constructor(options) {
    super(options);
  }
}

module.exports = ApiError;