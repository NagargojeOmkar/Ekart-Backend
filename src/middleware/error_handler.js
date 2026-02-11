function errorHandler(err, req, res, next) {

  const isProd = process.env.NODE_ENV === "production";

  // unknown error → wrap
  if (!err.statusCode) {
    err = new InternalServerError("Unexpected crash", err);
  }

  // server log (full)
  console.error("🔥 ERROR LOG:", {
    name: err.name,
    code: err.code,
    message: err.message,
    stack: err.stack
  });

  // client response (safe)
  res.status(err.statusCode).json({
    success: false,
    error: err.code,
    message: err.message,
    details: err.details,
    stack: isProd ? undefined : err.stack
  });
}

module.exports = errorHandler;
