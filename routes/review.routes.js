// routes/review.routes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/', protect, reviewController.createReview);
router.get('/', protect, reviewController.getAllReviews);
router.get('/doctor/:doctorId', protect, reviewController.getReviewsByDoctorId);
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
