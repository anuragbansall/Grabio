import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User routes");
});

router.get("/:id", (req, res) => {
  res.send(`User ${req.params.id}`);
});

router.put("/:id", (req, res) => {
  res.send(`User ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});

export default router;
