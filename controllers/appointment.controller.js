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
       (doctor_id, patient_id, appointment_date, appointment_time, status)
       VALUES (?, ?, ?, ?, ?)`,
      [doctor_id, patient_id, appointment_date, appointment_time, 'Scheduled']
    );

    // Fetch doctor & patient info for email
    const [[doctor]] = await db.execute("SELECT name, email FROM doctors WHERE id = ?", [doctor_id]);
    const [[patient]] = await db.execute("SELECT name, email FROM patients WHERE id = ?", [patient_id]);

    // Send confirmation email
    const html = appointmentConfirmationTemplate(doctor.name, patient.name, appointment_date, appointment_time);
    await sendEmail(patient.email, "Appointment Confirmed", html);

    return apiSuccess(res, "Appointment created and email sent", { appointmentId: result.insertId });
  } catch (err) {
    console.error("Error in createAppointment:", err);
    return apiError(res, "Failed to book appointment", 500, err);
}

};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name, p.name AS patient_name
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       JOIN patients p ON a.patient_id = p.id
       ORDER BY a.appointment_date, a.appointment_time`
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
