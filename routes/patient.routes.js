// routes/patient.routes.js

const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

// ✅ Create a new patient
router.post("/", patientController.createPatient);

// ✅ Get all patients
router.get("/", patientController.getAllPatients);

// ✅ Get patient by ID
router.get("/:id", patientController.getPatientById);

// ✅ Update patient
router.put("/:id", patientController.updatePatient);

// ✅ Delete patient
router.delete("/:id", patientController.deletePatient);

module.exports = router;
