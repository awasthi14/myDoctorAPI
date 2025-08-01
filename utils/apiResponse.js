// utils/apiResponse.js
function apiSuccess(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function apiError(res, message, statusCode = 500, error = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

module.exports = { apiSuccess, apiError };
