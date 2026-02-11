class ValidationError extends ApiError {
  constructor(errorsArray) {
    super({
      name: "ValidationError",
      statusCode: 422,
      message: "Validation failed",
      code: "VALIDATION_FAILED",
      details: errorsArray
    });
  }
}
