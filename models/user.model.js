// models/user.model.js
const db = require('../config/db');

const createUser = async (user) => {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [user.name, user.email, user.password, user.role]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
