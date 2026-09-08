// import "dotenv/config";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// try {

//     const result = await cloudinary.uploader.upload(
//         "./src/utils/download.webp",
//         {
//             resource_type: "auto",
//         }
//     );

//     console.log("Upload successful:", result.secure_url);

// } catch (error) {

//     console.log("Upload error:", error);

// }