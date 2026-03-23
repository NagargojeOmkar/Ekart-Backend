// src/middlewares/error_handler.js

const InternalServerError = require('../errors/internal_server_error');

function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  // ✅ Known error (custom)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        name: err.name,
        message: err.message,
        code: err.code,
        details: err.details
      }
    });
  }

  // ❌ Unknown error → wrap
  const internalError = new InternalServerError(
    "Unexpected error occurred",
    err
  );

  return res.status(500).json({
    success: false,
    error: {
      name: internalError.name,
      message: internalError.message,
      code: internalError.code
    }
  });
}

module.exports = errorHandler;