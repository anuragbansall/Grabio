import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Category created");
});

router.get("/", (req, res) => {
  res.send("Category list");
});

router.put("/:id", (req, res) => {
  res.send("Category updated");
});

router.delete("/:id", (req, res) => {
  res.send("Category deleted");
});

export default router;
