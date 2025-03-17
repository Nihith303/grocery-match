
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPostType } from "@/types/blog.types";

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
        </div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/blog/${post.id}`}>
          <Button>Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
