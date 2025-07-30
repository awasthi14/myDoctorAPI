const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get a specific appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Update an appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// Delete an appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
