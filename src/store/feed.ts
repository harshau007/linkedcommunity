import { create } from "zustand";
import type { Post } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface FeedState {
  posts: Post[];
  cursor?: string;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  likedPosts: Set<string>;
  fetchInitial: () => Promise<void>;
  fetchMore: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  createPost: (content: string) => Promise<void>;
  reset: () => void;
  initializeLikedPosts: () => void;
  updatePostInAllStores: (postId: string, updates: Partial<Post>) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  cursor: undefined,
  loading: false,
  loadingMore: false,
  hasMore: true,
  likedPosts: new Set(),

  fetchInitial: async () => {
    set({ loading: true });
    try {
      const response = await api.getPosts(10);
      console.log("Fetched posts:", response);

      const likedPostIds = response.posts
        .filter((post) => post.isLiked)
        .map((post) => post._id);

      set({
        posts: response.posts,
        cursor: response.nextCursor,
        hasMore: !!response.nextCursor,
        loading: false,
        likedPosts: new Set(likedPostIds),
      });
    } catch (error: any) {
      console.error("Failed to fetch posts:", error);
      set({ loading: false });
      toast.error("Failed to load posts", {
        description: error.message || "Please try again.",
      });
    }
  },

  fetchMore: async () => {
    const { cursor, loadingMore, hasMore } = get();
    if (loadingMore || !hasMore || !cursor) return;

    set({ loadingMore: true });
    try {
      const response = await api.getPosts(10, cursor);

      set((state) => ({
        posts: [...state.posts, ...response.posts],
        cursor: response.nextCursor,
        hasMore: !!response.nextCursor,
        loadingMore: false,
      }));
    } catch (error: any) {
      set({ loadingMore: false });
      toast.error("Failed to load more posts", {
        description: error.message || "Please try again.",
      });
    }
  },

  likePost: async (postId: string) => {
    const { likedPosts } = get();
    const isCurrentlyLiked = likedPosts.has(postId);

    console.log(`Liking post ${postId}, currently liked: ${isCurrentlyLiked}`);

    const newLikedPosts = new Set(likedPosts);
    if (isCurrentlyLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }

    localStorage.setItem("likedPosts", JSON.stringify([...newLikedPosts]));

    set((state) => ({
      likedPosts: newLikedPosts,
      posts: state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: isCurrentlyLiked
                ? Math.max(0, post.likes - 1)
                : post.likes + 1,
              isLiked: !isCurrentlyLiked,
            }
          : post
      ),
    }));

    get().updatePostInAllStores(postId, {
      likes: isCurrentlyLiked
        ? Math.max(0, get().posts.find((p) => p._id === postId)?.likes || 1) - 1
        : (get().posts.find((p) => p._id === postId)?.likes || 0) + 1,
      isLiked: !isCurrentlyLiked,
    });

    try {
      const response = await api.likePost(postId);
      console.log("Like response:", response);

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.likes,
                isLiked: response.isLiked,
              }
            : post
        ),
      }));

      get().updatePostInAllStores(postId, {
        likes: response.likes,
        isLiked: response.isLiked,
      });
    } catch (error: any) {
      console.error("Like error:", error);

      const revertedLikedPosts = new Set(likedPosts);
      localStorage.setItem(
        "likedPosts",
        JSON.stringify([...revertedLikedPosts])
      );

      set((state) => ({
        likedPosts: revertedLikedPosts,
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isCurrentlyLiked
                  ? post.likes + 1
                  : Math.max(0, post.likes - 1),
                isLiked: isCurrentlyLiked,
              }
            : post
        ),
      }));

      toast.error("Failed to like post", {
        description: error.message || "Please try again.",
      });
    }
  },

  createPost: async (content: string) => {
    try {
      const newPost = await api.createPost({ content });
      console.log("Created post:", newPost);

      const postWithLikeStatus = {
        ...newPost,
        isLiked: false,
      };

      set((state) => ({
        posts: [postWithLikeStatus, ...state.posts],
      }));

      toast.success("Post created", {
        description: "Your post has been published successfully.",
      });
    } catch (error: any) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post", {
        description: error.message || "Please try again.",
      });
    }
  },

  reset: () => {
    set({
      posts: [],
      cursor: undefined,
      loading: false,
      loadingMore: false,
      hasMore: true,
      likedPosts: new Set(),
    });
  },

  initializeLikedPosts: () => {
    try {
      const storedLikedPosts = localStorage.getItem("likedPosts");
      if (storedLikedPosts) {
        const likedPostsArray = JSON.parse(storedLikedPosts);
        set({ likedPosts: new Set(likedPostsArray) });
        console.log("Initialized liked posts:", likedPostsArray);
      }
    } catch (error) {
      console.error("Error initializing liked posts:", error);
      localStorage.removeItem("likedPosts");
    }
  },

  updatePostInAllStores: (postId: string, updates: Partial<Post>) => {
    set((state) => {
      const newState: Partial<FeedState> = {
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, ...updates } : post
        ),
      };

      if ("isLiked" in updates) {
        const newLikedPosts = new Set(state.likedPosts);
        if (updates.isLiked) {
          newLikedPosts.add(postId);
        } else {
          newLikedPosts.delete(postId);
        }
        newState.likedPosts = newLikedPosts;

        localStorage.setItem("likedPosts", JSON.stringify([...newLikedPosts]));
      }

      return newState;
    });
  },
}));
