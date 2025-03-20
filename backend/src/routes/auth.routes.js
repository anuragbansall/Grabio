import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("Register");
});

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("logout", (req, res) => {
  res.send("Logout");
});

router.post("/forgot-password", (req, res) => {
  res.send("Forgot password");
});

router.post("/reset-password/:token", (req, res) => {
  res.send("Reset password");
});

router.get("/profile", (req, res) => {
  res.send("Profile");
});

router.put("/profile", (req, res) => {
  res.send("Update profile");
});

export default router;
