const db = require("../config/db"); // already db.promise() in dbpool.js
const { apiSuccess, apiError } = require("../utils/apiResponse");

// Add a new doctor
exports.addDoctor = async (req, res) => {
  const { name, specialization, experience, contact, email } = req.body;

  if (!name || !specialization || !experience || !contact || !email) {
    return apiError(res, "All fields are required", 400);
  }

  if (isNaN(experience)) {
    return apiError(res, "Experience must be a number", 400);
  }

  try {
    const [existing] = await db.execute("SELECT * FROM doctors WHERE email = ?", [email]);
    if (existing.length > 0) {
      return apiError(res, "Doctor with this email already exists", 400);
    }

    await db.execute(
      "INSERT INTO doctors (name, specialization, experience, contact, email) VALUES (?, ?, ?, ?, ?)",
      [name, specialization, experience, contact, email]
    );

    return apiSuccess(res, "Doctor added successfully");
  } catch (err) {
    console.error("DoctorController - addDoctor:", err);
    return apiError(res, "Failed to add doctor", 500, err);
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM doctors");
    return apiSuccess(res, "Doctors retrieved", rows);
  } catch (err) {
    console.error("DoctorController - getAllDoctors:", err);
    return apiError(res, "Failed to fetch doctors", 500, err);
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [rows] = await db.execute("SELECT * FROM doctors WHERE id = ?", [doctorId]);

    if (rows.length === 0) {
      return apiError(res, "Doctor not found", 404);
    }

    return apiSuccess(res, "Doctor found", rows[0]);
  } catch (err) {
    console.error("DoctorController - getDoctorById:", err);
    return apiError(res, "Failed to fetch doctor", 500, err);
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  const doctorId = req.params.id;
  const { name, specialization, experience, contact, email } = req.body;

  if (!name || !specialization || !experience || !contact || !email) {
    return apiError(res, "All fields are required", 400);
  }

  if (isNaN(experience)) {
    return apiError(res, "Experience must be a number", 400);
  }

  try {
    const [result] = await db.execute(
      "UPDATE doctors SET name = ?, specialization = ?, experience = ?, contact = ?, email = ? WHERE id = ?",
      [name, specialization, experience, contact, email, doctorId]
    );

    if (result.affectedRows === 0) {
      return apiError(res, "Doctor not found", 404);
    }

    return apiSuccess(res, "Doctor updated successfully");
  } catch (err) {
    console.error("DoctorController - updateDoctor:", err);
    return apiError(res, "Failed to update doctor", 500, err);
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [result] = await db.execute("DELETE FROM doctors WHERE id = ?", [doctorId]);

    if (result.affectedRows === 0) {
      return apiError(res, "Doctor not found", 404);
    }

    return apiSuccess(res, "Doctor deleted successfully");
  } catch (err) {
    console.error("DoctorController - deleteDoctor:", err);
    return apiError(res, "Failed to delete doctor", 500, err);
  }
};

// 🔹 Doctor: Get their own profile
exports.getDoctorProfile = async (req, res) => {
  const doctorEmail = req.user.email;

  try {
    const [rows] = await db.execute("SELECT * FROM doctors WHERE email = ?", [doctorEmail]);

    if (rows.length === 0) {
      return apiError(res, "Doctor profile not found", 404);
    }

    return apiSuccess(res, "Profile fetched successfully", rows[0]);
  } catch (err) {
    console.error("DoctorController - getDoctorProfile:", err);
    return apiError(res, "Failed to fetch profile", 500, err);
  }
};

// 🔹 Doctor: Update their own profile
exports.updateDoctorProfile = async (req, res) => {
  const doctorEmail = req.user.email;
  const { name, specialization, experience, contact } = req.body;

  if (!name || !specialization || !experience || !contact) {
    return apiError(res, "All fields are required", 400);
  }

  if (isNaN(experience)) {
    return apiError(res, "Experience must be a number", 400);
  }

  try {
    const [result] = await db.execute(
      "UPDATE doctors SET name = ?, specialization = ?, experience = ?, contact = ? WHERE email = ?",
      [name, specialization, experience, contact, doctorEmail]
    );

    if (result.affectedRows === 0) {
      return apiError(res, "Doctor not found", 404);
    }

    const [updated] = await db.execute("SELECT * FROM doctors WHERE email = ?", [doctorEmail]);

    return apiSuccess(res, "Profile updated successfully", updated[0]);
  } catch (err) {
    console.error("DoctorController - updateDoctorProfile:", err);
    return apiError(res, "Failed to update profile", 500, err);
  }
};
