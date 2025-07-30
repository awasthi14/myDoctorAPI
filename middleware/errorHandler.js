const { apiError } = require('../utils/apiResponse');

// Catch 404 and forward to error handler
const notFound = (req, res, next) => {
  res.status(404).json(apiError(`Not Found - ${req.originalUrl}`));
};

// General error handler
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json(apiError(err.message || 'Internal Server Error'));
};

module.exports = {
  notFound,
  errorHandler
};
