"use client";

import { useAuthStore } from "@/store/auth";
import { useFeedStore } from "@/store/feed";
import type React from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize);
  const initializeLikedPosts = useFeedStore(
    (state) => state.initializeLikedPosts
  );

  useEffect(() => {
    // Initialize auth state from localStorage
    initialize();
    // Initialize liked posts from localStorage
    initializeLikedPosts();
  }, [initialize, initializeLikedPosts]);

  return (
    <>
      {children}
      <Toaster richColors />
    </>
  );
}
