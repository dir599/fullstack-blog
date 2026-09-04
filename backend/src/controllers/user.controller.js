import { createUserService, getAllUserService } from "../services/user.service.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createUser = asyncHandler(async(req,res)=>{
    const {id, username, email, password, role} =req.body
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
        throw new ApiError(400, "Email must be standard form")
    }
    if(password <6){
        throw new ApiError(400, "Password must be greater than 6 character")
    }
    const user = await createUserService({id, email, password, role, username})

    return res
    .status(201)
    .json({
        success: true,
        message: "User created successfully",
        data: user
    })
})

const getAllUser = asyncHandler(async(req,res)=>{
    const users = await getAllUserService()
    return res
    .status(200)
    .json({
        success: true,
        message: "All user got",
        data: users
    })
    
})

export {
    getAllUser,
    createUser

}