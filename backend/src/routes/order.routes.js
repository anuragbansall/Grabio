import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, admin, getAllOrders);

router.get("/my-orders", protect, getUserOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, admin, deleteOrder);

export default router;
