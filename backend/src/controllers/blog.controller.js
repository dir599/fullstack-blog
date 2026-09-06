import {
  createBlogService,
  deleteBlogService,
  getAllBlogServices,
  getBlogByIdService,
  updateBlogServices,
} from "../services/blog.service.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, coverImage } = req.body;
  const authorId = req.user.id;
  // Input validation
  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(400, "Title and description are required");
  }

  if (title.trim().length < 3) {
    throw new ApiError(400, "Title must be at least 3 characters");
  }

  if (description.trim().length < 10) {
    throw new ApiError(400, "Description must be at least 10 characters");
  }
  const blog = await createBlogService({
    title: title.trim(),
    description: description.trim(),
    coverImage,
    authorId,
  });

  return res.status(201).json({
    success: true,
    message: "Create Blog",
    data: blog,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, coverImage } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  const blog = await updateBlogServices({
    id,
    title: title,
    description: description,
    coverImage,
    userId,
    role,
  });
  return res.status(200).json({
    success: true,
    message: true,
    data: blog,
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await getAllBlogServices();
  return res.status(200).json({
    success: true,
    message: "All blogs",
    data: blog,
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    throw new ApiError(400, "Id must be number.");
  }
  const blog = await getBlogByIdService({ id });
  return res.status(200).json({
    success: true,
    message: "Blog get by Id",
    data: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const userId = req.user.id
  const role = req.user.role
  if (isNaN(id)) {
    throw new ApiError(400, "Id is not valid");
  }
 
  const blog = await deleteBlogService({ id: Number(id), userId, role });
  return res.status(200).json({
    success: true,
    message: "Blog delete",
    data: blog,
  });
});

export { createBlog, updateBlog, getBlog, getBlogById, deleteBlog};
