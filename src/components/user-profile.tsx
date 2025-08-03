"use client";

import { PostCard } from "@/components/post-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Post, User } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, Heart, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  user: User;
  posts: Post[];
}

export function UserProfile({ user, posts }: UserProfileProps) {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Feed</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg -mx-6 -mt-6 mb-4"></div>

                <Avatar className="h-24 w-24 -mt-16 border-4 border-white">
                  <AvatarFallback className="text-2xl font-semibold bg-white text-gray-800">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">Professional</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Separator className="w-full" />

                <div className="grid grid-cols-2 gap-4 text-center w-full">
                  <div>
                    <p className="text-2xl font-bold">{posts.length}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalLikes}</p>
                    <p className="text-xs text-muted-foreground">Total Likes</p>
                  </div>
                </div>

                <Separator className="w-full" />

                <div className="space-y-2 text-sm text-muted-foreground w-full">
                  {user.createdAt && (
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Global</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Open to connect</span>
                  </div>
                </div>

                {user.bio && (
                  <>
                    <Separator className="w-full" />
                    <div className="w-full">
                      <h3 className="font-semibold mb-2 text-left">About</h3>
                      <p className="text-sm text-muted-foreground text-left leading-relaxed">
                        {user.bio}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Posts & Activity</h2>
              <span className="text-sm text-muted-foreground">
                {posts.length} posts
              </span>
            </div>

            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">No posts yet</h3>
                      <p className="text-muted-foreground text-sm">
                        {user.name} hasn't shared anything yet. Check back
                        later!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
