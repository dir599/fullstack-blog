import jwt from "jsonwebtoken";

const generateAccessToken = ( user ) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = ( user ) => {
  jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export { generateAccessToken, generateRefreshToken};
