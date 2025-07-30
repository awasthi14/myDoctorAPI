const db = require("../config/db");
const { apiSuccess, apiError } = require("../utils/apiResponse");

// ✅ Create a new patient
exports.createPatient = async (req, res) => {
  const { name, age, gender, contact, email } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO patients (name, age, gender, contact, email) VALUES (?, ?, ?, ?, ?)",
      [name, age, gender, contact, email]
    );
    return apiSuccess(res, "Patient added successfully", { patientId: result.insertId });
  } catch (err) {
    return apiError(res, "Failed to add patient", 500, err);
  }
};

// ✅ Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const [patients] = await db.execute("SELECT * FROM patients");
    return apiSuccess(res, "Patients fetched successfully", patients);
  } catch (err) {
    return apiError(res, "Failed to fetch patients", 500, err);
  }
};

// ✅ Get patient by ID
exports.getPatientById = async (req, res) => {
  const patientId = req.params.id;
  try {
    const [patient] = await db.execute("SELECT * FROM patients WHERE id = ?", [patientId]);
    if (patient.length === 0) {
      return apiError(res, "Patient not found", 404);
    }
    return apiSuccess(res, "Patient fetched successfully", patient[0]);
  } catch (err) {
    return apiError(res, "Failed to fetch patient", 500, err);
  }
};

// ✅ Update patient
exports.updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const { name, age, gender, contact, email } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE patients SET name = ?, age = ?, gender = ?, contact = ?, email = ? WHERE id = ?",
      [name, age, gender, contact, email, patientId]
    );
    if (result.affectedRows === 0) {
      return apiError(res, "Patient not found", 404);
    }
    return apiSuccess(res, "Patient updated successfully");
  } catch (err) {
    return apiError(res, "Failed to update patient", 500, err);
  }
};

// ✅ Delete patient
exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const [result] = await db.execute("DELETE FROM patients WHERE id = ?", [patientId]);
    if (result.affectedRows === 0) {
      return apiError(res, "Patient not found", 404);
    }
    return apiSuccess(res, "Patient deleted successfully");
  } catch (err) {
    console.error("Error in createPatient:", err); // <--- Add this
    return apiError(res, "Failed to add patient", 500, err);
}

};
