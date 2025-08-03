import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

export interface UserPayload {
  id: string;
  email: string;
}
export const signToken = (payload: UserPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn,
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

export const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as UserPayload;
  } catch (error) {
    return null;
  }
};
