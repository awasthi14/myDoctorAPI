//const transporter = require('../config/email');

const nodemailer = require("nodemailer");

exports.sendDoctorWelcomeEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password", // not your main password
    },
  });

  await transporter.sendMail({
    from: '"Doctor Appointment System" <your_email@gmail.com>',
    to: email,
    subject: "Welcome to Our Platform",
    html: `<h3>Hello Dr. ${name},</h3><p>You’ve been successfully registered.</p>`,
  });
};

