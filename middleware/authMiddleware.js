const jwt = require('jsonwebtoken');
const { apiError } = require('../utils/apiResponse');

// Middleware to verify JWT token
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(apiError("Access token missing or invalid"));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id, role, ... }
    next();
  } catch (error) {
    return res.status(401).json(apiError("Invalid token"));
  }
};

// Middleware to check if user is an Admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json(apiError("Admin access required"));
  }
};

// Middleware to check if user is a Doctor
const isDoctor = (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    next();
  } else {
    return res.status(403).json(apiError("Doctor access required"));
  }
};

// Middleware to check if user is a Patient
const isPatient = (req, res, next) => {
  if (req.user && req.user.role === 'patient') {
    next();
  } else {
    return res.status(403).json(apiError("Patient access required"));
  }
};

module.exports = {
  protect,
  isAdmin,
  isDoctor,
  isPatient
};
