class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);

    this.name = name;
    this.statusCode = statusCode;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
