import { Router } from "express";
import { createPost, getPosts, likePost } from "../controllers/post.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createPostSchema,
  getPostsSchema,
  postIdSchema,
} from "../utils/validation.schemas";

const router = Router();

router.post("/", protect, validate(createPostSchema), createPost);
router.get("/", validate(getPostsSchema), getPosts);
router.post("/:postId/like", protect, validate(postIdSchema), likePost);

export default router;
