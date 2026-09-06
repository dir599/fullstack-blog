import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";
import {jwtVerify} from "../middlewares/auth.middleware.js";

const router = new Router();
router.post("/create",jwtVerify, createBlog);
router.patch("/update/:id", jwtVerify, updateBlog);
router.get("/get", getBlog);
router.get("/get/:id", getBlogById)
router.patch("/delete/:id", jwtVerify, deleteBlog)

export default router;
