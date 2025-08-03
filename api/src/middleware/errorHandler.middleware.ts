import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  if ("code" in err && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    return res
      .status(409)
      .json({ message: `An account with this ${field} already exists.` });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
  });
};
