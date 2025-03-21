import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, email, password, role, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({ message: "User created successfully", newUser });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  const { name, email, password, address } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update fields only if provided
    const updatedFields = { name, email, address };

    // Hash password only if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
