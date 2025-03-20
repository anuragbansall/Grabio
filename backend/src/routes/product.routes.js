import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Product created");
});

router.get("/", (req, res) => {
  res.send("Product list");
});

router.get("/:id", (req, res) => {
  res.send("Product detail");
});

router.get("/category/:category", (req, res) => {
  res.send("Products by category");
});

router.get("/search/:keyword", (req, res) => {
  res.send("Products by keyword");
});

router.put("/:id", (req, res) => {
  res.send("Product updated");
});

router.delete("/:id", (req, res) => {
  res.send("Product deleted");
});

export default router;
