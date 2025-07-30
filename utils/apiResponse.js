// utils/apiResponse.js
function apiSuccess(message, data = {}) {
  return {
    success: true,
    message,
    data,
  };
}

function apiError(message, statusCode = 500) {
  return {
    success: false,
    message,
    statusCode,
  };
}

module.exports = { apiSuccess, apiError };
