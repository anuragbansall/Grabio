import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getProductByCategory,
  getProductByKeyword,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/category/:category", getProductByCategory);

router.get("/search/:keyword", getProductByKeyword);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;
