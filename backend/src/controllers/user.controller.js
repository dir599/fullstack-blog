import {
  createUserService,
  deleteByIdService,
  getAllUserService,
  getUserByIdService,
  updateUserService,
} from "../services/user.service.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, fullname } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Email must be standard form");
  }
  if (password < 6) {
    throw new ApiError(400, "Password must be greater than 6 character");
  }
  const user = await createUserService({
    email,
    password,
    role,
    username,
    fullname,
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, password, fullname } = req.body;
  const userId = Number(id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new ApiError(400, "Invalid userId");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== undefined && !emailRegex.test(email)) {
    throw new ApiError(400, "Email must be standard form");
  }
  if (password !== undefined && password.length < 6) {
    throw new ApiError(400, "password must be greater than 6 character");
  }
  const user = await updateUserService({ id, email, password, fullname });

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: user,
  });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await updateUserRoleService({
    id,
    role,
  });

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await getAllUserService();
  return res.status(200).json({
    success: true,
    message: "All user got",
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new ApiError(400, "Invalid user Id");
  }
  const user = await getUserByIdService({ id });
  return res.status(200).json({
    success: true,
    message: "User got by Id",
    data: user,
  });
});

const deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new ApiError(400, "invalid id");
  }
  // Authorization check
  if (req.user.id !== userId && req.user.role !== "ADMIN") {
    throw new ApiError(403, "You can only delete your own account");
  }
  await deleteByIdService({ id });

  return res.status(200).json({
    success: true,
    message: "User delete",
  });
});

export {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  updateUserRole,
  deleteById,
};
