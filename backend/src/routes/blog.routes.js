import { Router } from "express";
import { createBlog, updateBlog } from "../controllers/blog.controller";

const router = new Router()
router.post("/create", createBlog)
router.patch("/update/:id", updateBlog)


export default router