import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("author", "name");

    let userLikedPosts: string[] = [];
    if (req.user?.id) {
      const user = await User.findById(req.user.id);
      if (user) {
        userLikedPosts = user.likedPosts.map((id) => id.toString());
      }
    }

    const postsWithLikeStatus = posts.map((post) => ({
      ...post.toObject(),
      isLiked: userLikedPosts.includes((post as any)._id.toString()),
    }));

    res.status(200).json(postsWithLikeStatus);
  } catch (error) {
    next(error);
  }
};
