import nodemailer from "nodemailer";

// Function to send email
// const np = (to, subject, text) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Sender address
//     to, // List of receivers
//     subject, // Subject line
//     text, // Plain text body
//   };
export const sendWelcomeEmail = (name, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: "muhamadimranmunir@gmail.com",
      pass: "qjmi hmty iuim mzgg",
    },
  });
  const mailOptions = {
    from: "munir787898@gmail.com",
    to: email,
    subject: "Welcome to Our App",
    html: `
       <h1>Welcome, ${name}!</h1>
      <p>Thank you for registering at our app. We're glad to have you on board.</p>
      <p>Best regards,<br>The Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// exports = { sendWelcomeEmail };
