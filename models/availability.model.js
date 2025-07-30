const db = require("../config/db");

const Availability = {
  create: async ({ doctor_id, day, start_time, end_time }) => {
    const [result] = await db.execute(
      "INSERT INTO availability (doctor_id, day, start_time, end_time) VALUES (?, ?, ?, ?)",
      [doctor_id, day, start_time, end_time]
    );
    return result.insertId;
  },

  getByDoctorId: async (doctor_id) => {
    const [rows] = await db.execute("SELECT * FROM availability WHERE doctor_id = ?", [doctor_id]);
    return rows;
  },

  getAll: async () => {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name
       FROM availability a
       JOIN doctors d ON a.doctor_id = d.id`
    );
    return rows;
  },

  delete: async (id) => {
    await db.execute("DELETE FROM availability WHERE id = ?", [id]);
  },
};

module.exports = Availability;
