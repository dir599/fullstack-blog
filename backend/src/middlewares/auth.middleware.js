import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const jwtVerify = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(401, "Invalid Token");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access");
  }
};
