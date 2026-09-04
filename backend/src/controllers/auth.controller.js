import {asyncHandler} from "../utils/asyncHandler.js";
import { generateAccessRefreshToken, loginService, logOutService, registerService } from "../services/auth.service.js";
import ApiError from "../utils/apiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  await registerService({ username, email, password, role });
  if (password.length <= 6) {
    throw new ApiError(400, "Password must be at least  6 character");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email");
  }
  return res.status(201).json({
    success: true,
    message: "User Register successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be greater than 6 character");
  }
  const login = await loginService({ email:email.trim().toLowerCase(), password });

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("refreshToken", login.newRefreshToken, options)
    .cookie("accessToken", login.newAccessToken, options)
    .json({
      success: true,
      message: "User login successfully",
       data: {
        user: login.user,
      },
    });
});

const logOutUser = asyncHandler(async(req,res)=>{
  const userId = req.user.id
   console.log("USER ID:", userId);
  const logOut = await logOutService({userId})
  const options = {
    httpOnly: true,
    credentials: true,
  }
  return res
  .status(200)
  .clearCookie("accessToken", logOut.accessToken, options)
  .clearCookie("refreshToken", logOut.refreshToken, options)
  .json({
    success: true,
    message: "Logout successfully"
  })
})

const accessRefreshToken = asyncHandler(async(req,res)=>{
  console.log("all cookies", req.cookies);
  
    const refreshToken = req.cookies?.refreshToken
    console.log("refreshToken", refreshToken)
    const token = await generateAccessRefreshToken({refreshToken})
    const options ={
      httpOnly: true,
      credentials: true
    }
    return res
    .status(201)
    .cookie("refreshToken", token.newRefreshToken, options)
    .cookie("accessToken", token.newAccessToken, options)
    .json({
      success: true,
      message: "Generate access token and refresh token"
    })
})

export { registerUser, loginUser, logOutUser, accessRefreshToken };
