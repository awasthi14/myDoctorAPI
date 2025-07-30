// controllers/user.controller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get logged-in user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.promise().query(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update logged-in user's profile
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push('name = ?');
      values.push(name);
    }
    if (email) {
      fieldsToUpdate.push('email = ?');
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fieldsToUpdate.push('password = ?');
      values.push(hashedPassword);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ success: false, message: 'No data to update' });
    }

    values.push(userId); // for WHERE clause

    const [result] = await db.promise().query(
      `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, phone, role FROM users WHERE role = 'PATIENT'");
    return res.status(200).json(apiSuccess("List of all patients", rows));
  } catch (err) {
    console.error("Error fetching patients:", err);
    return res.status(500).json(apiError("Failed to fetch patients"));
  }
};