import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const authorId = req.user!.id;
    const post = await Post.create({ content, author: authorId });
    const populatedPost = await post.populate("author", "name");
    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;
    const query = cursor ? { createdAt: { $lt: new Date(cursor) } } : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("author", "name");

    // If user is authenticated, get their liked posts
    let userLikedPosts: string[] = [];
    if (req.user?.id) {
      const user = await User.findById(req.user.id);
      if (user) {
        userLikedPosts = user.likedPosts.map((id) => id.toString());
      }
    }

    // Add isLiked status to each post
    const postsWithLikeStatus = posts.map((post) => ({
      ...post.toObject(),
      isLiked: userLikedPosts.includes((post as any)._id.toString()),
    }));

    const nextCursor =
      posts.length === limit
        ? posts[posts.length - 1].createdAt.toISOString()
        : null;
    res.status(200).json({ posts: postsWithLikeStatus, nextCursor });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const userId = req.user!.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user has already liked this post
    const hasLiked = user.likedPosts.includes(postId);

    if (hasLiked) {
      post.likes = Math.max(0, post.likes - 1);
      user.likedPosts = user.likedPosts.filter(
        (id) => id.toString() !== postId
      );
    } else {
      post.likes += 1;
      user.likedPosts.push(postId);
    }

    await Promise.all([post.save(), user.save()]);

    res.status(200).json({
      _id: post._id,
      likes: post.likes,
      isLiked: !hasLiked,
    });
  } catch (error) {
    next(error);
  }
};
