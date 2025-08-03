const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const authorizeRole = require('../middleware/authorizeRole');

const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  getDoctorByUserId,
  updateDoctorBaseOnUserId,
  updateDoctor,
  deleteDoctor,
  getDoctorProfile,
  updateDoctorProfile
} = require('../controllers/doctor.controller');

// Admin: Add a new doctor
router.post('/', verifyToken, authorizeRole('Admin'), addDoctor);

// Public: Get all doctors
router.get('/', getAllDoctors);

// Public: Get doctor by ID
router.get('/:id', getDoctorById);

// Public: Get doctor by ID
router.get('/user/:id', getDoctorByUserId);

// Admin: Update doctor
router.put('/:id', verifyToken, authorizeRole('Admin'), updateDoctor);

// Admin: Update doctor base on userId
router.put('/user/:id', verifyToken, authorizeRole('Admin'), updateDoctorBaseOnUserId);

// Admin: Delete doctor
router.delete('/:id', verifyToken, authorizeRole('Admin'), deleteDoctor);

// Doctor: Get own profile
router.get('/profile/me', verifyToken, authorizeRole('Doctor'), getDoctorProfile);

// Doctor: Update own profile
router.put('/profile/me', verifyToken, authorizeRole('Doctor'), updateDoctorProfile);

module.exports = router;
