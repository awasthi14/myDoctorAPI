require('dotenv').config();

const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorHandler'); 
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const doctorRoutes = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const availabilityRoutes = require('./routes/availability.routes');
const reviewRoutes = require('./routes/review.routes');
const patientRoutes = require("./routes/patient.routes");
//dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.get("/", (req, res) => res.send("API Running"));

//console.log("userRoutes:", userRoutes);
app.use("/api/user", userRoutes);
app.use("/api/patients", patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/reviews', reviewRoutes);
// ✅ 404 Handler
app.use(notFound);

// ✅ General Error Handler (must be last)
app.use(errorHandler);

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
