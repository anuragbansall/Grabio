import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Review post route");
});

router.get("/:productId", (req, res) => {
  res.send("Review get route");
});

router.put("/:id", (req, res) => {
  res.send("Review put route");
});

export default router;
