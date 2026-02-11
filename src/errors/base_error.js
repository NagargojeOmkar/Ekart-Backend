class BaseError extends Error {
  constructor({
    name,
    statusCode,
    message,
    code,
    isOperational = true,
    details = null
  }) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
