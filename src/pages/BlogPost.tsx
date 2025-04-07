import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { BlogPostType } from "@/types/blog.types";

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [postId]);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </Layout>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <article
          className="prose lg:prose-xl max-w-none relative p-8 rounded-lg"
          style={{
            backgroundImage: "url('/spy.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-orange-500 mb-8">
            <div className="flex items-center mr-6">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>Grocery Match Team</span>
            </div>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
  );
};

export default BlogPostPage;
