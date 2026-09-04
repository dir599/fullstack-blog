import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";
import { hashed_Password, compare_Password } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const registerService = async ({ username, email, password, role, fullname }) => {
  if (!username || !email || !password || !role || !fullname) {
    throw new Error(400, "All fields are required.");
  }
  const hashedPassword = await hashed_Password(password);
  const registerUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role,
      fullname,
    },
  });
  return registerUser;
};

const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!findUser) {
    throw new ApiError(401, "Invalid Email or Password");
  }
  const comparePassword = await compare_Password(password, findUser.password);
  if (!comparePassword) {
    throw new ApiError(401, "Password is Invalid");
  }
  const newAccessToken = generateAccessToken(findUser);
  const newRefreshToken = generateRefreshToken(findUser);

  await prisma.user.update({
    where: {
      id: findUser.id,
    },
    data: {
      refreshToken: newRefreshToken,
    },
  });
  return {
    user: {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
    },
    newAccessToken,
    newRefreshToken,
  };
};

const logOutService = async ({ userId }) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });
};

const generateAccessRefreshToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new ApiError(401, "Token not valid");
  }
  let decodedToken;
  try {
    decodedToken= jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expires");
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

  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const newAccessToken = generateAccessToken(user);
  // generating new refreshToken
  const newRefreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken: newRefreshToken,
    },
  });
  return {
    newAccessToken,
    newRefreshToken,
    
  };
};

export {
  registerService,
  loginService,
  logOutService,
  generateAccessRefreshToken,
};
