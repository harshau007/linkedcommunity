import { NextFunction, Request, Response } from "express";
import { UserPayload, verifyToken } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }

  req.user = decoded;
  next();
};
