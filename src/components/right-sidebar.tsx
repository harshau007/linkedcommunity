"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  const newsItems = [
    {
      title: "New UPI rules kick in today",
      timeAgo: "1d ago",
      readers: "250,485 readers",
    },
    {
      title: "Top cities see salaries rise",
      timeAgo: "1d ago",
      readers: "10,351 readers",
    },
    {
      title: "New tariffs cloud India-U.S. trade",
      timeAgo: "1d ago",
      readers: "5,671 readers",
    },
    {
      title: "Want to stand out? Say hello",
      timeAgo: "1d ago",
      readers: "46,277 readers",
    },
    {
      title: "TCS to let go of 12,000 people",
      timeAgo: "1d ago",
      readers: "40,068 readers",
    },
  ];

  return (
    <div className="space-y-4">
      {/* LinkedIn News */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>LinkedCommunity News</span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Top stories
            </p>

            {newsItems.map((item, index) => (
              <div
                key={index}
                className="space-y-1 cursor-pointer hover:bg-muted/30 p-2 -m-2 rounded transition-colors"
              >
                <h4 className="text-sm font-medium leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item.timeAgo} • {item.readers}
                </p>
              </div>
            ))}

            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto text-sm text-muted-foreground"
            >
              Show more ↓
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">#TechJobs</p>
              <p className="text-xs text-muted-foreground">
                12,543 posts today
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">#RemoteWork</p>
              <p className="text-xs text-muted-foreground">8,921 posts today</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">#AI</p>
              <p className="text-xs text-muted-foreground">
                15,234 posts today
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
