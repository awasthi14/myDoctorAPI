const express = require('express');
const router = express.Router();
const { getUserProfile, updateUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/authMiddleware');
const { getAllPatients } = require('../controllers/user.controller');

router.get('/patients', protect, getAllPatients);


// Routes for logged-in user's own profile
router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUser);

module.exports = router;
