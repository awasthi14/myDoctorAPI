const db = require("../config/db");

const Review = {
  create: async (data) => {
    const { patient_id, doctor_id, rating, comment } = data;
    const [result] = await db.query(
      "INSERT INTO reviews (patient_id, doctor_id, rating, comment) VALUES (?, ?, ?, ?)",
      [patient_id, doctor_id, rating, comment]
    );
    return result.insertId;
  },

  getByDoctorId: async (doctor_id) => {
    const [rows] = await db.query("SELECT * FROM reviews WHERE doctor_id = ?", [doctor_id]);
    return rows;
  },

  delete: async (id) => {
    await db.query("DELETE FROM reviews WHERE id = ?", [id]);
  },
};

module.exports = Review;
