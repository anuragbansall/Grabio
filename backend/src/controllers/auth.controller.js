import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateOtp, sendOtpEmail } from "../utils/otp.js";
import Otp from "../models/otp.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOtp();
    await sendOtpEmail(email, otp);

    // Store hashed OTP to be more secure
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const otpData = new Otp({
      email,
      otp: hashedOtp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });
    await otpData.save();

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { name, email, password, address, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ message: "No OTP found, please register again" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(otp.toString(), otpRecord.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role: "user",
    });

    await newUser.save();
    await Otp.deleteMany({ email });

    generateToken(newUser._id, res);
    res
      .status(201)
      .json({ message: "User verified and created", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
};

export const showProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role: "admin",
    });

    await adminUser.save();

    res.status(201).json({ message: "Admin created successfully", adminUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
