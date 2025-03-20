import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Payment route");
});

router.post("/webhook", (req, res) => {
  console.log("Payment webhook route");
  res.send("Payment webhook route");
});

export default router;
