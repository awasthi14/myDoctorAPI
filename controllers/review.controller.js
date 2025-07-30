const db = require('../config/db');
const { apiSuccess, apiError } = require('../utils/apiResponse');

// ✅ Create review
exports.createReview = async (req, res) => {
  const { doctor_id, patient_id, rating, comment } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO reviews (doctor_id, patient_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())",
      [doctor_id, patient_id, rating, comment]
    );
    return apiSuccess(res, "Review added successfully", { reviewId: result.insertId });
  } catch (err) {
    return apiError(res, "Failed to add review", 500, err);
  }
};

// ✅ Get all reviews (with doctor/patient names)
exports.getAllReviews = async (req, res) => {
  try {
    const [reviews] = await db.execute(
      `SELECT r.*, 
              d.name AS doctor_name, 
              p.name AS patient_name 
       FROM reviews r
       JOIN doctors d ON r.doctor_id = d.id
       JOIN patients p ON r.patient_id = p.id`
    );
    return apiSuccess(res, "Reviews fetched", reviews);
  } catch (err) {
    return apiError(res, "Failed to fetch reviews", 500, err);
  }
};

// ✅ Get reviews for a specific doctor
exports.getReviewsByDoctorId = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const [reviews] = await db.execute(
      `SELECT r.*, p.name AS patient_name 
       FROM reviews r
       JOIN patients p ON r.patient_id = p.id
       WHERE r.doctor_id = ?`,
      [doctorId]
    );
    return apiSuccess(res, "Doctor reviews fetched", reviews);
  } catch (err) {
    return apiError(res, "Failed to fetch doctor reviews", 500, err);
  }
};

// ✅ Delete a review
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const user = req.user;

  try {
    // Fetch the review
    const [reviews] = await db.execute("SELECT * FROM reviews WHERE id = ?", [reviewId]);
    if (reviews.length === 0) {
      return apiError(res, "Review not found", 404);
    }

    const review = reviews[0];

    // Only allow admin or the patient who created it
    if (user.role !== 'admin' && review.patient_id !== user.id) {
      return apiError(res, "Unauthorized to delete this review", 403);
    }

    await db.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);
    return apiSuccess(res, "Review deleted");
  } catch (err) {
    return apiError(res, "Failed to delete review", 500, err);
  }
};
