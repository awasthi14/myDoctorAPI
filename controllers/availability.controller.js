const Availability = require("../models/availability.model");
const { apiSuccess, apiError } = require("../utils/apiResponse");

// ✅ Add availability slot
exports.createAvailability = async (req, res) => {
  const { doctor_id, day, start_time, end_time } = req.body;

  try {
    const id = await Availability.create({ doctor_id, day, start_time, end_time });
    return apiSuccess(res, "Availability added successfully", { availabilityId: id });
  } catch (err) {
    console.error("Error in addAvailability:", err);
    return apiError(res, "Failed to add availability", 500, err);
}


};

// ✅ Get all availability with doctor name
exports.getAllAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.getAll();
    return apiSuccess(res, "All availabilities fetched", availabilities);
  } catch (err) {
    return apiError(res, "Failed to fetch availabilities", 500, err);
  }
};

// ✅ Get availability for a specific doctor
exports.getDoctorAvailability = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    const availability = await Availability.getByDoctorId(doctorId);
    return apiSuccess(res, "Doctor availability fetched", availability);
  } catch (err) {
    return apiError(res, "Failed to fetch doctor availability", 500, err);
  }
};

// ✅ Delete availability
exports.deleteAvailability = async (req, res) => {
  const id = req.params.id;
  try {
    await Availability.delete(id);
    return apiSuccess(res, "Availability deleted");
  } catch (err) {
    return apiError(res, "Failed to delete availability", 500, err);
  }
};
