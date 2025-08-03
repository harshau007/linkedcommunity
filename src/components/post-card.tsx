"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useFeedStore } from "@/store/feed";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const likePost = useFeedStore((state) => state.likePost);

  const isLiked = post.isLiked;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLike = async () => {
    if (!user) return;
    await likePost(post._id);
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-sm">
                  <Link href={`/users/${post.author._id}`}>
                    {post.author.name}
                  </Link>
                </h4>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {post.likes > 0 && (
          <div className="px-4 pb-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <Heart className="h-2 w-2 text-white fill-current" />
                  </div>
                </div>
                <span>
                  {post.author.name} and{" "}
                  {post.likes > 1 ? `${post.likes - 1} others` : ""}
                </span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <div className="p-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!user}
              className={cn(
                "flex items-center space-x-2 flex-1 justify-center py-3",
                isLiked ? "text-blue-600" : "text-muted-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="text-sm font-medium">Like</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
