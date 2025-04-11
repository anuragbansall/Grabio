import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);

router.get("/", getCategories);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
