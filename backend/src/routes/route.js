import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import blogRouter from "./blog.routes.js"

const router = new Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter)

export default router;
