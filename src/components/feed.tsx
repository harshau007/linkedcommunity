"use client";

import { PostCard } from "@/components/post-card";
import { PostCreation } from "@/components/post-creation";
import { useFeedStore } from "@/store/feed";
import { Loader2 } from "lucide-react";
import { useCallback, useRef } from "react";

export function Feed() {
  const { posts, loading, loadingMore, hasMore, fetchMore } = useFeedStore();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loadingMore, hasMore, fetchMore]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <PostCreation />
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PostCreation />

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No posts yet. Be the first to share something!
          </p>
        </div>
      ) : (
        <>
          {posts.map((post, index) => (
            <div
              key={post._id}
              ref={index === posts.length - 1 ? lastPostElementRef : undefined}
            >
              <PostCard post={post} />
            </div>
          ))}

          {loadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm">
                You've reached the end!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
