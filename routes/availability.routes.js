const express = require("express");
const router = express.Router();

const {
  createAvailability,
  getAllAvailability,
  getDoctorAvailability,
  deleteAvailability
} = require("../controllers/availability.controller");

const { protect, isDoctor, isAdmin } = require("../middleware/authMiddleware");

// ✅ Add availability slot (Doctor only)
router.post("/", protect, isDoctor, createAvailability);

// ✅ Get all availability with doctor names (Admin only)
router.get("/", protect, isAdmin, getAllAvailability);

// ✅ Get availability for a specific doctor (Doctor himself or Admin)
router.get("/:doctorId", protect, getDoctorAvailability); // You can add logic in controller if needed for access control

// ✅ Delete availability (Doctor only)
router.delete("/:id", protect, isDoctor, deleteAvailability);

module.exports = router;
