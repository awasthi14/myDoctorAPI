const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller"); // ✅ Make sure path is correct

// ✅ These must reference actual functions
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
