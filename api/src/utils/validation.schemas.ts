import { z } from "zod";

// --- Auth Schemas ---
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

// --- Post Schemas ---
export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Post content cannot be empty").max(2000),
  }),
});

export const getPostsSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .default("10")
      .transform((val) => parseInt(val, 10)),
    cursor: z.string().datetime().optional(),
  }),
});

// --- Generic ID Schemas ---
const objectIdSchema = z
  .string()
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ID format",
  });

export const userIdSchema = z.object({
  params: z.object({ userId: objectIdSchema }),
});

export const postIdSchema = z.object({
  params: z.object({ postId: objectIdSchema }),
});
