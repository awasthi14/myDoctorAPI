const { apiError } = require('../utils/apiResponse'); // Adjust path as needed

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(apiError("Unauthorized: No user data in token"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json(apiError("Access denied. Unauthorized role."));
    }

    next();
  };
};

module.exports = authorizeRole;
