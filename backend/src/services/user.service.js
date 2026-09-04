import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";
import { hashed_Password } from "../utils/password.js";

const dataSafe = {
  id: true,
  username: true,
  email: true,
  role: true,
};

const createUserService = async({id,username, email, password, role})=>{
    if(!id ||!username || !email || !password ||!role){
        throw new ApiError(400, "All fields are required.")
    }

    const hashedPassword = await hashed_Password(password)

    const user = await prisma.user.create({
        where: {
            id: Number(id)
        },data: {
            id,
            username,
            email,
            password:hashedPassword,
            role
        },select: dataSafe
    })
    return user
    
}

const getAllUserService = async () => {
  const user = await prisma.user.findMany({
    select: dataSafe,
  });
  if (user.length === 0) {
    throw new ApiError(404, "No User found");
  }
  return user;
};

export {
    getAllUserService,
    createUserService,

}
