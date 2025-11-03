const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  // Send a response to the client
  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

export default globalErrorHandler;
