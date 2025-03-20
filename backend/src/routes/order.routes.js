import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Create new order");
});

router.get("/", (req, res) => {
  res.send("Get all orders");
});

router.get("/:id", (req, res) => {
  res.send("Get order by id");
});

router.put("/:id", (req, res) => {
  res.send("Update order by id");
});

router.delete("/:id", (req, res) => {
  res.send("Delete order by id");
});

export default router;
