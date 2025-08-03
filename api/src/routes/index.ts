import { Router } from "express";
import authRouter from "./auth.routes";
import postRouter from "./post.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
