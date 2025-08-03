import { api } from "@/lib/api";
import type { LoginFormData, RegisterFormData, User } from "@/lib/types";
import { toast } from "sonner";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (data: LoginFormData) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => Promise<void>;
  initialize: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set, get) => ({
    user: null,
    loading: false,
    initialized: false,

    login: async (data: LoginFormData) => {
      set({ loading: true });
      try {
        const user = await api.login(data);
        console.log("Login successful, user:", user);

        localStorage.setItem("user", JSON.stringify(user));

        set({ user, loading: false, initialized: true });

        toast.success("Welcome back!", {
          description: "You have been successfully logged in.",
        });
        return true;
      } catch (error: any) {
        console.error("Login error:", error);
        set({ loading: false });
        toast.error("Login failed", {
          description:
            error.message || "Please check your credentials and try again.",
        });
        return false;
      }
    },

    register: async (data: RegisterFormData) => {
      set({ loading: true });
      try {
        const user = await api.register(data);
        console.log("Registration successful, user:", user);

        localStorage.setItem("user", JSON.stringify(user));

        set({ user, loading: false, initialized: true });

        toast.success("Welcome!", {
          description: "Your account has been created successfully.",
        });
        return true;
      } catch (error: any) {
        console.error("Register error:", error);
        set({ loading: false });
        toast.error("Registration failed", {
          description: error.message || "Please try again.",
        });
        return false;
      }
    },

    logout: async () => {
      set({ loading: true });
      try {
        await api.logout();

        localStorage.removeItem("user");
        localStorage.removeItem("likedPosts");

        set({ user: null, loading: false });

        toast.success("Logged out", {
          description: "You have been successfully logged out.",
        });
      } catch (error: any) {
        console.error("Logout error:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("likedPosts");
        set({ user: null, loading: false });

        toast.success("Logged out", {
          description: "You have been logged out.",
        });
      }
    },

    initialize: () => {
      console.log("Initializing auth state...");

      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          console.log("Found stored user:", user);
          set({ user, initialized: true });
        } else {
          console.log("No stored user found");
          set({ initialized: true });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("user");
        set({ initialized: true });
      }
    },

    setUser: (user: User | null) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      set({ user });
    },
  }))
);

useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    console.log("Auth state changed - user:", user);
  }
);
