import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import config from "./config";
import { errorHandler } from "./middleware/errorHandler.middleware";
import apiRouter from "./routes";

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Community Platform API is running! 🚀");
});

app.use("/api", apiRouter);

app.use(errorHandler);

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Successfully connected to MongoDB. ✅");
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
