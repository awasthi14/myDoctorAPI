const db = require("../config/db");
const { apiSuccess, apiError } = require("../utils/apiResponse");

// ✅ Create a new patient
// exports.createPatient = async (req, res) => {
//   const { name, age, gender, contact, email } = req.body;
//   try {
//     const [result] = await db.execute(
//       "INSERT INTO patients (name, age, gender, contact, email) VALUES (?, ?, ?, ?, ?)",
//       [name, age, gender, contact, email]
//     );
//     return apiSuccess(res, "Patient added successfully", { patientId: result.insertId });
//   } catch (err) {
//     return apiError(res, "Failed to add patient", 500, err);
//   }
// };

exports.createPatient = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return apiError(res, "Name and email are required", 400);
  }

  try {
    // Check if email already exists in users
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return apiError(res, "Patient with this email already exists", 400);
    }

    // Insert into users table
    const password = "$2b$10$kYz817OniiscZCd013WVnebVd/Hz3/2oyEjUjxRwPnktukNeC6yuy"; // default password - 1234
    const phone = "8888888888";   // hardcoded
    const role = "PATIENT";

    const [userResult] = await db.execute(
      "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, phone]
    );

    const userId = userResult.insertId;

    // Insert into patients table (with hardcoded age = 20)
    // const age = 20;
    await db.execute("INSERT INTO patients (user_id, age) VALUES (?, ?)", [userId, age]);

    return apiSuccess(res, "Patient added successfully");
  } catch (err) {
    console.error("PatientController - addPatient:", err);
    return apiError(res, "Failed to add patient", 500, err);
  }
};


// ✅ Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const [patients] = await db.execute("SELECT p.id AS id, p.age AS age, u.name AS name, u.email AS email FROM patients p JOIN users u ON p.user_id = u.id");
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

// ✅ Get patient by userID
exports.getPatientByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const [patient] = await db.execute("SELECT * FROM patients WHERE user_id = ?", [userId]);
    if (patient.length === 0) {
      return apiSuccess(res, "Patient not found", {});
    }
    return apiSuccess(res, "Patient fetched successfully", patient[0]);
  } catch (err) {
    return apiError(res, "Failed to fetch patient", 500, err);
  }
};

// ✅ Update patient
exports.updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const { name, age, email } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE patients p JOIN users u ON p.user_id = u.id SET u.name = ?, u.email = ?, p.age = ? WHERE p.id = ?",
      [name, email, age, patientId]
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
