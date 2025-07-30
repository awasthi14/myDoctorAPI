const db = require("../config/db");

const Appointment = {
  create: async (data) => {
    const { patient_id, doctor_id, appointment_date, status } = data;
    const [result] = await db.query(
      "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)",
      [patient_id, doctor_id, appointment_date, status || "Pending"]
    );
    return result.insertId;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM appointments WHERE id = ?", [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM appointments");
    return rows;
  },

  updateStatus: async (id, status) => {
    await db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);
  },

  delete: async (id) => {
    await db.query("DELETE FROM appointments WHERE id = ?", [id]);
  },
};

module.exports = Appointment;
