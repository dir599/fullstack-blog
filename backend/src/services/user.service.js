import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";
import { hashed_Password } from "../utils/password.js";

const dataSafe = {
  id: true,
  username: true,
  email: true,
  fullname: true,
  role: true,
};

const createUserService = async ({
  id,
  username,
  email,
  password,
  role,
  fullname,
}) => {
  if (!username || !email || !password || !role || !fullname) {
    throw new ApiError(400, "All fields are required.");
  }

  const hashedPassword = await hashed_Password(password);

  const user = await prisma.user.create({
    data: {
      id,
      username,
      email,
      password: hashedPassword,
      role,
      fullname,
    },
    select: dataSafe,
  });
  return user;
};

const updateUserService = async ({ id, email, password, fullname }) => {
    const data = {}
  if(email !== undefined){
    data.email = email
  }
  if(password !== undefined){
    data.password = await hashed_Password(password)
  }

  if(fullname !== undefined){
    data.fullname = fullname
  }
  if(Object.keys(data).length === 0){
    throw new ApiError(400, "At least one field must update")
  }
//   const hashedPassword = await hashed_Password(password);
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
    select: dataSafe,
  });
  return user;
};

const updateUserRoleService = async ({ id, role }) => {
  if (!["USER", "ADMIN"].includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      role,
    },
    select: dataSafe,
  });

  return user;
};

const getAllUserService = async () => {
  const user = await prisma.user.findMany({
    select: dataSafe,
  });
  if (user.length === 0) {
    throw new ApiError(404, "No User found");
  }
  return user;
};

const getUserByIdService = async ({ id }) => {
  if (!id) {
    throw new ApiError(400, "userId  not found");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: dataSafe,
  });
  return user;
};

const deleteByIdService = async({id})=>{
    return await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
}

export { getAllUserService, createUserService, getUserByIdService , updateUserService, 
    updateUserRoleService,
deleteByIdService};
