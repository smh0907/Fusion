import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number; // Add id for routing
  title: string;
  excerpt: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="text-green-600 font-semibold hover:text-green-700">
          Read More →
        </Link>
      </div>
    </div>
  );
}
