const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { apiSuccess, apiError } = require("../utils/apiResponse");

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  console.log("➡️ Register called", req.body);

  try {
    // 1. Check if user already exists
    console.log("🔍 Checking if user already exists...");
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      console.log("❗ User already exists");
      return res.status(409).json(apiError("User already exists"));
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert new user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, role, phone]
    );

    const insertedUser = {
      id: result.insertId,
      name,
      email,
      role,
      phone,
    };

    console.log("✅ User registered:", insertedUser);
    return res.status(201).json(apiSuccess("User registered successfully", insertedUser));
  } catch (err) {
    console.error("❌ Error during registration:", err);
    return res.status(500).json(apiError("Something went wrong during registration"));
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Login called", req.body);

  try {
    // 1. Find user by email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json(apiError("Invalid credentials"));
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(401).json(apiError("Invalid credentials"));
    }

    // 3. Send success response (token will be added later)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    console.log("✅ Login successful:", userData);
    return res.status(200).json(apiSuccess("Login successful", userData));
  } catch (err) {
    console.error("❌ Error during login:", err);
    return res.status(500).json(apiError("Something went wrong during login"));
  }
};
