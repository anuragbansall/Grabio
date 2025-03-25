import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, address, role } = req.body;
    const userId = req.params.id;

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (role && req.user.role !== "admin") {
      return res.status(403).json({ message: "You cannot change your role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        address,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
