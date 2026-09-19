import { Router } from "express";
import { accessRefreshToken, getUser, loginUser, logOutUser, registerUser } from "../controllers/auth.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = new Router()
router.post("/register", registerUser)
router.post("/login", loginUser)

router.patch("/logOut", jwtVerify, logOutUser)
router.post("/accessRefreshToken", accessRefreshToken)
router.get("/me",jwtVerify, getUser)

export default router