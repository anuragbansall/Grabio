import express from "express";
import {
  login,
  logout,
  register,
  showProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", (req, res) => {
  res.send("Forgot password");
});

router.post("/reset-password/:token", (req, res) => {
  res.send("Reset password");
});

router.get("/profile", protect, showProfile);

router.put("/profile", (req, res) => {
  res.send("Update profile");
});

export default router;
