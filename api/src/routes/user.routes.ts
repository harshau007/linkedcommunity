import { Router } from "express";
import { getUserPosts, getUserProfile } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { userIdSchema } from "../utils/validation.schemas";

const router = Router();

router.get("/:userId", validate(userIdSchema), getUserProfile);
router.get("/:userId/posts", validate(userIdSchema), getUserPosts);

export default router;
