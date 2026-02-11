class InternalServerError extends BaseError {
  constructor(message, originalError) {
    super({
      name: "InternalServerError",
      statusCode: 500,
      message,
      code: "INTERNAL_ERROR",
      isOperational: false,
      details: originalError?.message
    });
  }
}
