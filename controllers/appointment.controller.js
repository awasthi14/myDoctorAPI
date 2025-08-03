const db = require('../config/db');
const { apiSuccess, apiError } = require('../utils/apiResponse');
const { sendEmail } = require('../utils/sendEmail');
const { appointmentConfirmationTemplate } = require('../utils/emailTemplates');

// Create Appointment
exports.createAppointment = async (req, res) => {
  const { doctor_id, patient_id, appointment_date, appointment_time } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO appointments 
       (doctor_id, patient_id, appointment_date, appointment_time, time_slot, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [doctor_id, patient_id, appointment_date, appointment_time, appointment_time, 'PENDING']
    );

    // Fetch doctor & patient info for email
    // const [[doctor]] = await db.execute("SELECT name, email FROM doctors WHERE id = ?", [doctor_id]);
    // const [[patient]] = await db.execute("SELECT name, email FROM patients WHERE id = ?", [patient_id]);

    // Send confirmation email
    // const html = appointmentConfirmationTemplate('Ankit', 'Arpit', appointment_date, appointment_time);
    // // await sendEmail(patient.email, "Appointment Confirmed", html);
    // await sendEmail.sendDoctorWelcomeEmail('ankit.14awasthi@gmail.com', "Appointment Confirmed", html);

    // const response = apiSuccess(res, "Appointment created and email sent", { appointmentId: result.insertId });
    // return res.status(200).json(response);
    return apiSuccess(res, "Appointment created and email sent", { appointmentId: result.insertId });
  } catch (err) {
    console.error("Error in createAppointment:", err);
    // const response = apiError(res, "Failed to book appointment", 500, err);
    // return res.status(500).json(response);
    return apiError("Failed to book appointment", 500, err.message);
}

};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
        a.id AS appointment_id,
        a.appointment_date,
        a.time_slot,
        a.status,
        up.name AS patient_name,
        ud.name AS doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN users up ON p.user_id = up.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users ud ON d.user_id = ud.id`
    );
    return apiSuccess(res, "All appointments fetched", rows);
  } catch (error) {
    return apiError(res, "Failed to fetch appointments", 500, error);
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name, p.name AS patient_name
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       JOIN patients p ON a.patient_id = p.id
       WHERE a.id = ?`,
      [id]
    );

    if (rows.length === 0) return apiError(res, "Appointment not found", 404);
    return apiSuccess(res, "Appointment fetched", rows[0]);
  } catch (error) {
    return apiError(res, "Failed to fetch appointment", 500, error);
  }
};

// Get Appointments by userID
exports.getAppointmentByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.execute(
      `SELECT 
        a.id AS appointment_id,
        a.appointment_date,
        a.time_slot,
        a.status,
        up.name AS patient_name,
        ud.name AS doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN users up ON p.user_id = up.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users ud ON d.user_id = ud.id
      WHERE up.id = ?`,
      [userId]
    );

    if (rows.length === 0) return apiSuccess(res, "Appointment fetched", []);
    return apiSuccess(res, "Appointment fetched", rows);
  } catch (error) {
    return apiError(res, "Failed to fetch appointment", 500, error);
  }
};


// Update Appointment
exports.updateAppointment = async (req, res) => {
  const id = req.params.id;
  const { appointment_date, appointment_time, status } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE appointments 
       SET appointment_date = ?, appointment_time = ?, status = ?
       WHERE id = ?`,
      [appointment_date, appointment_time, status, id]
    );

    if (result.affectedRows === 0) return apiError(res, "Appointment not found", 404);
    return apiSuccess(res, "Appointment updated");
  } catch (error) {
    return apiError(res, "Failed to update appointment", 500, error);
  }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.execute("DELETE FROM appointments WHERE id = ?", [id]);

    if (result.affectedRows === 0) return apiError(res, "Appointment not found", 404);
    return apiSuccess(res, "Appointment deleted successfully");
  } catch (error) {
    return apiError(res, "Failed to delete appointment", 500, error);
  }
};
