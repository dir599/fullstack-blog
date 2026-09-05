import {
  createBlogService,
  updateBlogServices,
} from "../services/blog.service.js";
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

export { createBlog, updateBlog };
