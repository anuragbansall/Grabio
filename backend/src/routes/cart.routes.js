import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/", getCart);

router.post("/", addToCart);

router.put("/:productId", updateCartItem);

router.delete("/:productId", removeFromCart);

export default router;
