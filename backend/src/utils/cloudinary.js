import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);
console.log("Cloud name:", JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME));
console.log("API key:", JSON.stringify(process.env.CLOUDINARY_API_KEY));
console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);
console.log("API secret length:", process.env.CLOUDINARY_API_SECRET?.length);

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
     console.log("CLOUDINARY ERROR MESSAGE:", error.message);
    console.log("CLOUDINARY ERROR HTTP CODE:", error.http_code);
    console.log("CLOUDINARY ERROR NAME:", error.name);
    console.log("CLOUDINARY ERROR FULL:", error);
    console.log("CLOUDINARY ERROR:", error);
    if(localFilePath && fs.existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
    }
    return null
  }
};
