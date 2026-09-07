import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";
import {jwtVerify} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = new Router();
router.post("/create",jwtVerify,upload.single("coverImage"), createBlog);
router.patch("/update/:id", jwtVerify, upload.single("coverImage"), updateBlog);
router.get("/get", getBlog);
router.get("/get/:id", getBlogById)
router.patch("/delete/:id", jwtVerify, deleteBlog)

export default router;
