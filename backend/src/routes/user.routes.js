import express from "express";
import { admin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);

router.get("/:id", protect, getUser);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, admin, deleteUser);

export default router;
