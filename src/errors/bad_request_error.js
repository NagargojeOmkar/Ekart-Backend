// Client ne galat input diya
// missing field
// wrong format
// invalid data

// Use Example
// if (!title) {
//   throw new BadRequestError("Title required");
// }

// Response:

// 400 Bad Request

const ApiError = require('./api_error');
const CODES = require('./error_codes');

class BadRequestError extends ApiError {
  constructor(message, details) {
    super({
      name: "BadRequestError",
      statusCode: 400,
      message,
      code: CODES.BAD_REQUEST,
      details
    });
  }
}

module.exports = BadRequestError;
