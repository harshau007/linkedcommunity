import type {
  CreatePostFormData,
  LoginFormData,
  LoginResponse,
  Post,
  PostsResponse,
  RegisterFormData,
  RegisterResponse,
  User,
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`Making API call to: ${url}`);

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  console.log(`API response status: ${response.status}`);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    console.error(`API error:`, errorData);
    throw new ApiError(
      response.status,
      errorData.message || "An error occurred"
    );
  }

  const data = await response.json();
  console.log(`API response data:`, data);
  return data;
}

export const api = {
  register: (data: RegisterFormData) =>
    fetchApi<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginFormData) =>
    fetchApi<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchApi<{ message: string }>("/auth/logout", {
      method: "POST",
    }),

  getUser: (userId: string) => fetchApi<User>(`/users/${userId}`),

  getUserPosts: (userId: string) => fetchApi<Post[]>(`/users/${userId}/posts`),

  getPosts: (limit = 10, cursor?: string) => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (cursor) params.append("cursor", cursor);
    return fetchApi<PostsResponse>(`/posts?${params}`);
  },

  createPost: (data: CreatePostFormData) =>
    fetchApi<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  likePost: (postId: string) =>
    fetchApi<{ _id: string; likes: number; isLiked: boolean }>(
      `/posts/${postId}/like`,
      {
        method: "POST",
      }
    ),
};
