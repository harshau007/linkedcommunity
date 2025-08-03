import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  jwtExpiresIn: 3600,
  cookieExpiresIn: 3600000, // 1 hour in milliseconds
};

export default config;
