const ApiError = require('./api_error');

class NotFoundError extends ApiError {
  constructor(resource, id) {
    super({
      name: "NotFoundError",
      statusCode: 404,
      message: `${resource} not found`,
      code: "RESOURCE_NOT_FOUND",
      details: { id }
    });
  }
}
module.exports = NotFoundError;