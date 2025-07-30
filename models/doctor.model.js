const db = require("../config/db");

const Doctor = {
  create: async (doctorData) => {
    const { user_id, specialization, experience, fees } = doctorData;
    const [result] = await db.query(
      "INSERT INTO doctors (user_id, specialization, experience, fees) VALUES (?, ?, ?, ?)",
      [user_id, specialization, experience, fees]
    );
    return result.insertId;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM doctors WHERE id = ?", [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM doctors");
    return rows;
  },

  update: async (id, updateData) => {
    const { specialization, experience, fees } = updateData;
    await db.query(
      "UPDATE doctors SET specialization = ?, experience = ?, fees = ? WHERE id = ?",
      [specialization, experience, fees, id]
    );
  },

  delete: async (id) => {
    await db.query("DELETE FROM doctors WHERE id = ?", [id]);
  },
};

module.exports = Doctor;
