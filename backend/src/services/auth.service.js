import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";
import  {hashed_Password, compare_Password } from "../utils/password.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"

const registerService = async({username, email, password, role}) =>{
    if(!username || !email || !password || !role){
        throw new Error(400, "All fields are required.")
    }
    const hashedPassword = await hashed_Password(password)
    const registerUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role
        }
    })
    return registerUser
}

const loginService = async({email, password})=>{
    if(!email || !password){
        throw new ApiError(400, "Email and Password are required")
    }
    const findUser = await prisma.user.findUnique({
        where: {
            email
        },
    })
    if(!findUser){
        throw new ApiError(401,"Invalid Email or Password")
    }
    const comparePassword = await compare_Password(password, findUser.password)
    if(!comparePassword){
        throw new ApiError(401, "Password is Invalid")
    }
    const accessToken = generateAccessToken(findUser)
    const refreshToken = generateRefreshToken(findUser)

    await prisma.user.update({
        where: {
            id: findUser.id
        },data: {
            refreshToken,
        }
    })
    return {
        user: {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            role: findUser.role
        },
        refreshToken,
        accessToken,
    }
}


export{
    registerService,
    loginService
}