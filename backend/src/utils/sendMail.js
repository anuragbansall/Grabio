import dotenv from "dotenv";
dotenv.config();
import transporter from "../config/nodemailer.js";

const { MAIL_USER } = process.env;

function sendMail(to, subject, text) {
  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

export default sendMail;
