import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../utils/validation.schemas";
import { authRateLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  registerUser
);
router.post("/login", authRateLimiter, validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

export default router;
