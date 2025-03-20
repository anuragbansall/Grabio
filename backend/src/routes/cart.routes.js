import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from cart routes");
});

router.post("/", (req, res) => {
  res.send("Add to cart");
});

router.put("/:id", (req, res) => {
  res.send("Update cart");
});

router.delete("/:id", (req, res) => {
  res.send("Remove from cart");
});

export default router;
