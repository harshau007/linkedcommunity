"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import { Bookmark, Calendar, Mail, Users } from "lucide-react";
import Link from "next/link";

export function LeftSidebar() {
  const { user } = useAuthStore();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    { icon: Bookmark, label: "Saved items", count: null },
    { icon: Users, label: "Groups", count: null },
    { icon: Mail, label: "Newsletters", count: null },
    { icon: Calendar, label: "Events", count: null },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>

          <div className="px-4 pb-4 -mt-8 relative">
            <Avatar className="h-16 w-16 border-4 border-white mb-4">
              <AvatarFallback className="text-lg font-semibold bg-white text-gray-800">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight">
                <Link href={`/users/${user._id}`}>{user.name}</Link>
              </h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
              <p className="text-xs text-muted-foreground">Global</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center space-x-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
