"use client";

import { CreatePostModal } from "@/components/create-post-modal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export function PostCreation() {
  const { user } = useAuthStore();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="flex-1 justify-start text-muted-foreground bg-transparent border-2 rounded-full h-12"
              onClick={() => setIsCreatePostOpen(true)}
            >
              Start a post
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreatePostModal
        open={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
      />
    </>
  );
}
