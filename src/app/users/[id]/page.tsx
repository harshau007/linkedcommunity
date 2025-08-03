"use client";

import { UserProfile } from "@/components/user-profile";
import { api } from "@/lib/api";
import type { Post, User } from "@/lib/types";
import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPage() {
  const params = useParams();
  const userId = params.id as string;

  const { user: currentUser, initialized } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized) return;

    if (!currentUser) {
      setError("Please log in to view profiles");
      setLoading(false);
      return;
    }

    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching user data for:", userId);

        const [userResponse, postsResponse] = await Promise.all([
          api.getUser(userId),
          api.getUserPosts(userId),
        ]);

        console.log("User data:", userResponse);
        console.log("User posts:", postsResponse);

        setUser(userResponse);
        setPosts(postsResponse);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        if (error.status === 404) {
          setError("User not found");
        } else {
          setError(error.message || "Failed to load user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, initialized, currentUser]);

  if (!initialized) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">
            Please log in to view profiles
          </p>
        </div>
      </div>
    );
  }

  // Show loading while fetching user data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">
            {error || "User not found"}
          </p>
          <p className="text-sm text-muted-foreground">
            The profile you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <UserProfile user={user} posts={posts} />;
}
