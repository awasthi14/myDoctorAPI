exports.appointmentConfirmationTemplate = (doctorName, patientName, date, time) => {
  return `
    <h3>Appointment Confirmation</h3>
    <p>Dear ${patientName},</p>
    <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been successfully scheduled.</p>
    <p><strong>Date:</strong> ${date}<br>
       <strong>Time:</strong> ${time}</p>
    <p>Thank you for using our service.</p>
    <hr>
    <p style="font-size: 12px;">Doctor Appointment System</p>
  `;
};
