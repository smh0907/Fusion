import React from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from './blogData';

export default function Blog() {
  return (
    <section className="py-16 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Agricultural Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}