import { Router } from "express";
import { accessRefreshToken, loginUser, logOutUser, registerUser } from "../controllers/auth.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = new Router()
router.post("/register", registerUser)
router.post("/login", loginUser)

router.patch("/logOut", jwtVerify, logOutUser)
router.post("/accessRefreshToken", accessRefreshToken)

export default router