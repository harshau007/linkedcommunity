"use client";

import { Feed } from "@/components/feed";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { useAuthStore } from "@/store/auth";
import { useFeedStore } from "@/store/feed";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, initialized, loading } = useAuthStore();
  const { fetchInitial, posts, loading: feedLoading } = useFeedStore();

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login");
    }
  }, [initialized, user, router]);

  useEffect(() => {
    if (user && posts.length === 0 && !feedLoading) {
      fetchInitial();
    }
  }, [user, posts.length, feedLoading, fetchInitial]);

  if (!initialized || loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center py-8">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <div className="sticky top-20">
            <LeftSidebar />
          </div>
        </div>

        <div className="lg:col-span-6">
          <Feed />
        </div>

        <div className="lg:col-span-3">
          <div className="sticky top-20">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
