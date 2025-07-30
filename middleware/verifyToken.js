const jwt = require('jsonwebtoken');
const { apiError } = require('../utils/apiResponse'); // adjust path if needed

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json(apiError("Access Denied. Token missing!"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId, role, etc.
    next();
  } catch (err) {
    return res.status(403).json(apiError("Invalid or expired token"));
  }
};

module.exports = verifyToken;
