import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "muhammadimran240105@gmail.com",
    pass: "hhqk oiru dilm xiuy",
  },
});

export default async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: "muhammadimran240105@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, error: error.message };
  }
}
