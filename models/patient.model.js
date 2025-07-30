const db = require("../config/db");

const Patient = {
  create: async (patientData) => {
    const { user_id, age, gender, address } = patientData;
    const [result] = await db.query(
      "INSERT INTO patients (user_id, age, gender, address) VALUES (?, ?, ?, ?)",
      [user_id, age, gender, address]
    );
    return result.insertId;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM patients WHERE id = ?", [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM patients");
    return rows;
  },

  update: async (id, updateData) => {
    const { age, gender, address } = updateData;
    await db.query(
      "UPDATE patients SET age = ?, gender = ?, address = ? WHERE id = ?",
      [age, gender, address, id]
    );
  },

  delete: async (id) => {
    await db.query("DELETE FROM patients WHERE id = ?", [id]);
  },
};

module.exports = Patient;
