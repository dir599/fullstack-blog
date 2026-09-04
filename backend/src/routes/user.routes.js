import { Router } from "express";
import {
  createUser,
  deleteById,
  getAllUser,
  getUserById,
  updateUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = new Router();
router.post("/create", createUser);
router.get("/all", getAllUser);
router.get("/all/:id", getUserById);
router.patch("/update/:id",jwtVerify, updateUser);
router.patch("/:id/role", jwtVerify, verifyAdmin, updateUserRole);
router.delete("/:id", jwtVerify, deleteById);

export default router;
