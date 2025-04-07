import sendMail from "./sendMail.js";

function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

function validateOtp(otp, userOtp) {
  return otp === userOtp;
}

async function sendOtpEmail(email, otp) {
  await sendMail(email, `OTP Verification`, `Your OTP is ${otp}`);
  console.log(`OTP sent to ${email}`);
}

export { generateOtp, validateOtp, sendOtpEmail };
