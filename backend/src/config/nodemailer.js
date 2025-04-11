import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const { MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export default transporter;
