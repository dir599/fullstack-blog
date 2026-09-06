import prisma from "../db/prisma.js";

import ApiError from "../utils/apiError.js";

const dataSafe = {
  id: true,
  title: true,
  description: true,
  coverImage: true,
  authorId: true,
  createdAt: true,
};

const createBlogService = async ({
  title,
  description,
  coverImage,
  authorId,
}) => {
  if (!title || !description) {
    throw new ApiError(400, "Title and Description are required");
  }
  const blog = await prisma.blog.create({
    data: {
      title,
      description,
      coverImage,
      authorId,
    },
    select: dataSafe,
  });
  return blog;
};

const updateBlogServices = async ({
  id,
  title,
  description,
  coverImage,
  userId,
  role,
}) => {
  const blogId = Number(id);
  if (isNaN(blogId)) {
    throw new ApiError(400, "Invalid blog ID");
  }
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  if (blog.authorId !== userId && role !== "ADMIN") {
    throw new ApiError(403, "You are not authorized");
  }
  const data = {};
  if (title !== undefined) {
    data.title = title;
  }
  if (description !== undefined) {
    data.description = description;
  }
  if (coverImage !== undefined) {
    data.coverImage = coverImage;
  }
  if (Object.keys(data).length === 0) {
    throw new ApiError(400, "At least one field must update");
  }
  const updatedBlog = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data,
    select: dataSafe,
  });

  return updatedBlog;
};

const getAllBlogServices = async () => {
  const blog = await prisma.blog.findMany({
    select: dataSafe,
    orderBy: {
      createdAt: "desc",
    },
  });

  return blog;
};

const getBlogByIdService = async ({ id }) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
    select: dataSafe,
  });
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  return blog;
};

const deleteBlogService = async({id, userId, role})=>{
  if(!userId || !id || !role){
    throw new ApiError(400, "Invalid user Id,userId and role")
  }
  const blog = await prisma.blog.findUnique({
    where: {
      id: id
    }
  })
  if(!blog){
    throw new ApiError(404, "blog not found")
  }
  if(blog.authorId !== userId && role !== "ADMIN"){
    throw new ApiError(403, "You are not authorized")
  }
  return await prisma.blog.delete({
    where: {
      id,
    }
  })
  
}
export {
  createBlogService,
  updateBlogServices,
  getAllBlogServices,
  getBlogByIdService,
  deleteBlogService,
};
