import express from "express";
import {
  createReview,
  deleteReview,
  getReviewByProductId,
  updateReview,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:productId", getReviewByProductId);

router.put("/:id", protect, updateReview);

router.delete("/:id", protect, deleteReview);

export default router;
