export interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    bio: string;
  };
  likes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isLiked?: boolean;
}

export interface LoginResponse extends User {}
export interface RegisterResponse extends User {}

export interface PostsResponse {
  posts: Post[];
  nextCursor?: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CreatePostFormData {
  content: string;
}

export interface AuthError {
  message: string;
  field?: string;
}
