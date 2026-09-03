import { Prisma } from "../generated/prisma/client.js";
import ApiError from "./apiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma unique constraint
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with this value already exists",
        errors: [],
      });
    }

    // Record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found",
        errors: [],
      });
    }
  }

  // Our custom error
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    errors: [],
  });
};

export default errorHandler;